'use strict';

import React from 'react';

export default class StatementTypeSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {statementType: 'current'};
    this.output$ = props.output;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({statementType: event.target.value});
    this.output$.onNext(event.target.value);
  }

  render() {
    return (<div>
      <label>
        <input type="radio" 
               name="statementType" 
               value="current" 
               defaultChecked={this.state.statementType === 'current'}
               onChange={this.handleChange}/>
        Current Account
      </label>
      <label>
        <input type="radio" 
               name="statementType" 
               value="savings" 
               defaultChecked={this.state.statementType === 'savings'}
               onChange={this.handleChange}/>
        Savings Account
      </label>
    </div>
    );
  }
}