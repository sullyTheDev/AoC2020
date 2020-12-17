const tools = require('../../shared/datareader');

tools.dataReader('../input.txt', (err, data) => {
    if(err) {
        console.log('error reading file');
        return;
    }

    const dataArray = data.split(',').map(x => +x);
    const lastSpokenMap = new Map();
    const spokenNums = [];
    for(let i = 0; i < 30000000; i++) {
        if(spokenNums.length < dataArray.length) {
            spokenNums.push(dataArray[i]);
            lastSpokenMap.set(dataArray[i], i);
            continue;
        }
        lastSpokenMap.set(spokenNums[spokenNums.length - 2], spokenNums.length - 2);
        const lastIndexSpoken = lastSpokenMap.has(spokenNums[spokenNums.length - 1]) ?  lastSpokenMap.get(spokenNums[spokenNums.length - 1]) : - 1;
        if(lastIndexSpoken < 0 ) {
            spokenNums.push(0);
        } else {
            spokenNums.push((spokenNums.length - 1) - lastIndexSpoken)
        }
    }

    console.log(`The 30000000th number spoken is ${spokenNums[spokenNums.length -1]}`)
});