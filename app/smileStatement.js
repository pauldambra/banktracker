'use strict';

const splitLine = l => l.split(',');

const strictParseFloat = function (value) {
  if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
    return Number(value);
  }
  return NaN;
}

/* 
  historically there have been some descriptions like "center parcs, f&b"
  but they aren't quoted in the downloaded csv so can't be distinguished
  other fields
*/
const checkForDescriptionsWithCommas = line => {
  if (line.length == 7) {
    return [
      line[0],
      `${line[1]} ${line[2]}`,
      line[3],
      line[4],
      line[5],
      line[6]
    ];
  }
  return line;
};

const dateColumn = 0;
const typeColumn = 2;
const moneyInColumn = 3;
const moneyOutColumn = 4;
const balanceColumn = 5;

const parseStatement = txt => {
  const [header, ...data] = txt.split('\n');
  
  return (data || [])
    .filter(line => line.length !== 0)
    .map(line => {
      let lineItems = splitLine(line);
      lineItems = checkForDescriptionsWithCommas(lineItems);

      return {
        date: lineItems[dateColumn],
        type: lineItems[typeColumn],
        amount: parseFloat(lineItems[moneyInColumn] || -lineItems[moneyOutColumn]),
        balance: parseFloat(lineItems[balanceColumn])
      };
    });
}

export default { parse: parseStatement };