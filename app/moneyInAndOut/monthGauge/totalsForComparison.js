import Rx from 'rx';
import { splitDateWindow, dateWindowIsValid } from '../../dates/dateWindow';
import { reduce } from 'lodash';

export const totalsForComparison = s => {
  return reduce(s, (acc, el) => {
    if (el.amount > 0) {
      acc.moneyIn += el.amount;
    } else {
      acc.moneyOut += Math.abs(el.amount);
    }
    return acc;
  }, {moneyIn: 0, moneyOut: 0});
};

const prepareComparisonsForDisplay = pair => {
  const d = splitDateWindow(pair[0]);
  return totalsForComparison(pair[1][d.year][d.month]);
};

export const totalsForComparisonFrom = dataForDisplay$ => {
    return dataForDisplay$
      .filter(pair => !dateWindowIsValid(pair[0]))
      .map(pair => prepareComparisonsForDisplay(pair));
};