'use strict';

import React from 'react';

// const StatementInput = React.createClass({
//     onPaste: function(e) {
//         console.log(e.clipboardData.getData('Text'), 'test');
//     },
//     render: function() {
//         return (
//             <textarea/>
//         );
//     }
// });

export default class StatementInput extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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