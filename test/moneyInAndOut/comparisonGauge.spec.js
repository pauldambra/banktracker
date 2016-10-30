import React from 'react';
import Rx from 'rx';
import { mount } from 'enzyme';
import ComparisonGauge from '../../app/moneyInAndOut/comparisonGauge.component';

describe('the comparison gauge', function() {
  it('should set the style of the gauge to show the relative values provided in props', function() {
    const dataIn$ = new Rx.Subject();
    const nextData = {moneyIn: 200, moneyOut: 300};
    const expectedTurn = '.2turn'
    const expectedStyle = `style="transform: rotate(${expectedTurn})"`

    let wrapper = mount(<ComparisonGauge data={dataIn$} />);
    dataIn$.onNext(nextData);
    
    const gauge = wrapper.find('.gauge');
    gauge.html().should.containEql(`class="meter" ${expectedStyle}`);
  });

  it('should set the caption', function() {
    let wrapper = mount(<ComparisonGauge data={new Rx.Subject()} caption="something provided"/>);
    wrapper.find('figcaption').text().should.eql('something provided');
  });
});