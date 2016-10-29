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
  <StatementInput currentAccount={statementRouter.currentAccount.statements$} 
                  savingsAccount={statementRouter.savingsAccount.statements$}
                  statementTypeChoices={statementTypeChoices$} />,
  document.getElementById('statement-adder')
);

ReactDOM.render(
  <DateSlider inboundData={statementRouter.currentAccount.datesAvailable$} 
              outboundDataStreams={[
                statementRouter.currentAccount.dateChoices$,
                statementRouter.savingsAccount.dateChoices$,
              ]} />,
  document.getElementById('date-slider-wrapper')
);

ReactDOM.render(
  <VerticalBarGraph data={statementRouter.currentAccount.spendingTypesForDisplay$} />,
  document.getElementById('by-spending-type')
);

ReactDOM.render(
  <ComparisonGauge data={statementRouter.currentAccount.totalsForComparison$} 
                  title = "Current Account"
                  caption="money in vs. money out"/>,
  document.getElementById('currentaccount-totals-for-comparison')
);

ReactDOM.render(
  <ComparisonGauge data={statementRouter.savingsAccount.totalsForComparison$} 
                  title = "Savings Account"
                  caption="money in vs. money out"/>,
  document.getElementById('savingsaccount-totals-for-comparison')
);
