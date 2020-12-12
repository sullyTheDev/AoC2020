const tools = require("../../shared/dataReader");

tools.dataReader("../input.txt", (err, data) => {
  if (err) {
    console.log("error reading file");
    return;
  }

  const commandArray = data.split("\r\n").map((command) => command.split(" "));

  for (let i = 0; i < commandArray.length; i++) {
    const commandLog = new Set();
    let accum = 0;
    let iter = 0;
    let testArray = [...commandArray];
    if (commandArray[i][0] === "acc") {
      continue;
    }

    testArray[i] = changeCommand(testArray[i]);

    while (true) {
      if (iter >= testArray.length) {
        console.log(`The accumulator totals ${accum} after a successful run`);
        return
      }

      if (commandLog.has(iter)) {
        break;
      }
      commandLog.add(iter);

      let indexChange = 1;
      switch (testArray[iter][0]) {
        case "acc":
          accum += +testArray[iter][1];
          break;
        case "jmp":
          indexChange = +testArray[iter][1];
          break;
        default:
          break;
      }
      iter += indexChange;
      
    }
  }

});

function changeCommand(command) {
  return [command[0] === "jmp" ? "nop" : "jmp", command[1]];
}
