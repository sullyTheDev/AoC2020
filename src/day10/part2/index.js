const tools = require("../../shared/dataReader");

tools.dataReader("C:/Repos/AoC2020/src/day10/input.txt", (err, data) => {
  if (err) {
    console.log("error reading file");
    return;
  }

  const dataArray = data
    .split("\r\n")
    .map((x) => +x)
    .sort((a, b) => a - b);

  let adapters = { 0: true };
  let max = dataArray[0];
  for (let i = 0; i < dataArray.length; i++) {
    adapters[dataArray[i]] = true;
    max = Math.max(max, dataArray[i]);
  }

  let paths = { [max]: 1 };

  const get = (index, offset) =>
    paths[index + offset] ? paths[index + offset] : 0;

  for (let i = max - 1; i >= 0; i--) {
    if (adapters[i]) {
      paths[i] = [1, 2, 3].map((jump) => get(i, jump)).reduce((a, b) => a + b);
    }
  }

  console.log(paths[0]);
});
