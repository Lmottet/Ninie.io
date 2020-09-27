import { BTYPE, CODELEN_VALUES, DISTANCE_EXTRA_BIT_BASE, DISTANCE_EXTRA_BIT_LEN, LENGTH_EXTRA_BIT_BASE, LENGTH_EXTRA_BIT_LEN, } from "./const.ts";
import { generateHuffmanTable, makeFixedHuffmanCodelenValues, } from "./huffman.ts";
import { BitReadStream } from "./_BitReadStream.ts";
import { Uint8WriteStream } from "./_Uint8WriteStream.ts";
const FIXED_HUFFMAN_TABLE = generateHuffmanTable(makeFixedHuffmanCodelenValues());
export function inflate(input, offset = 0) {
    const buffer = new Uint8WriteStream(input.length * 10);
    const stream = new BitReadStream(input, offset);
    let bFinal = 0;
    let bType = 0;
    while (bFinal !== 1) {
        bFinal = stream.readRange(1);
        bType = stream.readRange(2);
        if (bType === BTYPE.UNCOMPRESSED) {
            inflateUncompressedBlock(stream, buffer);
        }
        else if (bType === BTYPE.FIXED) {
            inflateFixedBlock(stream, buffer);
        }
        else if (bType === BTYPE.DYNAMIC) {
            inflateDynamicBlock(stream, buffer);
        }
        else {
            throw new Error("Not supported BTYPE : " + bType);
        }
        if (bFinal === 0 && stream.isEnd) {
            throw new Error("Data length is insufficient");
        }
    }
    return buffer.buffer.subarray(0, buffer.index);
}
function inflateUncompressedBlock(stream, buffer) {
    if (stream.nowBitsLength < 8) {
        stream.readRange(stream.nowBitsLength);
    }
    const LEN = stream.readRange(8) | stream.readRange(8) << 8;
    const NLEN = stream.readRange(8) | stream.readRange(8) << 8;
    if ((LEN + NLEN) !== 65535) {
        throw new Error("Data is corrupted");
    }
    for (let i = 0; i < LEN; i++) {
        buffer.write(stream.readRange(8));
    }
}
function inflateFixedBlock(stream, buffer) {
    const tables = FIXED_HUFFMAN_TABLE;
    const codelens = Object.keys(tables);
    let codelen = 0;
    let codelenMax = 0;
    let codelenMin = Number.MAX_SAFE_INTEGER;
    codelens.forEach((key) => {
        codelen = Number(key);
        if (codelenMax < codelen)
            codelenMax = codelen;
        if (codelenMin > codelen)
            codelenMin = codelen;
    });
    let code = 0;
    let value;
    let repeatLengthCode;
    let repeatLengthValue;
    let repeatLengthExt;
    let repeatDistanceCode;
    let repeatDistanceValue;
    let repeatDistanceExt;
    let repeatStartIndex;
    while (!stream.isEnd) {
        value = undefined;
        codelen = codelenMin;
        code = stream.readRangeCoded(codelenMin);
        while (true) {
            value = tables[codelen][code];
            if (value !== undefined) {
                break;
            }
            if (codelenMax <= codelen) {
                throw new Error("Data is corrupted");
            }
            codelen++;
            code <<= 1;
            code |= stream.read();
        }
        if (value < 256) {
            buffer.write(value);
            continue;
        }
        if (value === 256) {
            break;
        }
        repeatLengthCode = value - 257;
        repeatLengthValue = LENGTH_EXTRA_BIT_BASE[repeatLengthCode];
        repeatLengthExt = LENGTH_EXTRA_BIT_LEN[repeatLengthCode];
        if (0 < repeatLengthExt) {
            repeatLengthValue += stream.readRange(repeatLengthExt);
        }
        repeatDistanceCode = stream.readRangeCoded(5);
        repeatDistanceValue = DISTANCE_EXTRA_BIT_BASE[repeatDistanceCode];
        repeatDistanceExt = DISTANCE_EXTRA_BIT_LEN[repeatDistanceCode];
        if (0 < repeatDistanceExt) {
            repeatDistanceValue += stream.readRange(repeatDistanceExt);
        }
        repeatStartIndex = buffer.index - repeatDistanceValue;
        for (let i = 0; i < repeatLengthValue; i++) {
            buffer.write(buffer.buffer[repeatStartIndex + i]);
        }
    }
}
function inflateDynamicBlock(stream, buffer) {
    const HLIT = stream.readRange(5) + 257;
    const HDIST = stream.readRange(5) + 1;
    const HCLEN = stream.readRange(4) + 4;
    let codelenCodelen = 0;
    const codelenCodelenValues = {};
    for (let i = 0; i < HCLEN; i++) {
        codelenCodelen = stream.readRange(3);
        if (codelenCodelen === 0) {
            continue;
        }
        if (!codelenCodelenValues[codelenCodelen]) {
            codelenCodelenValues[codelenCodelen] = [];
        }
        codelenCodelenValues[codelenCodelen].push(CODELEN_VALUES[i]);
    }
    const codelenHuffmanTables = generateHuffmanTable(codelenCodelenValues);
    const codelenCodelens = Object.keys(codelenHuffmanTables);
    let codelenCodelenMax = 0;
    let codelenCodelenMin = Number.MAX_SAFE_INTEGER;
    codelenCodelens.forEach((key) => {
        codelenCodelen = Number(key);
        if (codelenCodelenMax < codelenCodelen)
            codelenCodelenMax = codelenCodelen;
        if (codelenCodelenMin > codelenCodelen)
            codelenCodelenMin = codelenCodelen;
    });
    const dataCodelenValues = {};
    const distanceCodelenValues = {};
    let codelenCode = 0;
    let runlengthCode;
    let repeat = 0;
    let codelen = 0;
    const codesNumber = HLIT + HDIST;
    for (let i = 0; i < codesNumber;) {
        runlengthCode = undefined;
        codelenCodelen = codelenCodelenMin;
        codelenCode = stream.readRangeCoded(codelenCodelenMin);
        while (true) {
            runlengthCode = codelenHuffmanTables[codelenCodelen][codelenCode];
            if (runlengthCode !== undefined) {
                break;
            }
            if (codelenCodelenMax <= codelenCodelen) {
                throw new Error("Data is corrupted");
            }
            codelenCodelen++;
            codelenCode <<= 1;
            codelenCode |= stream.read();
        }
        if (runlengthCode === 16) {
            repeat = 3 + stream.readRange(2);
        }
        else if (runlengthCode === 17) {
            repeat = 3 + stream.readRange(3);
            codelen = 0;
        }
        else if (runlengthCode === 18) {
            repeat = 11 + stream.readRange(7);
            codelen = 0;
        }
        else {
            repeat = 1;
            codelen = runlengthCode;
        }
        if (codelen <= 0) {
            i += repeat;
        }
        else {
            while (repeat) {
                if (i < HLIT) {
                    if (!dataCodelenValues[codelen]) {
                        dataCodelenValues[codelen] = [];
                    }
                    dataCodelenValues[codelen].push(i++);
                }
                else {
                    if (!distanceCodelenValues[codelen]) {
                        distanceCodelenValues[codelen] = [];
                    }
                    distanceCodelenValues[codelen].push(i++ - HLIT);
                }
                repeat--;
            }
        }
    }
    const dataHuffmanTables = generateHuffmanTable(dataCodelenValues);
    const distanceHuffmanTables = generateHuffmanTable(distanceCodelenValues);
    const dataCodelens = Object.keys(dataHuffmanTables);
    let dataCodelen = 0;
    let dataCodelenMax = 0;
    let dataCodelenMin = Number.MAX_SAFE_INTEGER;
    dataCodelens.forEach((key) => {
        dataCodelen = Number(key);
        if (dataCodelenMax < dataCodelen)
            dataCodelenMax = dataCodelen;
        if (dataCodelenMin > dataCodelen)
            dataCodelenMin = dataCodelen;
    });
    const distanceCodelens = Object.keys(distanceHuffmanTables);
    let distanceCodelen = 0;
    let distanceCodelenMax = 0;
    let distanceCodelenMin = Number.MAX_SAFE_INTEGER;
    distanceCodelens.forEach((key) => {
        distanceCodelen = Number(key);
        if (distanceCodelenMax < distanceCodelen) {
            distanceCodelenMax = distanceCodelen;
        }
        if (distanceCodelenMin > distanceCodelen) {
            distanceCodelenMin = distanceCodelen;
        }
    });
    let dataCode = 0;
    let data;
    let repeatLengthCode;
    let repeatLengthValue;
    let repeatLengthExt;
    let repeatDistanceCode;
    let repeatDistanceValue;
    let repeatDistanceExt;
    let repeatDistanceCodeCodelen;
    let repeatDistanceCodeCode;
    let repeatStartIndex;
    while (!stream.isEnd) {
        data = undefined;
        dataCodelen = dataCodelenMin;
        dataCode = stream.readRangeCoded(dataCodelenMin);
        while (true) {
            data = dataHuffmanTables[dataCodelen][dataCode];
            if (data !== undefined) {
                break;
            }
            if (dataCodelenMax <= dataCodelen) {
                throw new Error("Data is corrupted");
            }
            dataCodelen++;
            dataCode <<= 1;
            dataCode |= stream.read();
        }
        if (data < 256) {
            buffer.write(data);
            continue;
        }
        if (data === 256) {
            break;
        }
        repeatLengthCode = data - 257;
        repeatLengthValue = LENGTH_EXTRA_BIT_BASE[repeatLengthCode];
        repeatLengthExt = LENGTH_EXTRA_BIT_LEN[repeatLengthCode];
        if (0 < repeatLengthExt) {
            repeatLengthValue += stream.readRange(repeatLengthExt);
        }
        repeatDistanceCode = undefined;
        repeatDistanceCodeCodelen = distanceCodelenMin;
        repeatDistanceCodeCode = stream.readRangeCoded(distanceCodelenMin);
        while (true) {
            repeatDistanceCode = distanceHuffmanTables[repeatDistanceCodeCodelen][repeatDistanceCodeCode];
            if (repeatDistanceCode !== undefined) {
                break;
            }
            if (distanceCodelenMax <= repeatDistanceCodeCodelen) {
                throw new Error("Data is corrupted");
            }
            repeatDistanceCodeCodelen++;
            repeatDistanceCodeCode <<= 1;
            repeatDistanceCodeCode |= stream.read();
        }
        repeatDistanceValue = DISTANCE_EXTRA_BIT_BASE[repeatDistanceCode];
        repeatDistanceExt = DISTANCE_EXTRA_BIT_LEN[repeatDistanceCode];
        if (0 < repeatDistanceExt) {
            repeatDistanceValue += stream.readRange(repeatDistanceExt);
        }
        repeatStartIndex = buffer.index - repeatDistanceValue;
        for (let i = 0; i < repeatLengthValue; i++) {
            buffer.write(buffer.buffer[repeatStartIndex + i]);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mbGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZmxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLEtBQUssRUFDTCxjQUFjLEVBQ2QsdUJBQXVCLEVBQ3ZCLHNCQUFzQixFQUN0QixxQkFBcUIsRUFDckIsb0JBQW9CLEdBQ3JCLE1BQU0sWUFBWSxDQUFDO0FBQ3BCLE9BQU8sRUFDTCxvQkFBb0IsRUFFcEIsNkJBQTZCLEdBQzlCLE1BQU0sY0FBYyxDQUFDO0FBQ3RCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUxRCxNQUFNLG1CQUFtQixHQUFHLG9CQUFvQixDQUM5Qyw2QkFBNkIsRUFBRSxDQUNoQyxDQUFDO0FBRUYsTUFBTSxVQUFVLE9BQU8sQ0FBQyxLQUFpQixFQUFFLFNBQWlCLENBQUM7SUFDM0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRXZELE1BQU0sTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoRCxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDZixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxPQUFPLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbkIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLFlBQVksRUFBRTtZQUNoQyx3QkFBd0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDMUM7YUFBTSxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsS0FB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