const tools = require('../../shared/dataReader');

tools.dataReader('C:/repos/adventOfCode/src/day4/input.txt', (err, data) => {
  if (err) {
    console.log('error reading file');
    return;
  }

  const expectedFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const optionalFields = ['cid'];
  const ruleDefs = new Map()
    .set('byr', (data) => {
      return +data >= 1920 && +data <= 2002;
    })
    .set('iyr', (data) => {
      return +data >= 2010 && +data <= 2020;
    })
    .set('eyr', (data) => {
      return +data >= 2020 && +data <= 2030;
    })
    .set('hgt', (data) => {
      if (data.includes('cm')) {
        const num = +data.substring(0, data.length - 2);
        return num >= 150 && num <= 193;
      } else if (data.includes('in')) {
        const num = +data.substring(0, data.length - 2);
        return num >= 59 && num <= 76;
      }

      return false;
    })
    .set('hcl', (data) => {
      const test = new RegExp('^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$').test(data);
      return test;
    })
    .set('ecl', (data) => {
      const eyeColors = ['amb', 'blu', 'brn', 'gry', 'hzl', 'oth', 'grn'];
      return eyeColors.some((clr) => data === clr);
    })
    .set('pid', (data) => {
      return new RegExp('^\\d{9}$').test(data);
    })
    .set('cid', (data) => true);

  const dataArray = data.split('\r\n\r\n');
  let validEntries = 0;
  const correctFormatEntries = dataArray
    .filter((x) => {
      return expectedFields.every((field) => x.includes(field));
    })
    .map((x) => x.replace(RegExp('\r\n', 'g'), ' '));

  const validator = new Validator(ruleDefs);

  correctFormatEntries.forEach((entry) => {
    const props = entry.split(' ').map((x) => {
      return x.split(':');
    });

    if (
      props.every((prop) => {
        return validator.validate(prop[1], validator.ruleDefs.get(prop[0]));
      })
    ) {
      validEntries++;
    }
  });

  console.log(`There are ${validEntries} valid entries`);
});

class Validator {
  ruleDefs = new Map();
  constructor(ruleDefs) {
    this.ruleDefs = ruleDefs;
  }

  validate(data, ruleDef) {
    return ruleDef(data);
  }
}
