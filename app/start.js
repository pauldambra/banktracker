'use strict';

import StatementInput from './input/statementInput';
import VerticalBarGraph from './verticalBarGraph';
import DateSlider from './dates/dateSlider'
import ComparisonGauge from './comparisonGauge'

import { spendingTypesForDisplayFrom } from './spendingTypes';
import React from 'react';
import ReactDOM from 'react-dom';

import * as statementRouter from './statementRouter';

ReactDOM.render(
  <StatementInput Subject={statementRouter.statements$} />,
  document.getElementById('statement-adder')
);

ReactDOM.render(
  <DateSlider InboundData={statementRouter.datesAvailable$} OutboundData={statementRouter.dateChoices$} />,
  document.getElementById('date-slider-wrapper')
);

ReactDOM.render(
  <VerticalBarGraph Data={statementRouter.spendingTypesForDisplay$} />,
  document.getElementById('by-spending-type')
);

ReactDOM.render(
  <ComparisonGauge Data={statementRouter.totalsForComparison$} caption="money in vs. money out"/>,
  document.getElementById('totals-for-comparison')
);