const tools = require('../../shared/dataReader');

tools.dataReader('../input.txt', (err, data) => {
    if (err) {
        console.log('error reading file');
        return;
    }

    const dataArray = data.split('\r\n').map(x => +x);
    const preambleLength = 25;
    const invalidNum = findInvalidNumber(preambleLength, dataArray);

    const answer = findContiguousSet(invalidNum, dataArray);



    
});

function findInvalidNumber(preambleLength, dataArray) {
    for(let i = preambleLength; i < dataArray.length; i++) {
        const arrayToCheck = dataArray.slice(i-preambleLength, i);
        if(!arrayToCheck.some(x => {
            const numToCheckFor = dataArray[i] - x;
            return arrayToCheck.includes(numToCheckFor);
        })) {
            console.log(`No sum found for ${dataArray[i]}`);
            return dataArray[i];
        }
    }
}

function findContiguousSet(invalidNum, dataArray) {
    for(let i = 0; i < dataArray.length; i++) {
        let accum = 0;
        const arrayToSearch = dataArray.slice(i === dataArray.length - 1 ? i : i+1);

        for(let j = 0; j < arrayToSearch.length; j++) {
            accum += arrayToSearch[j];
            if(accum > invalidNum) {
                break;
            } else if(accum === invalidNum) {
                const sortedArray = arrayToSearch.slice(0, j+1).sort((a, b) => a-b);

                const answer = sortedArray[0] + sortedArray[sortedArray.length - 1];
                console.log(`found contiguous set, the sum of the min + max values is ${answer}`);
                return answer;
            }
        }

    }
}