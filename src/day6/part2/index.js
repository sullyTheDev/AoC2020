const tools = require("../../shared/dataReader");

tools.dataReader("../input.txt", (err, data) => {
  if (err) {
    console.log("error reading file:");
    return;
  }
  const dataArray = data.split("\r\n\r\n").map((x) => x.split("\r\n").sort());
  let acc = 0;
  dataArray.forEach(group => {
      if (group.length === 1) {
        acc += group[0].length;
        return;
      }
    const matchingAnswers = group.reduce((acc, val) => acc + val).split('').sort().join('').match(/(.)\1+/g);
    if(matchingAnswers) {
        matchingAnswers.forEach(answer => {
            if(answer.length === group.length) {
                acc++
            }
        });
    }
  });

  console.log(`The answer is ${acc}`);
});
