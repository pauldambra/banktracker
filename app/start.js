'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';

import StatementInput from './input/statementInput.component';
import StatementTypeSwitch from './input/statementTypeSwitch.component';
import VerticalBarGraph from './verticalBarGraph.component';
import DateSlider from './dates/dateSlider.component'
import ComparisonGauge from './comparisonGauge.component'

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
                  title = "Current Account"
                  caption="money in vs. money out"/>,
  document.getElementById('currentaccount-totals-for-comparison')
);

ReactDOM.render(
  <ComparisonGauge Data={statementRouter.savingsAccount.totalsForComparison$} 
                  title = "Savings Account"
                  caption="money in vs. money out"/>,
  document.getElementById('savingsaccount-totals-for-comparison')
);