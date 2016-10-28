'use strict';

import React from 'react';
//import { toPairs, max, min, rangeRight } from 'lodash';

const containerHeight = 250;

const ratioForCss = s => {
  let ratio = s.moneyIn / (s.moneyIn+s.moneyOut);
  ratio = ratio / 2; //turn goes 0 to 1 and a gauge is half a circle
  ratio = ratio.toFixed(2);
  ratio = ratio.replace(/^0\./, '\.'); //strip leading zero
  ratio = ratio.replace(/(\.\d)0$/, '$1'); //strip trailing zero
  return ratio;
}

export default class ComparisonGauge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {moneyIn: 0, moneyOut: 0};
    this.data = props.Data;
    this.data.subscribe(d => {
      if (d) this.setState(d)
    });
  }

  render() {
    const rotation = {
      transform: `rotate(${ratioForCss(this.state)}turn)`
    }
    const balance = (this.state.moneyIn - this.state.moneyOut).toFixed(2);

    const balanceClasses = `gauge-caption balance ${balance >= 0 ? 'credit' : 'debit'}`;

    return <div className="comparison-gauge">
            <figure>
              <div className="gauge">
                <div className="meter" style={rotation}>
                </div>
              </div>
              <figcaption className="gauge-caption">{this.props.caption}</figcaption>
              <div className={balanceClasses}>
                Balance: £{balance}
              </div>
            </figure>
          </div>
  }
}