const tools = require("../../shared/dataReader");

tools.dataReader("../input.txt", (err, data) => {
  if (err) {
    console.log("error reading file");
    return;
  }

  const input = data.split("\r\n").map((x) => x.split(""));

  let map = {};
  //initial map of the small 2d starting slice
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === "#") {
        map[`${x},${y},0,0`] = true;
      }
    }
  }
  let height = [0, input.length];
  let width = [0, input[0].length];
  let depth = [0, 1];
  let fourD = [0, 1];
  //six cycles --- create a 6 x n dimensions layer deep map object
  for (let t = 0; t < 6; t++) {
    let newMap = {};
    depth[0]--;
    depth[1]++;
    width[0]--;
    width[1]++;
    height[0]--;
    height[1]++;
    fourD[0]--;
    fourD[1]++;
    for (let w = fourD[0]; w < fourD[1]; w++) {
      for (let z = depth[0]; z < depth[1]; z++) {
        for (let y = width[0]; y < width[1]; y++) {
          for (let x = height[0]; x < height[1]; x++) {
            let neigh = countSurroundingBlocks(x, y, z, w, map);
            const isActive = map[`${x},${y},${z},${w}`];
            if (neigh === 3 || (neigh === 2 && isActive)) {
              newMap[`${x},${y},${z},${w}`] = true;
            }
          }
        }
      }
    }

    map = newMap;
  }
  console.log(Object.keys(map).length);
});

function countSurroundingBlocks(x, y, z, w, map) {
  let count = 0;
  for (let ww = w - 1; ww <= w + 1; ww++) {
    for (let zz = z - 1; zz <= z + 1; zz++) {
      for (let yy = y - 1; yy <= y + 1; yy++) {
        for (let xx = x - 1; xx <= x + 1; xx++) {
          if (
            (xx !== x || yy !== y || zz !== z || ww !== w) &&
            map[`${xx},${yy},${zz},${ww}`]
          ) {
            count++;
          }
        }
      }
    }
  }
  return count;
}
