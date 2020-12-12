const tools = require('../../shared/dataReader');

tools.dataReader('../input.txt', (err, data) => {
  if (err) {
    console.log('error reading file');
    return;
  }

  const totalRows = 128;
  const totalColumns = 8;

  const idArray = data.split('\r\n').map(x => {
    const rowData = x.substring(0, 7);
    const columnData = x.substring(7);

    const row = findRow(rowData, totalRows);
    const column = findColumn(columnData, totalColumns);
     return row * 8 + column

  }).sort((a, b) => a - b );

  for(let i = 0; i < idArray.length; i++) {
    if(!(idArray[i + 1] === idArray[i]+1)) {
      console.log(`Seat Id is ${idArray[i] + 1}`)
      return;
    }
  }
});

function findRow(rowData, totalRows) {
  //simulate space using array
  let space = new Array(totalRows).fill(1).map((x, i) => i);

  //iterate through seat data to find actual row
  rowData.split('').forEach(x => {
    if(x === 'F') {
      space = space.slice(0, space.length/2);
    } else if(x === 'B') {
      space = space.slice(space.length/2);
    }
  });

  return space[0];
}

function findColumn(colData, totalCols) {
  let space = new Array(totalCols).fill(1).map((x, i) => i);

  colData.split('').forEach(x => {
    if (x === 'L') {
      space = space.slice(0, space.length/2);
    } else if (x === 'R') {
      space = space.slice(space.length/2);
    }
  });

  return space[0];
}