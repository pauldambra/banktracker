
import { sum, map, toPairs, chain, flatMap } from 'lodash';

const flattenToTotal = dataByYearAndMonth => {
  return chain(dataByYearAndMonth)
    .toPairs()
    .map(x => x[1])
    .map((val, key, collection) => {
      return chain(val)
        .flatMap(v => v)
        .map(v => v.amount)
        .value();
    })
    .flatMap(x => x)
    .sum()
    .value();
};

export const overallTotalFrom = dataForDisplay$ => {
    return dataForDisplay$
      .map(x => flattenToTotal(x[1]));
};
