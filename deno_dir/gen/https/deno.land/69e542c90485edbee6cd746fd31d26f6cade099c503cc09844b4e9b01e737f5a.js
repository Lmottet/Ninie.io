export function generateHuffmanTable(codelenValues) {
    const codelens = Object.keys(codelenValues);
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
    let values;
    const bitlenTables = {};
    for (let bitlen = codelenMin; bitlen <= codelenMax; bitlen++) {
        values = codelenValues[bitlen];
        if (values === undefined)
            values = [];
        values.sort((a, b) => {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        });
        const table = {};
        values.forEach((value) => {
            table[code] = value;
            code++;
        });
        bitlenTables[bitlen] = table;
        code <<= 1;
    }
    return bitlenTables;
}
export function makeFixedHuffmanCodelenValues() {
    const codelenValues = {};
    codelenValues[7] = [];
    codelenValues[8] = [];
    codelenValues[9] = [];
    for (let i = 0; i <= 287; i++) {
        (i <= 143)
            ? codelenValues[8].push(i)
            : (i <= 255)
                ? codelenValues[9].push(i)
                : (i <= 279)
                    ? codelenValues[7].push(i)
                    : codelenValues[8].push(i);
    }
    return codelenValues;
}
export function generateDeflateHuffmanTable(values, maxLength = 15) {
    const valuesCount = {};
    for (const value of values) {
        if (!valuesCount[value]) {
            valuesCount[value] = 1;
        }
        else {
            valuesCount[value]++;
        }
    }
    const valuesCountKeys = Object.keys(valuesCount);
    let tmpPackages = [];
    let tmpPackageIndex = 0;
    let packages = [];
    if (valuesCountKeys.length === 1) {
        packages.push({
            count: valuesCount[0],
            simbles: [Number(valuesCountKeys[0])],
        });
    }
    else {
        for (let i = 0; i < maxLength; i++) {
            packages = [];
            valuesCountKeys.forEach((value) => {
                const pack = {
                    count: valuesCount[Number(value)],
                    simbles: [Number(value)],
                };
                packages.push(pack);
            });
            tmpPackageIndex = 0;
            while (tmpPackageIndex + 2 <= tmpPackages.length) {
                const pack = {
                    count: tmpPackages[tmpPackageIndex].count +
                        tmpPackages[tmpPackageIndex + 1].count,
                    simbles: tmpPackages[tmpPackageIndex].simbles.concat(tmpPackages[tmpPackageIndex + 1].simbles),
                };
                packages.push(pack);
                tmpPackageIndex += 2;
            }
            packages = packages.sort((a, b) => {
                if (a.count < b.count)
                    return -1;
                if (a.count > b.count)
                    return 1;
                return 0;
            });
            if (packages.length % 2 !== 0) {
                packages.pop();
            }
            tmpPackages = packages;
        }
    }
    const valuesCodelen = {};
    packages.forEach((pack) => {
        pack.simbles.forEach((symble) => {
            if (!valuesCodelen[symble]) {
                valuesCodelen[symble] = 1;
            }
            else {
                valuesCodelen[symble]++;
            }
        });
    });
    let group;
    const valuesCodelenKeys = Object.keys(valuesCodelen);
    const codelenGroup = {};
    let code = 0;
    let codelen = 3;
    const codelenMax = codelen;
    let codelenValueMin = Number.MAX_SAFE_INTEGER;
    let codelenValueMax = 0;
    valuesCodelenKeys.forEach((valuesCodelenKey) => {
        codelen = valuesCodelen[Number(valuesCodelenKey)];
        if (!codelenGroup[codelen]) {
            codelenGroup[codelen] = [];
            if (codelenValueMin > codelen)
                codelenValueMin = codelen;
            if (codelenValueMax < codelen)
                codelenValueMax = codelen;
        }
        codelenGroup[codelen].push(Number(valuesCodelenKey));
    });
    code = 0;
    const table = new Map();
    for (let i = codelenValueMin; i <= codelenValueMax; i++) {
        group = codelenGroup[i];
        if (group) {
            group = group.sort((a, b) => {
                if (a < b)
                    return -1;
                if (a > b)
                    return 1;
                return 0;
            });
            group.forEach((value) => {
                table.set(value, { code, bitlen: i });
                code++;
            });
        }
        code <<= 1;
    }
    return table;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHVmZm1hbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImh1ZmZtYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxhQUE2QjtJQUU3QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVDLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNoQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDbkIsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQ3pDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUN2QixPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksVUFBVSxHQUFHLE9BQU87WUFBRSxVQUFVLEdBQUcsT0FBTyxDQUFDO1FBQy9DLElBQUksVUFBVSxHQUFHLE9BQU87WUFBRSxVQUFVLEdBQUcsT0FBTyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsSUFBSSxNQUFnQixDQUFDO0lBQ3JCLE1BQU0sWUFBWSxHQUFrQixFQUFFLENBQUM7SUFDdkMsS0FBSyxJQUFJLE1BQU0sR0FBRyxVQUFVLEVBQUUsTUFBTSxJQUFJLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUM1RCxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLElBQUksTUFBTSxLQUFLLFNBQVM7WUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTyxDQUFDLENB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