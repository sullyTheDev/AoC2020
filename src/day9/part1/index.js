const tools = require('../../shared/dataReader');

tools.dataReader('../input.txt', (err, data) => {
    if (err) {
        console.log('error reading file');
        return;
    }

    const dataArray = data.split('\r\n').map(x => +x);
    const preambleLength = 25;

    for(let i = preambleLength; i < dataArray.length; i++) {
        const arrayToCheck = dataArray.slice(i-preambleLength, i);
        if(!arrayToCheck.some(x => {
            const numToCheckFor = dataArray[i] - x;
            return arrayToCheck.includes(numToCheckFor);
        })) {
            console.log(`No sum found for ${dataArray[i]}`);
            return;
        }
    }
});