import Rx from 'rx';

import spendingTypes from '../app/spendingTypes';

const expectedResults = {
  switch: -32,
  dd: -25,
  salary: 250
};

const statementInput = [
  {
    date: '12/10/2016',
    type: 'switch',
    amount: -12,
    balance: 100
  },
  {
    date: '13/10/2016',
    type: 'switch',
    amount: -20,
    balance: 100
  },
  {
    date: '14/10/2016',
    type: 'dd',
    amount: -25,
    balance: 100
  },
  {
    date: '14/10/2016',
    type: 'salary',
    amount: 250,
    balance: 100
  }
];

describe('spending type calculator', function() {
  it('groups data by type', function(done) {
    var statements$ = new Rx.Subject();

    spendingTypes.totalOn(statements$);
    spendingTypes.results$.subscribe(r => {
      r.should.be.eql(expectedResults);
      done();
    });

    statements$.onNext(statementInput);
  });
});