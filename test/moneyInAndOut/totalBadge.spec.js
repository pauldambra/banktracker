import React from 'react';
import Rx from 'rx';
import { mount } from 'enzyme';
import TotalBadge from '../../app/moneyInAndOut/totalBadge/totalBadge.component.js';

describe('the total badge', function() {

  it('should set the badge value', function() {
    const dataIn$ = new Rx.Subject();
    const nextData = 238.00000003;

    let wrapper = mount(<TotalBadge data={dataIn$} />);
    dataIn$.onNext(nextData);
    const badge = wrapper.find('span');
    badge.text().should.eql('238.00');
  });
});