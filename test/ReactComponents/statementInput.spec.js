import React from 'react';
import { shallow, render } from 'enzyme';
import StatementInput from '../../app/input/statementInput.component';
import Rx from 'rx';

describe('the Statement input', function() {
    let currentAccount$;
    let currentAccountMessages = [];
    let currentAccountSubscription;

    let savingsAccount$;
    let savingsAccountMessages;
    let savingsAccountSubscription;

    let statementTypeChoices$;

    let wrapper;

    beforeEach(function() {
        statementTypeChoices$ = new Rx.Subject();

        currentAccount$ = new Rx.Subject();
        currentAccountMessages = [];
        currentAccountSubscription = currentAccount$.subscribe(s => currentAccountMessages.push(s));

        savingsAccount$ = new Rx.Subject();
        savingsAccountMessages = [];
        savingsAccountSubscription = savingsAccount$.subscribe(s => savingsAccountMessages.push(s));

        wrapper = shallow(<StatementInput currentAccount={currentAccount$}
                                        savingsAccount={savingsAccount$}
                                        statementTypeChoices={statementTypeChoices$} />);
    });

    afterEach(function() {
        currentAccountSubscription.dispose();
        savingsAccountSubscription.dispose();
    });

    it('can receive paste text to the current account', function() {
        statementTypeChoices$.onNext('current');

        wrapper.simulate('change', { target: { value: 'this is input' } });
        wrapper.html().should.be.exactly('<textarea>this is input</textarea>')

        currentAccountMessages.length.should.be.exactly(1);
        currentAccountMessages[0].should.be.eql({ value: 'this is input' });

        savingsAccountMessages.length.should.be.exactly(0);
    });

    it('can receive paste text to the savings§ account', function() {
        statementTypeChoices$.onNext('savings');

        wrapper.simulate('change', { target: { value: 'this is input' } });
        wrapper.html().should.be.exactly('<textarea>this is input</textarea>')

        savingsAccountMessages.length.should.be.exactly(1);
        savingsAccountMessages[0].should.be.eql({ value: 'this is input' });

        currentAccountMessages.length.should.be.exactly(0);
    });
});