'use strict';

import React from 'react';
import { Subject } from 'rx';

const sparkLinePropTypes = {
  data: React.PropTypes.instanceOf(Subject).isRequired,
};

export default class TotalBadge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {total: 0};
    this.data$ = props.data;
    this.data$.subscribe(nextData => {
      if (nextData) {
        this.setState({total: nextData});
      }
    });
  }

  render() {
    return <div className="total-badge">
            £<span>{this.state.total.toFixed(2)}</span>
          </div>;
  }
}

TotalBadge.propTypes = sparkLinePropTypes;
