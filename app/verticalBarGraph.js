'use strict';

import React from 'react';
import { toPairs, max, min, rangeRight } from 'lodash';

const containerHeight = 250;

const calculateBarOffset = (barValue, max, min) => {
  const range = max - min;
  const diff = max - barValue;
  const pixelsPerUnit = containerHeight/range;
  return diff*pixelsPerUnit;
};

const CenterAxis = props => {
  const top = calculateBarOffset(0, props.max, props.min);
  return <div className="center-axis" style={{top: top + 'px'}}></div>
};

const Bar = props => {
  const valOffset = calculateBarOffset(props.value, props.max, props.min);
  const zeroOffset = calculateBarOffset(0, props.max, props.min);
  
  const height = Math.abs(valOffset - zeroOffset);
  const top = Math.min(valOffset, zeroOffset);

  return <div className={`bar ${props.seriesKey.replace(' ', '-')}`} 
       style={{top: top + 'px', height: height + 'px'}}>
    {props.seriesKey}
  </div>
};

const createRange = (min, max) => {
  if (!min || !max) {return [];}

  if (max < 0) { max = 0; }

  const step = (max - min) / 10;

  const range = rangeRight(min, max, step);
  range.unshift(max);
  return range;
}

class VerticalAxis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {range: props.range || []};
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    const points = this.state.range.map(r => {
      return <div key={r} className="point">{r}</div>;      
    })

    return <div className="left-axis">
            {points}
          </div>
  }
}

export default class VerticalBarGraph extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {};
    this.data = props.Data;
    this.data.subscribe(d => this.setState(d));
  }

  render() {
    const pairs = toPairs(this.state)
    const values = pairs.map(p=>p[1]);
    const range = createRange(min(values), max(values), 10);
    const series = pairs
                    .map((el, i) => {
                      return <Bar key={i} 
                                  seriesKey={el[0]} 
                                  value={el[1]} 
                                  max={max(values)}
                                  min={min(values)}/>;
                    });
    return <div>
            <CenterAxis min={min(values)} max={max(values)}/>
            <div id="graph">
              <VerticalAxis range={range}/>
              {series}
            </div>
          </div>
  }
}