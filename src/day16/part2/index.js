const tools = require("../../shared/datareader");
const usedRules = new Set();

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
  const myTicket = dataPartitions[1]
    .split("\r\n")
    .slice(1)
    .map((ticketVals) => ticketVals.split(",").map((x) => parseInt(x))).flat();

    console.log(myTicket);

  const nearbyTickets = dataPartitions[2]
    .split("\r\n")
    .slice(1)
    .map((ticketVals) => ticketVals.split(","))
    .map((x) => x.map((inner) => parseInt(inner)));

  const invalidVals = nearbyTickets
    .flat()
    .filter((x) => !matchesAnyRule(x, rules));

  const validTickets = nearbyTickets.filter(
    (x) => !invalidVals.some((invalid) => x.includes(invalid))
  );

  const ticketValueColumns = [];
  for (let i = 0; i < validTickets[0].length; i++) {
    ticketValueColumns.push(validTickets.map((x) => x[i]));
  }

  const rawColumnNames = ticketValueColumns.map((x, i) => ({columnNames: matchingRule(rules, x), index: i}));

  const columns = narrowColumnsDown(
    rawColumnNames.sort((a, b) => a.columnNames.length - b.columnNames.length)
  );

  const releventColumns = columns
    .map((x, i) => {
      if (x.includes("departure")) {
        return i;
      }

      return -1;
    })
    .filter((x) => x !== -1);

    const answer = releventColumns.map(x => myTicket[x]).reduce((acc, x) => acc * x)

  console.log(answer);
});

function narrowColumnsDown(arrayToCheck) {
  for (let i = 0; i < arrayToCheck.length; i++) {
    const valToCheck = arrayToCheck[i].columnNames[0];
    arrayToCheck = arrayToCheck.map((x) => {
        if(x.columnNames.length > 1) {
            x.columnNames = x.columnNames.filter((inner) => inner !== valToCheck)
        }
        return x;
    });
  }

  return arrayToCheck.sort((a, b) => a.index - b.index).map(x => x.columnNames).flat();
}

function matchesAnyRule(value, rules) {
  //at least 1 rule matches...
  return rules.some((rule) =>
    //all the rulesets within a rule must be matched
    rule.ruleSets.some((set) => value >= set.min && value <= set.max)
  );
}

function isValidVal(value, rule) {
  //all the rulesets within a rule must be matched
  return rule.ruleSets.some((set) => value >= set.min && value <= set.max);
}

function matchingRule(rules, vals) {
  const matchingRules = [];
  for (let i = 0; i < rules.length; i++) {
    if (vals.every((x) => isValidVal(x, rules[i]))) {
      matchingRules.push(rules[i].name);
    }
  }

  return matchingRules;
}
