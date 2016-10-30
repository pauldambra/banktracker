'use strict';

import { reduce } from 'lodash';
import { splitDateWindow, dateWindowIsValid } from '../dates/dateWindow';

export const totalSpendingTypes = s => {
  return reduce(s, (acc, el) => {
    acc[el.type] = (acc[el.type] += el.amount) || el.amount;
    return acc;
  }, {});
};

const prepareSpendingTypesForDisplay = pair => {
  const d = splitDateWindow(pair[0]);
  return totalSpendingTypes(pair[1][d.year][d.month]);
};

export const spendingTypesForDisplayFrom = dataForDisplay$ => {
  return dataForDisplay$
    .filter(pair => !dateWindowIsValid(pair[0]))
    .map(pair => prepareSpendingTypesForDisplay(pair));
};