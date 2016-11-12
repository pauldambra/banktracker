'use strict';

import React from 'react';
import { Subject } from 'rx';

const sparkLinePropTypes = {
  data: React.PropTypes.instanceOf(Subject).isRequired
};

// place an item of data within it's range from 0 to height pixels
const translateToPixels = (n, max, height) => ((n/max)*height).toFixed(2) +'px';
const trimZeroes = n => n.replace(/\.00px$/, 'px');
const Cell = props => {
  const valueInPixels = trimZeroes(translateToPixels(props.cellValue, props.rangeMax, props.height));
  return <div className="cell" style={{ height: valueInPixels }} title={'£'+props.cellValue}></div>
};

const Series = props => {
  const cellElements = props.cells.map((c, i) => <Cell key={i} cellValue={c} rangeMax={props.rangeMax} height={props.height}/>)
  return <div className="series row">
      {cellElements}
    </div>
};

export default class ComparisonSparkline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {moneyIn: [], moneyOut: []};
    this.data$ = props.data;
    this.height = props.height;
    this.data$.subscribe(nextData => {
      if (nextData) {
        const moneyIn = nextData.map(d => d.moneyIn);
        const moneyOut = nextData.map(d => d.moneyOut);
        const rangeMax = Math.max(...moneyIn, ...moneyOut);
        const newState = {
          moneyIn,
          moneyOut,
          rangeMax
        };
        this.setState(newState);
      }
    });
  }

  render() {
    return <div className="sparkline-graph">
            <div className="graph">
              <div className="positive row" style={{height: this.height/2+'px'}}>
                <div className="legend">
                  Money In
                </div>
                <Series cells={this.state.moneyIn} rangeMax={this.state.rangeMax} height={this.height/2}/>
              </div>
              <div className="negative row" style={{height: this.height/2+'px'}}>
                <div className="legend">
                  Money Out
                </div>
                <Series cells={this.state.moneyOut} rangeMax={this.state.rangeMax} height={this.height/2}/>
              </div>
            </div>
          </div>
  }
}

ComparisonSparkline.propTypes = sparkLinePropTypes;
