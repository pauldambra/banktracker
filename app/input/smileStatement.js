'use strict';

import { chain, map, filter, groupBy } from 'lodash';

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
  if (line.length === 7) {
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

export const parse = txt => {
  const [header, ...data] = txt.split('\n');
  
  return chain(data)
    .filter(line => line.length !== 0)
    .map(line => {
      let lineItems = splitLine(line);
      lineItems = checkForDescriptionsWithCommas(lineItems);

      return {
        date: lineItems[dateColumn].split('-'),
        type: lineItems[typeColumn],
        amount: parseFloat(lineItems[moneyInColumn] || -lineItems[moneyOutColumn]),
        balance: parseFloat(lineItems[balanceColumn])
      };
    })
    .groupBy(el => el.date[0])
    .mapValues(yr => groupBy(yr, i=>i.date[1]))
    .value();
}