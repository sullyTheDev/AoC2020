const tools = require('../../shared/dataReader');

tools.dataReader('C:/Repos/AoC2020/src/day7/input.txt', (err, data) => {
    if(err) {
        console.log('error reading file:', err);
        return;
    }
    const dataArray = data.split('\r\n');
    const containingBagsSet = filterFn(dataArray, new Set(['shiny gold']));

    console.log(`There are ${containingBagsSet.size} bag combonations that can hold the 'shiny gold' bag`);
});


function filterFn(array, parentBagSet) {
    for(let i = 0; i < parentBagSet.size; i++) {
        const items = array.filter(x => !x.startsWith([...parentBagSet][i]) && (x.includes([...parentBagSet][i]))).map(x => x.slice(0, x.indexOf(' bags')));
        parentBagSet = new Set([...parentBagSet, ...items]);
    }
    parentBagSet.delete('shiny gold');
    return parentBagSet;
}