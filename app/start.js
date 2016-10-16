'use strict';

import statement from './statement';
import StatementInput from './statementInput';
import spendingTypes from './spendingTypes';
import VerticalBarGraph from './verticalBarGraph';

import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';

const statements$ = new Rx.Subject();

const parsedStatements$ = statements$
  .map(s => statement.parse(s.value));

spendingTypes.totalOn(parsedStatements$);
const bySpendingType$ = spendingTypes.results$;
bySpendingType$.subscribe(bst => console.log(bst));

ReactDOM.render(
  <StatementInput Subject={statements$} />,
  document.getElementById('statement-adder')
);

ReactDOM.render(
  <VerticalBarGraph Data={bySpendingType$} />,
  document.getElementById('by-spending-type')
);