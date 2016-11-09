'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';

import StatementInput from './statements/statementInput.component';
import StatementTypeSwitch from './statements/statementTypeSwitch.component';
import VerticalBarGraph from './spendingByType/verticalBarGraph.component';
import DateSlider from './dates/dateSlider.component';
import ComparisonGauge from './moneyInAndOut/monthGauge/comparisonGauge.component';
import ComparisonSparkline from './moneyInAndOut/sparkline/comparisonSparkline.component';
import TotalBadge from './moneyInAndOut/totalBadge/totalBadge.component.js';

import { spendingTypesForDisplayFrom } from './spendingByType/spendingTypes';
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

// entire date range items

ReactDOM.render(
  <ComparisonSparkline data={statementRouter.savingsAccount.totalsByMonth$} title="Savings Account" height={60}/>,
  document.getElementById('savings-account-sparkline')
  );
ReactDOM.render(
  <TotalBadge data={statementRouter.savingsAccount.overallTotal$}/>,
  document.getElementById('savings-account-total')
  );
// date window items

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
