const tools = require('../../shared/dataReader');


tools.dataReader('../input.txt', (err, data) => {
  if(err) {
    console.log('error reading file');
    return;
  }

  let dataArray = data.split('\r\n');
  const offset = 3;
  let treeOccurences = 0;
  for(let i = 1; i < dataArray.length; i++) {
    if(dataArray[i].charAt((i * offset) % dataArray[i].length) === '#') {
      treeOccurences++;
    }
  }

  console.log(`Trees encountered: ${treeOccurences}`);

})