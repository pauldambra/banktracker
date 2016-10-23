'use strict';

import { reduce } from 'lodash';

export const totalSpendingTypes = s => {
  return reduce(s, (acc, el) => {
    acc[el.type] = (acc[el.type] += el.amount) || el.amount;
    return acc;
  }, {});
};

const splitDateWindow = dw => {
  const month = dw.split('/')[0];
  const year = dw.split('/')[1];
  return {month, year};
}

const dateWindowIsValid = dw => {
  const d = splitDateWindow(dw);
  return Number.isSafeInteger(d.month) && Number.isSafeInteger(d.year);
}

const prepareSpendingTypesForDisplay = pair => {
  const d = splitDateWindow(pair[0]);
  return totalSpendingTypes(pair[1][d.year][d.month]);
};

export const spendingTypesForDisplayFrom = dataForDisplay$ => {
  return dataForDisplay$
    .filter(pair => !dateWindowIsValid(pair[0]))
    .map(pair => prepareSpendingTypesForDisplay(pair));
};