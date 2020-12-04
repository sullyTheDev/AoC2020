const tools = require('../../shared/dataReader');

tools.dataReader('../input.txt', (err, data) => {
  if (err) {
    console.log('error reading file');
    return;
  }
  const numArray = data.split('\r\n').map(x => +x).sort();
  for(let i = 0; i < numArray.length; i++) {
    const numToCheckFor = 2020 - numArray[i];
    if(numArray.includes(numToCheckFor)) {
      const answer = numArray.find(x => numToCheckFor === x) * numArray[i];
      console.log(`the answer is: ${answer}`);
      return
    } 
  }
});
