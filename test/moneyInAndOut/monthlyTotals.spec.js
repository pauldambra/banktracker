import { Rx } from 'rx';
import {monthlyTotalsFrom} from '../../app/moneyInAndOut/sparkline/monthlyTotals';

const input = 
  [
    'date-window-selection',
    {
      '2015': {
        '10': [
          { type: 'cash', amount: -25 },
          { type: 'cash', amount: -50 },
          { type: 'child benefit', amount: 10 },
          { type: 'child benefit', amount: 10 },
          { type: 'purchase', amount: -3 },
        ],
        '12': [
          { type: 'cash', amount: -25 },
          { type: 'child benefit', amount: 10 }
        ] 
      },
      '2016': {
        '01': [
          { type: 'cash', amount: -5 },
          { type: 'child benefit', amount: 10 }
        ],
        '09': [
          { type: 'cash', amount: -15 },
          { type: 'cash', amount: -15 },
          { type: 'child benefit', amount: 20 },
          { type: 'child benefit', amount: 20 },
          { type: 'purchase', amount: -40 },
        ], 
        '10': [
          { type: 'cash', amount: -15 },
          { type: 'cash', amount: -5 },
          { type: 'child benefit', amount: 20 },
          { type: 'child benefit', amount: 10 },
          { type: 'DD', amount: -30 },
        ]
      }
    }
  ];

const expectedResult = [
  { moneyIn: 20, moneyOut: 78 },
  { moneyIn: 0, moneyOut: 0 },
  { moneyIn: 10, moneyOut: 25 }, //december
  { moneyIn: 10, moneyOut: 5 }, //january
  { moneyIn: 0, moneyOut: 0 },
  { moneyIn: 0, moneyOut: 0 },
  { moneyIn: 0, moneyOut: 0 },
  { moneyIn: 0, moneyOut: 0 },
  { moneyIn: 0, moneyOut: 0 },
  { moneyIn: 0, moneyOut: 0 },
  { moneyIn: 0, moneyOut: 0 },
  { moneyIn: 40, moneyOut: 70 },
  { moneyIn: 30, moneyOut: 50 },
];

describe('preparing monthly totals for sparkline display', function() {
  it('correctly totals money in and money out', function(done) {
    var inStream$ = new Rx.Subject();
    const result$ = monthlyTotalsFrom(inStream$);

    result$.subscribe(result => {
      result.should.be.eql(expectedResult);
      done();
    });

    inStream$.onNext(input);
  });
});