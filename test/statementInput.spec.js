import React from 'react';
import { shallow, render } from 'enzyme';
import StatementInput from '../app/statementInput';
import Rx from 'rx';

describe('the Statement input', function() {
    it('can receive paste text', function() {
        const subject = new Rx.Subject();

        const messages = [];
        subject.subscribe(s => messages.push(s));

        const wrapper = shallow(<StatementInput Subject={subject} />);
        wrapper.simulate('change', { target: { value: 'this is input' } });
        wrapper.html().should.be.exactly('<textarea>this is input</textarea>')

        messages.length.should.be.exactly(1);
        messages[0].should.be.eql({ value: 'this is input' });
    });
});