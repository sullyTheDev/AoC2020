const tools = require("../../shared/datareader");

tools.dataReader("C:/Repos/AoC2020/src/day16/input.txt", (err, data) => {
  if (err) {
    console.log("error reading file");
    return;
  }

  const dataPartitions = data.split("\r\n\r\n");
  const rules = dataPartitions[0].split("\r\n").map((x) => {
    const parsedRule = x.split(": ");
    const name = parsedRule[0];
    const ruleSets = parsedRule[1].split(" or ").map((vals) => {
      const ruleSetVals = vals.split("-");
      return { min: +ruleSetVals[0], max: +ruleSetVals[1] };
    });

    return { name, ruleSets };
  });

  //flatten array...may not work for part2...but whatever
  const nearbyTickets = dataPartitions[2]
    .split("\r\n")
    .slice(1)
    .map((ticketVals) => ticketVals.split(","))
    .flat()
    .map((x) => parseInt(x));
  let accum = 0;
  for (let i = 0; i < nearbyTickets.length; i++) {
    if (!isValidVal(nearbyTickets[i], rules)) {
      accum += nearbyTickets[i];
    }
  }
  console.log(accum);
});

function isValidVal(value, rules) {
  //at least 1 rule matches...
  return rules.some((rule) =>
    //all the rulesets within a rule must be matched
    rule.ruleSets.some((set) => value >= set.min && value <= set.max)
  );
}
