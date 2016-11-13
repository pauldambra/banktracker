import React from 'react';
import Rx from 'rx';
import { mount } from 'enzyme';
import SparklineWithTotal from '../../app/moneyInAndOut/sparklineWithTotal.component.js';

describe('the sparkline with total component', function() {


  it('should set the title', function() {
    let wrapper = mount(<SparklineWithTotal sparklineData={new Rx.Subject()} 
                                            totalData={new Rx.Subject()} 
                                            title="a title"/>);
    wrapper.find('h1').text().should.eql('a title');
  });

});