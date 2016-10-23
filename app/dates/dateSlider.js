
import React from 'react';

const DateSpan = props => {
  return <span className={props.clazz}>{props.d}</span>;
};

export default class DateSlider extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {currentDate: 0, currentValue: 0};
    this.inboundData = props.InboundData;
    this.outboundData = props.OutboundData;
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
      this.outboundData.onNext(currentDate);
    }
    
    return (<div className="date-slider">
      <div>
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