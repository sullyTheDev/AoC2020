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
            let binaryString = createBinaryString(address);
            const tempStringArray = binaryString.split('');
            mask.forEach((val, i) => {
                if(val === '1') {
                    tempStringArray[i] = '1'; 
                }
                if(val === 'X') {
                    tempStringArray[i] = 'X'
                }
            })
            binaryString = tempStringArray.join('');

            const addresses = getAllAddresses(binaryString);

            addresses.forEach(addr => memAddresses.set(parseInt(addr, 2), numVal));

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

  function getAllAddresses(
    address,
    index = 0,
  ) {
    if (index >= address.length) {
      return [ address ];
    }
    if (address[index] === 'X') {
      const newAddresses = [
        `${address.substring(0, index)}0${address.substring(index + 1)}`,
        `${address.substring(0, index)}1${address.substring(index + 1)}`,
      ];
      return newAddresses.flatMap(newAdd => [ ...getAllAddresses(newAdd, index + 1) ]);
    }
    return getAllAddresses(address, index + 1);
  }
  