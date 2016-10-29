import React from 'react';
import { mount } from 'enzyme';
import VerticalBarGraph from '../../app/verticalBarGraph.component';
import Rx from 'rx';

describe('the vertical bar graph', function() {
  const expectedData = {
    switch: -4, 
    dd: -10, 
    cash: -20, 
    'child benefit': 30
  };
  let subject;
  let wrapper;

  beforeEach(function() {
    subject = new Rx.Subject();
    wrapper = mount(<VerticalBarGraph Data={subject} />);
  });

  it('can show data', function() {
    subject.onNext(expectedData);
    const switchBar = wrapper.find('.bar.switch');
    const expectedHtml = '<div class="bar switch" style="top: 150px; height: 20px;">switch</div>';
    switchBar.html().should.be.exactly(expectedHtml);
  });

  it('can calculate left axis', function() {
    subject.onNext(expectedData);
    const points = wrapper.find('.left-axis .point')
                          .map(p => p.html())
                          .map(p => p.replace('<div class="point">', ''))
                          .map(p => p.replace('</div>', ''));
    points[0].should.be.exactly('£ 30');
    points[points.length-1].should.be.exactly('£ -20');
  });

  it('can calculate proportion of height to 0 for center axis', function() {
    subject.onNext(expectedData);
    const center = wrapper.find('.center-axis');
    center.html().should.containEql('top: 150px');
  });

  it('can make sure the left axis always includes 0', function() {
    subject.onNext({a: -4, b: -10, c: -40});
    const points = wrapper.find('.left-axis .point')
                      .map(p => p.html())
                      .map(p => p.replace('<div class="point">', ''))
                      .map(p => p.replace('</div>', ''));
    points[0].should.be.exactly('£ 0');
  });

  it('can set top for a positive bar', function() {
    subject.onNext(expectedData);
    const bar = wrapper.find('.bar.child-benefit');
    bar.html().should.containEql('top: 0px');
  });

  it('can set height for a positive bar', function() {
    subject.onNext(expectedData);
    const bar = wrapper.find('.bar.child-benefit');
    bar.html().should.containEql('height: 150px');
  });

  it('can set top for a negative bar', function() {
    subject.onNext(expectedData);
    const bar = wrapper.find('.bar.dd');
    bar.html().should.containEql('top: 150px');
  });

  it('can set height for a positive bar', function() {
    subject.onNext(expectedData);
    const bar = wrapper.find('.bar.dd');
    bar.html().should.containEql('height: 50px');
  });
});