'use strict';

import React from 'react';

export default class StatementInput extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(event);
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