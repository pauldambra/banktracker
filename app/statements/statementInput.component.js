'use strict';

import React from 'react';
import {Subject} from 'rx';

const propTypes = {
  currentAccount: React.PropTypes.instanceOf(Subject).isRequired,
  savingsAccount: React.PropTypes.instanceOf(Subject).isRequired,
  statementTypeChoices: React.PropTypes.instanceOf(Subject).isRequired
};

export default class StatementInput extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {};
    this.currentAccount$ = props.currentAccount;
    this.savingsAccount$ = props.savingsAccount;
    
    props.statementTypeChoices.subscribe(stc => this.statementTypeChoice = stc);

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

StatementInput.propTypes = propTypes;