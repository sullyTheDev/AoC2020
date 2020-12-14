const tools = require('../../shared/dataReader');

tools.dataReader('C:/Repos/AoC2020/src/day14/input.txt', (err, data) => {
    if(err) {
        console.log('error reading file');
        return;
    }

    const dataArray = data.split('\r\n');
    
    let mask = [];
    const memAddresses = new Map();
    for(let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].startsWith('mask')) {
            mask = dataArray[i].split(' = ')[1].split('');
        } else {
            const address = dataArray[i].substring(4, dataArray[i].lastIndexOf(']'));
            const numVal = +dataArray[i].split(' = ')[1];
            let binaryString = createBinaryString(numVal);
            mask.forEach((val, i) => {
                if(val !== 'X') {
                    const tempStringArray = binaryString.split('');
                    tempStringArray[i] = val;
                    binaryString = tempStringArray.join('');
                }
            })
            memAddresses.set(address, parseInt(binaryString, 2));

        }
    }
    let sum = 0;
    memAddresses.forEach(val => sum += val);

    console.log(`All values left in memory: ${sum}`);

})




function createBinaryString (nMask) {
    for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
         nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
    return '0000'+ sMask;
  }
  