'use strict';

import React from 'react';

export default class StatementInput extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {};
    this.currentAccount$ = props.CurrentAccount;
    this.savingsAccount$ = props.SavingsAccount;
    
    props.StatementTypeChoices.subscribe(stc => this.statementTypeChoice = stc);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    //defaults to current account
    if (this.statementTypeChoice === 'savings') {
      this.savingsAccount$.onNext(event.target);
    } else {
      this.currentAccount$.onNext(event.target);
    }
    
  }

  render() {
    return (
      <textarea
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}