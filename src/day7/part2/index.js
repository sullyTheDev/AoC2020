const tools = require("../../shared/dataReader");

tools.dataReader("../input.txt", (err, data) => {
  if (err) {
    console.log("error reading file:", err);
    return;
  }
  const dataArray = data.split("\r\n");
  const formattedData = dataArray.map(x => formatEntry(x));
  let accum = {value: 0}
  traverseTree('shiny gold', 1, formattedData, accum);

  console.log(`The 'shiny gold' bag needs to contain ${accum.value} other bags.`);
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
        traverseTree(collection.key, startingNumber * collection.amount, tree, accum);
    });
}
