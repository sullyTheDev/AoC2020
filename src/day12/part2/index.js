const tools = require('../../shared/dataReader');

tools.dataReader('C:/Repos/AoC2020/src/day12/input.txt', (err, data) => {
    if (err) {
        console.log('error reading file');
        return;
    }

    const commandArray = data.split('\r\n');
    const ferry = new Ship();

    commandArray.forEach(x => {
        const command = x.substring(0, 1);
        const amount = +x.substring(1);
        ferry.move(command, amount);
    });

    console.log(`the ferry is at a Manhattan distance of ${ferry.manhattanDistance}`);


});


class Ship {
    shipCoords = {
        east: 0,
        south: 0,
        west: 0,
        north: 0
    };

    waypointCoords = {
        east: 10,
        south: 0,
        west: 0,
        north: 1
    }

    get manhattanDistance() {
        const horizontal = Math.max(this.shipCoords.east, this.shipCoords.west) - Math.min(this.shipCoords.east, this.shipCoords.west);
        const vertical = Math.max(this.shipCoords.north, this.shipCoords.south) - Math.min(this.shipCoords.north, this.shipCoords.south);
        return horizontal + vertical;
    }

    constructor() { }

    rotateWaypoint(direction, degrees) {
        const turnsToMake = degrees/90;
        const directions = Object.keys(this.waypointCoords);
        const tempObject = {};
        directions.forEach((val, i) => {
        let newDirection = direction === 'R' ? i - turnsToMake: i + turnsToMake;

        if(newDirection > directions.length - 1) {
            newDirection = newDirection % directions.length;
        }

        if(newDirection < 0) {
            newDirection = directions.length + newDirection;
        }
            tempObject[val] = this.waypointCoords[directions[newDirection]];
        });

        this.waypointCoords = {...tempObject};
    }

    move(direction, amount) {
        switch(direction) {
            case 'N':
                this.waypointCoords.north += amount;
                break;
            case 'S':
                this.waypointCoords.south += amount;
                break;
            case 'E': 
                this.waypointCoords.east += amount;
                break;
            case 'W': 
                this.waypointCoords.west += amount;
                break;
            case 'L':
                this.rotateWaypoint('L', amount);
                break;
            case 'R':
                this.rotateWaypoint('R', amount);
                break;
            case 'F':
                Object.keys(this.waypointCoords).forEach(direction => {
                    const movement = this.waypointCoords[direction] * amount;
                    this.shipCoords[direction] += movement;
                });
                break;
        }
    }

    
}