const tools = require('../../shared/dataReader');

tools.dataReader('../input.txt', (err, data) => {
    if (err) {
        console.log('error reading file');
        return;
    }

    const parsedData = data.split('\r\n');

    const earliestTime = +parsedData[0];
    const busIds = parsedData[1].split(',').filter(x => x !== 'x').map(x => parseInt(x));

    const futureBusTimes = busIds.map(id => {
        const busId = id;
        while(true) {
            const nextStop = id + busId;
            id = nextStop;
            if (id >= earliestTime) {
                break;
            }
        }

        return id;
    });

    const closestDeparture = futureBusTimes.reduce((a, b) => {
        return Math.abs(b - earliestTime) < Math.abs(a - earliestTime) ? b : a
    })

    const originalBusId = busIds[futureBusTimes.indexOf(closestDeparture)]
    const waitTime = closestDeparture - earliestTime;

    console.log(`The 'wait time' * the 'bus id' is ${waitTime * originalBusId}`);
});