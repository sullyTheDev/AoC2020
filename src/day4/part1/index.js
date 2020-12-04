const tools = require('../../shared/dataReader');

tools.dataReader('../input.txt', (err, data) => {
  if(err) {
    console.log('error reading file');
    return;
  }

  const expectedFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const optionalFields = ['cid'];
  const dataArray = data.split('\r\n\r\n');
  let validEntries = 0;
  dataArray.forEach(x => {
    if(expectedFields.every(field => x.includes(field))) {
      validEntries++;
    }
  });

  console.log(`There are ${validEntries} valid entries`);
});