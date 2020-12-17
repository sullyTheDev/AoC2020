const tools = require('../../shared/datareader');

tools.dataReader('../input.txt', (err, data) => {
    if(err) {
        console.log('error reading file');
        return;
    }

    const dataArray = data.split(',').map(x => +x);

    const spokenNums = [];
    for(let i = 0; i < 2020; i++) {
        if(spokenNums.length < dataArray.length) {
            spokenNums.push(dataArray[i]);
            continue;
        }

        const lastIndexSpoken = spokenNums.slice(0, spokenNums.length - 1).lastIndexOf(spokenNums[spokenNums.length - 1]);
        if(lastIndexSpoken < 0 ) {
            spokenNums.push(0);
        } else {
            spokenNums.push((spokenNums.length - 1) - lastIndexSpoken)
        }
    }

    console.log(`The 2020th number spoken is ${spokenNums[spokenNums.length -1]}`)
});