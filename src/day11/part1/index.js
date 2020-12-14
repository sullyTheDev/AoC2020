const tools = require("../../shared/dataReader");

tools.dataReader("../input.txt", (err, data) => {
  if (err) {
    console.log("error reading file");
    return;
  }

  const dataArray = data.split("\r\n").map((x) => x.split(""));

  while (true) {
    const seatsChanged = [];
    for (let i = 0; i < dataArray.length; i++) {
      for (let j = 0; j < dataArray[i].length; j++) {
        if (
          shouldSwitchSeatStatus(dataArray, i, dataArray[i], j, dataArray[i][j])
        ) {
          seatsChanged.push([i, j]);
        }
      }
    }

    seatsChanged.forEach((x) => performSeatSwap(dataArray, x));

    if (seatsChanged.length === 0) {
      const numericArray = dataArray.map((innerArray) =>
        innerArray.map((j) => {
          if (j === "#") {
            return 1;
          } else {
            return 0;
          }
        })
      );
      const totalOccupied = numericArray.flat().reduce((acc, x) => acc + x);
      console.log(totalOccupied);
      return;
    }
  }
});

function shouldSwitchSeatStatus(
  rowArray,
  rowIndex,
  seatArray,
  seatIndex,
  type
) {
  if (type === ".") {
    return false;
  }
  const adjacentSeats = {
    left: seatArray[seatIndex - 1],
    right: seatArray[seatIndex + 1],
    upperLeft:
      rowArray[rowIndex - 1] === undefined
        ? undefined
        : rowArray[rowIndex - 1][seatIndex - 1],
    lowerLeft:
      rowArray[rowIndex + 1] === undefined
        ? undefined
        : rowArray[rowIndex + 1][seatIndex - 1],
    upperRight:
      rowArray[rowIndex - 1] === undefined
        ? undefined
        : rowArray[rowIndex - 1][seatIndex + 1],
    lowerRight:
      rowArray[rowIndex + 1] === undefined
        ? undefined
        : rowArray[rowIndex + 1][seatIndex + 1],
    upper:
      rowArray[rowIndex - 1] === undefined
        ? undefined
        : rowArray[rowIndex - 1][seatIndex],
    lower:
      rowArray[rowIndex + 1] === undefined
        ? undefined
        : rowArray[rowIndex + 1][seatIndex],
  };

  if (type === "L") {
    const occupied = Object.keys(adjacentSeats).every(
      (key) => adjacentSeats[key] !== "#"
    );

    return occupied;
  } else if (type === "#") {
    let totalOccupied = 0;
    Object.keys(adjacentSeats).forEach((key) => {
      if (adjacentSeats[key] === "#") {
        totalOccupied++;
      }
    });

    return totalOccupied >= 4;
  }
}

function performSeatSwap(dataArray, coord) {
  let seat = dataArray[coord[0]][coord[1]];
  seat = seat === "#" ? "L" : "#";
  dataArray[coord[0]][coord[1]] = seat;
}
