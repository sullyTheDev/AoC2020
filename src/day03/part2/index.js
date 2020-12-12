const tools = require('../../shared/dataReader');

tools.dataReader('../input.txt', (err, data) => {
  if (err) {
    console.log('error reading file');
    return;
  }

  let dataArray = data.split('\r\n');
  const rightOffsets = [1, 3, 5, 7, 1];
  const downOffsets = [1, 1, 1, 1, 2];
  let answer = 1;
  for (
    let offsetsIndex = 0;
    offsetsIndex < rightOffsets.length;
    offsetsIndex++
  ) {
    let treeOccurences = 0;
    let iter = 1;
    for (
      let i = downOffsets[offsetsIndex];
      i < dataArray.length;
      i = i + downOffsets[offsetsIndex]
    ) {
      if (
        dataArray[i].charAt(
          (iter * rightOffsets[offsetsIndex]) % dataArray[i].length
        ) === '#'
      ) {
        treeOccurences++;
      }
      iter++;
    }

    answer = answer * treeOccurences;
  }

  console.log(`Trees encountered: ${answer}`);
});
