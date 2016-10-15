import React from 'react';
import { shallow, render } from 'enzyme';
import StatementInput from '../app/StatementInput';

describe('the Statement input', function() {
    it('can receive paste text', function() {
        const wrapper = shallow(<StatementInput/>);
        wrapper.simulate('change', { target: { value: 'this is input' } });
        wrapper.html().should.be.exactly('<textarea>this is input</textarea>')
    });
});