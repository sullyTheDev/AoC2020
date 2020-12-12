const tools = require("../../shared/dataReader");

tools.dataReader("C:/Repos/AoC2020/src/day12/input.txt", (err, data) => {
  if (err) {
    console.log("error reading file");
    return;
  }

  const commandArray = data.split("\r\n");
  const ferry = new Ship();

  commandArray.forEach((x) => {
    const command = x.substring(0, 1);
    const amount = +x.substring(1);
    ferry.move(command, amount);
  });

  console.log(
    `the ferry is at a Manhattan distance of ${ferry.manhattanDistance}`
  );
});

class Ship {
  coords = {
    east: 0,
    south: 0,
    west: 0,
    north: 0,
  };
  direction = "";

  get manhattanDistance() {
    const horizontal =
      Math.max(this.coords.east, this.coords.west) -
      Math.min(this.coords.east, this.coords.west);
    const vertical =
      Math.max(this.coords.north, this.coords.south) -
      Math.min(this.coords.north, this.coords.south);
    return horizontal + vertical;
  }

  constructor(startingDirection = "east") {
    this.direction = startingDirection;
  }

  turn(direction, degrees) {
    const turnsToMake = degrees / 90;
    const directions = Object.keys(this.coords);
    let newDirectionIndex =
      direction === "R"
        ? directions.indexOf(this.direction) + turnsToMake
        : directions.indexOf(this.direction) - turnsToMake;

    if (newDirectionIndex > directions.length - 1) {
      newDirectionIndex = newDirectionIndex % directions.length;
    }

    if (newDirectionIndex < 0) {
      newDirectionIndex = directions.length + newDirectionIndex;
    }

    this.direction = directions[newDirectionIndex];
  }

  move(direction, amount) {
    switch (direction) {
      case "N":
        this.coords.north += amount;
        break;
      case "S":
        this.coords.south += amount;
        break;
      case "E":
        this.coords.east += amount;
        break;
      case "W":
        this.coords.west += amount;
        break;
      case "L":
        this.turn("L", amount);
        break;
      case "R":
        this.turn("R", amount);
        break;
      case "F":
        this.coords[this.direction] += amount;
    }
  }
}
