import { totalsForComparison } from '../totalsForComparison';

import { chain, map, toPairs, sortBy, chunk } from 'lodash';

const isOneMonthApart = (l, r) => {
  const december = 11;
  const january = 0;
  l = l.getMonth();
  r = r.getMonth();
  return l === december ? r === january : l + 1 === r;
}

const curryFlattenDateKeys = data => {
  return (acc, val, year) => {
    for (const month in val) {
      if (month == 'month') { continue; }
      const startOfMonth = `${year}-${month}-1`;
      acc[startOfMonth] = data[year][month];
    }
    return acc;
  };  
}

const incrementMonth = d => {
  var newDate = new Date(d.getTime());
  newDate.setMonth(newDate.getMonth() + 1);
  return newDate;
}

const flattenToMonthlyTotals = dataByYearAndMonth => {
  const flattenDateKeys = curryFlattenDateKeys(dataByYearAndMonth);
  const flattenedData = chain(dataByYearAndMonth)
    .reduce(flattenDateKeys, {})
    .toPairs()
    .map(el => [new Date(el[0]), el[1]])
    .map(el => [el[0], totalsForComparison(el[1])])
    .sortBy(el => new Date(el[0]))
    .value();

  for (var i = 0; i < flattenedData.length -1; i++) {
    const currentDate = flattenedData[i][0];
    const nextDate = flattenedData[i+1][0];
    if (!isOneMonthApart(currentDate, nextDate)) {

      flattenedData.splice(i+1, 0, [
          incrementMonth(currentDate),
          {moneyIn: 0, moneyOut: 0}
        ]);
    }
  }

  return flattenedData.map(fd => fd[1]);
}

export const monthlyTotalsFrom = dataForDisplay$ => {
    return dataForDisplay$
      .map(pair => flattenToMonthlyTotals(pair[1]));
};