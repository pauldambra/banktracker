import { Rx } from 'rx';
import { overallTotalFrom } from '../../app/moneyInAndOut/totalBadge/overallTotal';

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

  const expectedResult = -118;

  describe('preparing an overall total', function() {
    it('correctly calculates an overall total', function(done) {
      const inStream$ = new Rx.Subject();
      const result$ = overallTotalFrom(inStream$);

      result$.subscribe(result => {
        result.should.be.eql(expectedResult);
        done();
      });

      inStream$.onNext(input);
    });
  });