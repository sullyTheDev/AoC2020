const tools = require('../../shared/dataReader');

tools.dataReader('../input.txt', (err, data) => {
    if(err) {
        console.log('error reading file');
        return;
    }

    const commandArray = data.split('\r\n');
    const commandLog = new Set();
    let accum = 0;

    for(let i = 0; i < commandArray.length; i++) {
        if(commandLog.has(i)) {
            console.log(`The accumulator totals to ${accum} before a command executes a second time.`);
            return;
        }
        const parsedCommand = commandArray[i].split(' ');
        commandLog.add(i);

        switch(parsedCommand[0]) {
            case 'acc':
                accum += +parsedCommand[1];
                break;
            case 'jmp':
                i += +parsedCommand[1] - 1;
                break;
            default:
                break;
        }

    }
});