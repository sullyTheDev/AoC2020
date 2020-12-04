const fs = require('fs');

fs.readFile('../input.txt', 'utf8', (err, data) => {
  if (err) {
    console.log('error reading file');
    return;
  }
  const numArray = data
    .split('\r\n')
    .map((x) => +x)
    .sort((a, b) => a - b);
  for (let i = 0; i < numArray.length - 2; i++) {
    let offset1 = i + 1;
    let offset2 = numArray.length - 1;

    while (offset1 < offset2) {
      const sum = numArray[i] + numArray[offset1] + numArray[offset2];
      if (sum === 2020) {
        console.log(
          `The answer is: ${
            numArray[i] * numArray[offset1] * numArray[offset2]
          }`
        );
        return;
      } else if (sum < 2020) {
        offset1++;
      } else {
        offset2--;
      }
    }
  }
  console.log('no match found');
});
