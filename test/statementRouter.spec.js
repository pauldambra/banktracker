
import * as statementRouter from '../app/statementRouter';
import {exist as shouldExist} from 'should';

const text = `date,description,type,money in,money out,balance
2015-05-12,a,switch,,2,100
2015-05-14,b,switch,,2,98
2015-05-16,c,dd,,10,88
2016-10-18,d,cash,,20,68
2016-10-19,e,child benefit,30,,98
2016-10-19,center parcs, f&b,purchase,,30,68
2016-11-12,a,switch,,2,66
2016-11-14,b,switch,,2,64
2016-11-16,c,dd,,10,54
`;

describe('the statement router', function() {
  it('provides parsed statements when unparsed statements arrive', function(done) {
    const subscription = statementRouter.parsedStatements$.subscribe(ps => {
      shouldExist(ps);
      subscription.dispose();
      done();
    });
    statementRouter.statements$.onNext({value: text});
  });
  
  it('provides the date structure of the parsed statements', function(done) {
    const subscription = statementRouter.datesAvailable$.subscribe(da => {
      shouldExist(da);
      subscription.dispose();
      done()
    });

    statementRouter.statements$.onNext({value: text});
  });

  it('provides data for display when a date choice is made', function(done) {
    const subscription = statementRouter.dataForDisplay$.subscribe(stfd => {
      shouldExist(stfd);
      subscription.dispose();
      done()
    });

    statementRouter.statements$.onNext({value: text});
    statementRouter.dateChoices$.onNext('10/2016');
  });

  it('provides spending type aggregated data when data is available for display', function(done) {
    const subscription = statementRouter.spendingTypesForDisplay$.subscribe(stfd => {
      shouldExist(stfd);
      subscription.dispose();
      done()
    });

    statementRouter.statements$.onNext({value: text});
    statementRouter.dateChoices$.onNext('10/2016');
  });
});