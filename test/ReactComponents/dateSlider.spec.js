import React from 'react';
import { mount } from 'enzyme';
import Rx from 'rx';
import DateSlider from '../../app/dates/dateSlider.component'

describe('the date slider', function() {
  const inputData = {
      length: 27,
      start: '09/2014',
      end: '11/2016',
      range: [
      '09/2014', '10/2014', '11/2014', '12/2014', 
      '01/2015', '02/2015', '03/2015', '04/2015', '05/2015', '06/2015', '07/2015', '08/2015', '09/2015', '10/2015', '11/2015', '12/2015', 
      '01/2016', '02/2016', '03/2016', '04/2016', '05/2016', '06/2016', '07/2016', '08/2016', '09/2016', '10/2016', '11/2016'
      ].reverse()
    };

  let inbound$;
  let one$;
  let two$;
  let wrapper;

  beforeEach(function() {
    inbound$ = new Rx.Subject();
    one$ = new Rx.Subject();
    two$ = new Rx.Subject();
    wrapper = mount(<DateSlider InboundData={inbound$} OutboundData={[one$, two$]} />);
  });

  it('sets its bounds when data received', function() {
    inbound$.onNext(inputData)
    wrapper.find('.startDate').text().should.be.exactly('09/2014');
    wrapper.find('.endDate').text().should.be.exactly('11/2016');
  });

  it('sets its current value to the latest date when first setup', function() {
    inbound$.onNext(inputData)
    wrapper.find('.current-date').text().should.be.exactly('Showing: 11/2016');
  });

  // 9/14, 10/14, 11/14, 12/14, 01/15 ... 11/16 == 26 months
  // starts at 11/16
  // input => 6 === 03/2015 (zero based and running n0w-est to earliest !)
  it('sets the input value on change', function() {
    inbound$.onNext(inputData);
    wrapper.find('input').simulate('change', { target: { value: '6' } });
    wrapper.find('input').html().should.containEql('value="6"');
  });

  it('sets the current date on change', function() {
    inbound$.onNext(inputData);
    wrapper.find('input').simulate('change', { target: { value: '6' } });
    wrapper.find('.current-date').html().should.containEql('05/2016');
  });

  it('tells subscribers the chosen date', function(done) {
    let oneStream = [];
    let twoStream = [];

    const testExpectation = _ => {
      if (oneStream.length === 2 && twoStream.length === 2) {
      oneStream.should.eql(['11/2016', '04/2016']);
      twoStream.should.eql(['11/2016', '04/2016']);
      done();
      }
    };

    one$.subscribe(os => {
      oneStream.push(os);
      testExpectation();
    });
    two$.subscribe(ts => {
      twoStream.push(ts);
      testExpectation();
    });

    inbound$.onNext(inputData);
    wrapper.find('input').simulate('change', { target: { value: '7' } });
  });
});