const tools = require("../../shared/dataReader");

tools.dataReader("../input.txt", (err, data) => {
  if (err) {
    console.log("error reading file");
    return;
  }

  const dataArray = data
    .split("\r\n")
    .map((x) => +x)
    .sort((a, b) => a - b);

  let smallJoltDiffAcc = 0;
  let largeJoltDiffAcc = 1;
  let startingJolt = 0;
  for (let i = 0; i < dataArray.length; i++) {
    if (dataArray[i] === startingJolt + 1) {
      smallJoltDiffAcc++;
      startingJolt = dataArray[i];
      continue;
    } else if (dataArray[i] === startingJolt + 3) {
      largeJoltDiffAcc++;
      startingJolt = dataArray[i];
      continue;
    } else if (dataArray[i] === startingJolt + 2) {
      startingJolt = dataArray[i];
      continue;
    }
  }

  console.log(smallJoltDiffAcc * largeJoltDiffAcc);
});
