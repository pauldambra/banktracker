import should from 'should';
import statement from '../app/smileStatement';

const text = `date,description,type,money in,money out,balance
12/10/2016,a,switch,,2,100
14/10/2016,b,switch,,2,98
16/10/2016,c,dd,,10,88
18/10/2016,d,cash,,20,68
19/10/2016,e,child benefit,30,,98
19/10/2016,center parcs, f&b,purchase,,30,68
`;

describe('statement parsing', function() {
    it('should be able to split the lines', function() {
        statement.parse(text)[0]
        .should.deepEqual(
            {
                date: '12/10/2016',
                type: 'switch',
                amount: -2,
                balance: 100
            }
        );
    });

    it('should cope with types with spaces in their names', function() {
        statement.parse(text)[4]
        .should.deepEqual(
            {
                date: '19/10/2016',
                type: 'child benefit',
                amount: 30,
                balance: 98
            }
        );
    });

    it('can detect unexpected commas', function() {
        var parsed = statement.parse(text);
        var crazyLine = parsed[5];
        crazyLine.should.deepEqual(
            {
                date: '19/10/2016',
                type: 'purchase',
                amount: -30,
                balance: 68
            }
        );
    });

    it('can handle empty lines', function() {
        var parsed = statement.parse(text);
        parsed.length.should.be.exactly(6);
    });
})