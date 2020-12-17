const tools = require("../../shared/dataReader");

tools.dataReader("../input.txt", (err, data) => {
  if (err) {
    console.log("error reading file");
    return;
  }

  const parsedData = data
    .split("\r\n")[1]
    .split(",")
    .map((id, i) => ({ id, i }))
    .filter((x) => x.id !== "x")
    .map((x) => {
      const n = parseInt(x.id.trim());
      return {
        n: BigInt(n),
        i: x.i,
        a: BigInt(n - x.i),
      };
    });

    const solution = solveCrtAlgo(parsedData);
    console.log(`Part 2: ${ solution }`);
});

function solveMMI(a, mod) {
  const b = a % mod;
  for (let x = 1n; x < mod; x++) {
      if ((b * x) % mod === 1n) {
          return x;
      }
  }
  return 1n;
}

function solveCrtAlgo(system) {
  const prod = system.reduce((p, con) => p * con.n, 1n);
  return system.reduce((sm, con) => {
      const p = prod / con.n;
      return sm + (con.a * solveMMI(p, con.n) * p);
  }, 0n) % prod;
}
