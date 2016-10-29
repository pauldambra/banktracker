
import React from 'react';
import { MapObservable } from 'rx';

const DateSpan = props => {
  return <span className={props.clazz}>{props.d}</span>;
};

const propTypes = {
  inboundData: React.PropTypes.instanceOf(MapObservable).isRequired,
  outboundDataStreams: React.PropTypes.array.isRequired
};

export default class DateSlider extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {currentDate: 0, currentValue: 0};
    this.inboundData = props.inboundData;
    this.outboundDataStreams = props.outboundDataStreams;
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.inboundData.subscribe(d => this.setState({dateRange: d}));
  }

  handleChange(e) {
    this.setState({ 
      currentValue: e.target.value 
    });
  }

  render() {
    const maxRange = 
      this.state.dateRange ? this.state.dateRange.length - 1 : 0;
    const mappedDate = 
      this.state.dateRange && this.state.dateRange.range ? this.state.dateRange.range[this.state.currentValue] : '';
    const startDate = 
      this.state.dateRange ? this.state.dateRange.start : '';
    const endDate = 
      this.state.dateRange ? this.state.dateRange.end : '';

    const currentDate = mappedDate || '?';
    
    if (currentDate !== '?') {
      for (var i = 0; i < this.outboundDataStreams.length; i++) {
        const currentStream = this.outboundDataStreams[i];
        currentStream.onNext(currentDate);
      }
    }

    return (<div className="date-slider">
      <div className="slider-wrapper">
        <DateSpan d={endDate} clazz="endDate" />
        <input type="range"
          onChange={this.handleChange}
          value={this.state.currentValue}
          min="0"
          max={maxRange}
          />
        <DateSpan d={startDate} clazz="startDate" />
      </div>
      <div className="current-date">Showing: {currentDate}</div>
    </div>);
  }
}

DateSlider.propTypes = propTypes;