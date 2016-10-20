'use strict';

import Rx from 'rx';
import { reduce } from 'lodash';

const spendingTypesResults = new Rx.Subject();

const reduceIntoResults = s => {

  s = reduce(s, (acc, el) => {
    if (!el || !el.type) {
      console.log(el, 'wat');
    }

    if (!acc[el.type]) {
      acc[el.type] = el.amount;
    } else {
      acc[el.type] += el.amount;
    }
    return acc;
  }, {});
  spendingTypesResults.onNext(s);
};


export default {
  totalOn: s$ => {
    s$.subscribe(reduceIntoResults);
  },
  results$: spendingTypesResults
};