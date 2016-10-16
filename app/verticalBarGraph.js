'use strict';

import React from 'react';
import { toPairs } from 'lodash';

const Bar = props => (
  <div className={`bar ${props.seriesKey}`} style={{height: props.height + 'px'}}>
    {props.seriesKey}
  </div>
);

export default class VerticalBarGraph extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {};
    this.data = props.Data;
  }

  componentDidMount() {
      this.data.subscribe(d => this.setState(d));
  }

  render() {
    const series = toPairs(this.state)
                    .map((el, i) => {
                      return <Bar key={i} seriesKey={el[0]} height={el[1]}/>;
                    });
    return <div>{series}</div>;
  }
}