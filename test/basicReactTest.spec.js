import React from 'react';
import { shallow, render } from 'enzyme';
import Helloer from '../app/Hello';

describe('can do something with react', function() {
    it('can shallow render', function() {
        const wrapper = shallow(<Helloer text="World"/>);
        wrapper.html().should.be.exactly('<div>Hello World</div>');
    });

    it('can render', function() {
       const wrapper = render(<Helloer text="World"/>);
        wrapper.html().should.be.exactly('<div>Hello World</div>'); 
    });
});