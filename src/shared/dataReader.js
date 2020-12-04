const fs = require('fs');

function dataReader(inputPath, callBack) {
  return fs.readFile(inputPath, 'utf8', callBack);
}

module.exports = {
  dataReader
}