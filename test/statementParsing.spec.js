import should from 'should';
import { parse } from '../app/input/smileStatement';

const text = `date,description,type,money in,money out,balance
2016-10-12,a,switch,,2,100
2016-10-14,b,switch,,2,98
2016-10-16,c,dd,,10,88
2016-10-18,d,cash,,20,68
2016-10-19,e,child benefit,30,,98
2016-10-19,center parcs, f&b,purchase,,30,68
2016-11-12,a,switch,,2,66
2016-11-14,b,switch,,2,64
2016-11-16,c,dd,,10,54
`;

describe('statement parsing', function() {
    it('should be able to split the lines', function() {
        parse(text)['2016']['10'][0]
            .should.deepEqual(
                {
                    date: ['2016', '10', '12'],
                    type: 'switch',
                    amount: -2,
                    balance: 100
                }
            );
    });

    it('should cope with types with spaces in their names', function() {
        parse(text)['2016']['10'][4]
            .should.deepEqual(
                {
                    date: ['2016', '10', '19'],
                    type: 'child benefit',
                    amount: 30,
                    balance: 98
                }
            );
    });

    it('can detect unexpected commas', function() {
        var parsed = parse(text)['2016']['10'];
        var crazyLine = parsed[5];
        crazyLine.should.deepEqual(
            {
                date: ['2016', '10', '19'],
                type: 'purchase',
                amount: -30,
                balance: 68
            }
        );
    });

    it('can handle empty lines', function() {
        var parsed = parse(text);
        parsed['2016']['10'].length.should.be.exactly(6);
        parsed['2016']['11'].length.should.be.exactly(3);
    });

    it('can group by month', function() {
        var parsed = parse(text);

        Object.keys(parsed).should.eql(['2016']);
        Object.keys(parsed['2016']).should.eql(['10', '11']);
    });
})