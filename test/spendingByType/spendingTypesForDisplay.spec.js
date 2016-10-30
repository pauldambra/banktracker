import { Rx } from 'rx';
import { spendingTypesForDisplayFrom } from '../../app/spendingByType/spendingTypes';

const input = [
  '10/2016', 
  {
    '2015': [],
    '2016': {
      '09': [], 
      '10': [
        { type: 'cash', amount: -15 },
        { type: 'cash', amount: -5 },
        { type: 'child benefit', amount: 20 },
        { type: 'child benefit', amount: 10 },
        { type: 'purchase', amount: -30 },
      ]
    }
  }
];
const expectedResult = { cash: -20, 'child benefit': 30, purchase: -30 };

describe('preparing spending types for display', function() {
  it('totals spending types when data is available for dispay', function(done) {
    const dataForDisplay$ = new Rx.Subject();

    const spendingTypesForDisplay$ = spendingTypesForDisplayFrom(dataForDisplay$);

    spendingTypesForDisplay$.subscribe(stfd => {
      stfd.should.eql(expectedResult);
      done();
    });

    dataForDisplay$.onNext(input);
  });
});