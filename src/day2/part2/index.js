const tools = require('../../shared/dataReader');

tools.dataReader('../input.txt', (err, data) => {
  if(err) {
    console.log('Error reading file.');
    return;
  }
  const dataArray = data.replace(RegExp('\r\n', 'g'), ' ').split(' ');

  let validPasswordCount = 0;
  for(let i = 0; i < dataArray.length; i = i + 3) {
    const range = getRange(dataArray[i]);
    const char = getChar(dataArray[i + 1]);
    if(checkExpression(dataArray[i+2], char, range)) {
      validPasswordCount++;
    }
  }

  console.log(`There are ${validPasswordCount} passwords that are valid.`);
  
});


function getRange(range) {
  return range.split('-');
}

function getChar(charString) {
  return charString[0];
}

function checkExpression(expression, char, times) {
  const expressionArray = expression.split('');
  if(expressionArray[times[0] - 1] === char && expressionArray[times[1] - 1] === char) { 
    return false
  }
  else if(expressionArray[times[0] - 1] === char || expressionArray[times[1] - 1] === char) {
    return true
  } else {
    return false;
  }

}