import React from 'react';
import { mount } from 'enzyme';
import VerticalBarGraph from '../app/verticalBarGraph';
import Rx from 'rx';

describe('the vertical bar graph', function() {
    it('can show data', function() {
        const subject = new Rx.Subject();

        const wrapper = mount(<VerticalBarGraph Data={subject} />);
        
        subject.onNext({switch: -4, dd: -10, cash: -20, 'child benefit': 30});
        const switchBar = wrapper.find('.bar.switch');

        const expectedHtml = '<div class="bar switch" style="height: -4px;">switch</div>';
        switchBar.html().should.be.exactly(expectedHtml);
    });
});