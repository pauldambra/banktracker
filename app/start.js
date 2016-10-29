'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';

import StatementInput from './input/statementInput';
import StatementTypeSwitch from './input/statementTypeSwitch';
import VerticalBarGraph from './verticalBarGraph';
import DateSlider from './dates/dateSlider'
import ComparisonGauge from './comparisonGauge'

import { spendingTypesForDisplayFrom } from './spendingTypes';
import statementRouter from './statementRouter';

var statementTypeChoices$ = new Rx.Subject();

ReactDOM.render(
  <StatementTypeSwitch output={statementTypeChoices$}/>,
  document.getElementById('statement-type-switch')
);

ReactDOM.render(
  <StatementInput CurrentAccount={statementRouter.currentAccount.statements$} 
                  SavingsAccount={statementRouter.savingsAccount.statements$}
                  StatementTypeChoices={statementTypeChoices$} />,
  document.getElementById('statement-adder')
);

ReactDOM.render(
  <DateSlider InboundData={statementRouter.currentAccount.datesAvailable$} 
              OutboundData={[
                statementRouter.currentAccount.dateChoices$,
                statementRouter.savingsAccount.dateChoices$,
              ]} />,
  document.getElementById('date-slider-wrapper')
);

ReactDOM.render(
  <VerticalBarGraph Data={statementRouter.currentAccount.spendingTypesForDisplay$} />,
  document.getElementById('by-spending-type')
);

ReactDOM.render(
  <ComparisonGauge Data={statementRouter.currentAccount.totalsForComparison$} 
                   caption="money in vs. money out - current"/>,
  document.getElementById('currentaccount-totals-for-comparison')
);

ReactDOM.render(
  <ComparisonGauge Data={statementRouter.savingsAccount.totalsForComparison$} 
                   caption="money in vs. money out - savings"/>,
  document.getElementById('savingsaccount-totals-for-comparison')
);