import React from 'react';
import Rx from 'rx';
import { mount } from 'enzyme';
import ComparisonSparkline from '../../app/moneyInAndOut/sparkline/comparisonSparkline.component';

describe('the sparkline', function() {

  it('sets each series to half the provided height', function() {
    let wrapper = mount(<ComparisonSparkline data={new Rx.Subject()} height={212} title="potato"/>);
    wrapper.find('.positive').html().should.containEql('div class="positive row" style="height: 106px;"');
  });

  it('should set the two series labels', function() {
    let wrapper = mount(<ComparisonSparkline data={new Rx.Subject()} title="a title"/>);
    const legends = wrapper.find('.legend');
    legends.at(0).text().should.eql('Money In');
    legends.at(1).text().should.eql('Money Out');
  });
  
  it('should set the money in identical series', function() {
    const dataIn$ = new Rx.Subject();
    const nextData = [{moneyIn: 1, moneyOut: 1}, {moneyIn: 2, moneyOut: 2}];

    let wrapper = mount(<ComparisonSparkline data={dataIn$} title="a title" height={200} />);
    dataIn$.onNext(nextData);
    const cells = wrapper.find('.positive .cell');
    cells.should.have.length(2);

    // height of each series is 100px so if max in = 2 then 1 = 50 and 2 = 100px
    wrapper.find('.positive .series').html()
      .should.containEql('<div class="cell" title="£1" style="height: 50px;"></div><div class="cell" title="£2" style="height: 100px;"></div>')
    wrapper.find('.negative .series').html()
      .should.containEql('<div class="cell" title="£1" style="height: 50px;"></div><div class="cell" title="£2" style="height: 100px;"></div>')
  });

  it('should set the money in unbalanced series', function() {
    const dataIn$ = new Rx.Subject();
    const nextData = [{moneyIn: 12, moneyOut: 1}, {moneyIn: 36, moneyOut: 2}];

    let wrapper = mount(<ComparisonSparkline data={dataIn$} title="a title" height={200} />);
    dataIn$.onNext(nextData);
    const cells = wrapper.find('.positive .cell');
    cells.should.have.length(2);

    // height of each series is 100px and max in series is 36
    //    (1/36)*100 = 2.78
    //    (2/36)*100 = 5.56
    //    (12/36)*100 = 33.33
    //    (36/36)*100 = 100
    wrapper.find('.positive .series').html()
      .should.containEql('<div class="cell" title="£12" style="height: 33.33px;"></div><div class="cell" title="£36" style="height: 100px;"></div>')
    wrapper.find('.negative .series').html()
      .should.containEql('<div class="cell" title="£1" style="height: 2.78px;"></div><div class="cell" title="£2" style="height: 5.56px;"></div>')
  });
});