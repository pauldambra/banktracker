'use strict';

import React from 'react';
import { Subject } from 'rx';

import ComparisonSparkline from './sparkline/comparisonSparkline.component';
import TotalBadge from './totalBadge/totalBadge.component.js';

const sparklineWithTotalPropTypes = {
  sparklineData: React.PropTypes.instanceOf(Subject).isRequired,
  totalData: React.PropTypes.instanceOf(Subject).isRequired,
  title: React.PropTypes.string.isRequired
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center'
  },
  leftCol: {
    alignSelf: 'center'
  },
  rightCol: {
    alignSelf: 'center',
    marginLeft: '2em'
  },
};

export default class SparklineWithTotal extends React.Component {
  render() {
    return <div>
      <h1 style={styles.title}>{this.props.title}</h1>
      <div style={styles.wrapper}>
        <div style={styles.leftCol}>
          <ComparisonSparkline data={this.props.sparklineData} 
                               height={60}/>
        </div>
        <div style={styles.rightCol}>
          <TotalBadge data={this.props.totalData}/>
        </div>
      </div>
    </div>;
  }
}

SparklineWithTotal.propTypes = sparklineWithTotalPropTypes;
