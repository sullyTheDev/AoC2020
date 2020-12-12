const tools = require("../../shared/dataReader");

tools.dataReader("../input.txt", (err, data) => {
  if (err) {
    console.log("error reading file:");
    return;
  }
  //wow a one liner :P
  const answer = data
    .split("\r\n\r\n")
    .map(
      (x) =>
        new Set(
          x
            .split("\r\n")
            .map((x) => x.split(""))
            .flat()
        )
    )
    .map((x) => x.size)
    .reduce((acc, val) => acc + val);

  console.log(`The answer is ${answer}`);
});
