import { DISTANCE_EXTRA_BIT_BASE, LENGTH_EXTRA_BIT_BASE, } from "./const.ts";
const REPEAT_LEN_MIN = 3;
const FAST_INDEX_CHECK_MAX = 128;
const FAST_INDEX_CHECK_MIN = 16;
const FAST_REPEAT_LENGTH = 8;
function generateLZ77IndexMap(input, startIndex, targetLength) {
    const end = startIndex + targetLength - REPEAT_LEN_MIN;
    const indexMap = {};
    for (let i = startIndex; i <= end; i++) {
        const indexKey = input[i] << 16 | input[i + 1] << 8 | input[i + 2];
        if (indexMap[indexKey] === undefined) {
            indexMap[indexKey] = [];
        }
        indexMap[indexKey].push(i);
    }
    return indexMap;
}
export function generateLZ77Codes(input, startIndex, targetLength) {
    let nowIndex = startIndex;
    const endIndex = startIndex + targetLength - REPEAT_LEN_MIN;
    let slideIndexBase = 0;
    let repeatLength = 0;
    let repeatLengthMax = 0;
    let repeatLengthMaxIndex = 0;
    let distance = 0;
    let repeatLengthCodeValue = 0;
    let repeatDistanceCodeValue = 0;
    const codeTargetValues = [];
    const startIndexMap = {};
    const endIndexMap = {};
    const indexMap = generateLZ77IndexMap(input, startIndex, targetLength);
    while (nowIndex <= endIndex) {
        const indexKey = input[nowIndex] << 16 | input[nowIndex + 1] << 8 |
            input[nowIndex + 2];
        const indexes = indexMap[indexKey];
        if (indexes === undefined || indexes.length <= 1) {
            codeTargetValues.push([input[nowIndex]]);
            nowIndex++;
            continue;
        }
        slideIndexBase = (nowIndex > 0x8000) ? nowIndex - 0x8000 : 0;
        repeatLengthMax = 0;
        repeatLengthMaxIndex = 0;
        let skipindexes = startIndexMap[indexKey] || 0;
        while (indexes[skipindexes] < slideIndexBase) {
            skipindexes = (skipindexes + 1) | 0;
        }
        startIndexMap[indexKey] = skipindexes;
        skipindexes = endIndexMap[indexKey] || 0;
        while (indexes[skipindexes] < nowIndex) {
            skipindexes = (skipindexes + 1) | 0;
        }
        endIndexMap[indexKey] = skipindexes;
        let checkCount = 0;
        indexMapLoop: for (let i = endIndexMap[indexKey] - 1, iMin = startIndexMap[indexKey]; iMin <= i; i--) {
            if (checkCount >= FAST_INDEX_CHECK_MAX ||
                (repeatLengthMax >= FAST_REPEAT_LENGTH &&
                    checkCount >= FAST_INDEX_CHECK_MIN)) {
                break;
            }
            checkCount++;
            const index = indexes[i];
            for (let j = repeatLengthMax - 1; 0 < j; j--) {
                if (input[index + j] !== input[nowIndex + j]) {
                    continue indexMapLoop;
                }
            }
            repeatLength = 258;
            for (let j = repeatLengthMax; j <= 258; j++) {
                if (input[index + j] !== input[nowIndex + j]) {
                    repeatLength = j;
                    break;
                }
            }
            if (repeatLengthMax < repeatLength) {
                repeatLengthMax = repeatLength;
                repeatLengthMaxIndex = index;
                if (258 <= repeatLength) {
                    break;
                }
            }
        }
        if (repeatLengthMax >= 3 && nowIndex + repeatLengthMax <= endIndex) {
            distance = nowIndex - repeatLengthMaxIndex;
            for (let i = 0; i < LENGTH_EXTRA_BIT_BASE.length; i++) {
                if (LENGTH_EXTRA_BIT_BASE[i] > repeatLengthMax) {
                    break;
                }
                repeatLengthCodeValue = i;
            }
            for (let i = 0; i < DISTANCE_EXTRA_BIT_BASE.length; i++) {
                if (DISTANCE_EXTRA_BIT_BASE[i] > distance) {
                    break;
                }
                repeatDistanceCodeValue = i;
            }
            codeTargetValues.push([
                repeatLengthCodeValue,
                repeatDistanceCodeValue,
                repeatLengthMax,
                distance,
            ]);
            nowIndex += repeatLengthMax;
        }
        else {
            codeTargetValues.push([input[nowIndex]]);
            nowIndex++;
        }
    }
    codeTargetValues.push([input[nowIndex]]);
    codeTargetValues.push([input[nowIndex + 1]]);
    return codeTargetValues;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHo3Ny5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImx6NzcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixxQkFBcUIsR0FDdEIsTUFBTSxZQUFZLENBQUM7QUFFcEIsTUFBTSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDO0FBQ2pDLE1BQU0sb0JBQW9CLEdBQUcsRUFBRSxDQUFDO0FBQ2hDLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0FBRTdCLFNBQVMsb0JBQW9CLENBQzNCLEtBQWlCLEVBQ2pCLFVBQWtCLEVBQ2xCLFlBQW9CO0lBRXBCLE1BQU0sR0FBRyxHQUFHLFVBQVUsR0FBRyxZQUFZLEdBQUcsY0FBYyxDQUFDO0lBQ3ZELE1BQU0sUUFBUSxHQUFnQyxFQUFFLENBQUM7SUFDakQsS0FBSyxJQUFJLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ3BDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDekI7UUFDRCxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVCO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FDL0IsS0FBaUIsRUFDakIsVUFBa0IsRUFDbEIsWUFBb0I7SUFFcEIsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQzFC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