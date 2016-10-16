import statement from './statement';
import StatementInput from '../app/StatementInput';

import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';

const statements$ = new Rx.Subject();

statements$
  .map(s => statement.parse(s.value))
  .subscribe(s => console.log(s));

ReactDOM.render(
  <StatementInput Subject={statements$} />,
  document.getElementById('statement-adder')
);