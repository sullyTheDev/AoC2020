const tools = require("../../shared/dataReader");

tools.dataReader("C:/Repos/AoC2020/src/day7/input.txt", (err, data) => {
  if (err) {
    console.log("error reading file:", err);
    return;
  }
  const dataArray = data.split("\r\n");
  const formattedData = dataArray.map(x => formatEntry(x));
  let accum = {value: 0}
  traverseTree('shiny gold', 1, formattedData, accum);

  console.log(accum);

  /* const containingBagsSet = filterFn(
    dataArray,
    new Set([{ color: "shiny gold" }])
  );
  const amountArray = [...containingBagsSet]
    .filter((x) => !isNaN(x.amount))
    .map((x) => x.amount);

  console.log(amountArray);
  const amount = amountArray.reduce((acc, val) => acc * val);

  console.log(`The 'shiny gold' bag is required to have ${amount} bags inside of it.`); */
});

function formatEntry(entry) {
    const color = entry.substring(0, entry.indexOf(' bags'));
    const contentString = entry.substring(entry.indexOf('contain ') + 'contain '.length);
    let contents = [];
    if(!contentString.startsWith('no')) {
        contents = contentString.split(', ').map(x => {
            return {amount: +x.substring(0,1), key: x.substring(2, x.indexOf(' bag'))}
        })
    }
    return {color, contents}
}

function traverseTree(startingPoint, startingNumber, tree, accum) {
    const startingNode = tree.find(x => x.color === startingPoint)
    if(!startingNode) {
        console.log('could not find starting point');
        return;
    }

    startingNode.contents.forEach(collection => {
        accum.value = accum.value + startingNumber * collection.amount;
        traverseTree(collection.key, collection.amount, tree, accum);
    });

    return accum;
}

function filterFn(array, parentBagSet) {
  for (let i = 0; i < parentBagSet.size; i++) {
    const items = array
      .filter((x) => x.startsWith([...parentBagSet][i].color))
      .map((x) => {
        return x
          .substring(x.indexOf("contain ") + "contain ".length)
          .split(", ")
          .map((x) => ({
            color: x.substring(2, x.indexOf(" bag")),
            amount: +x.substring(0, 1),
          }));
      })
      .flat();
    parentBagSet = new Set([...parentBagSet, ...items]);
  }
  parentBagSet.delete("shiny gold");
  return parentBagSet;
}
