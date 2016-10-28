import { Rx } from 'rx';
import { totalsForComparisonFrom } from '../app/totalsForComparison';

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
const expectedResult = { moneyIn: 30, moneyOut: 50 };

describe('preparing totals for comparison for display', function() {
  it('totals money in and money out', function(done) {
    const dataForDisplay$ = new Rx.Subject();

    const totalsForComparison$ = totalsForComparisonFrom(dataForDisplay$);

    totalsForComparison$.subscribe(tfc => {
      tfc.should.eql(expectedResult);
      done();
    });

    dataForDisplay$.onNext(input);
  });
});