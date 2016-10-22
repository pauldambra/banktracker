'use strict';

import StatementInput from './input/statementInput';
import VerticalBarGraph from './verticalBarGraph';
import DateSlider from './dates/dateSlider'
import { spendingTypesForDisplayFrom } from './spendingTypes';
import React from 'react';
import ReactDOM from 'react-dom';

import * as statementRouter from './statementRouter';

ReactDOM.render(
  <StatementInput Subject={statementRouter.statements$} />,
  document.getElementById('statement-adder')
);

ReactDOM.render(
  <DateSlider InboundData={statementRouter.parsedStatements$} OutboundData={statementRouter.dateWindow$} />,
  document.getElementById('date-slider-wrapper')
);

ReactDOM.render(
  <VerticalBarGraph Data={statementRouter.spendingTypesForDisplay$} />,
  document.getElementById('by-spending-type')
);

statementRouter.parsedStatements$.subscribe(x => console.log(x, 'ps'));
statementRouter.dataForDisplay$.subscribe(x => console.log(x, 'dfd'));
statementRouter.spendingTypesForDisplay$.subscribe(x => console.log(x, 'stfd'));