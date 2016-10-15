import should from 'should';
import statement from '../app/statement';

const text = `date    type    amount  balance
12/10/2016  switch  -£2   £100
14/10/2016  switch  -£2   £98
16/10/2016  dd  -£10   £88
18/10/2016  cash  -£20   £68
19/10/2016  child benefit  £30   £98`;

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
})