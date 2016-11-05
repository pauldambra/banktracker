
import statementRouter from '../app/statementRouter';
import should from 'should';

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
  describe('for current accounts', function() {
    it('provides parsed statements when unparsed statements arrive', function(done) {
      const subscription = statementRouter.currentAccount.parsedStatements$.subscribe(ps => {
        should.exist(ps);
        subscription.dispose();
        done();
      });
      statementRouter.currentAccount.statements$.onNext({value: text});
    });
    
    it('provides the date structure of the parsed statements', function(done) {
      const subscription = statementRouter.currentAccount.datesAvailable$.subscribe(da => {
        should.exist(da);
        subscription.dispose();
        done()
      });

      statementRouter.currentAccount.statements$.onNext({value: text});
    });

    it('provides data for display when a date choice is made', function(done) {
      const subscription = statementRouter.currentAccount.dataForDisplay$.subscribe(stfd => {
        should.exist(stfd);
        subscription.dispose();
        done()
      });

      statementRouter.currentAccount.statements$.onNext({value: text});
      statementRouter.currentAccount.dateChoices$.onNext('10/2016');
    });

    it('provides spending type aggregated data when data is available for display', function(done) {
      const subscription = statementRouter.currentAccount.spendingTypesForDisplay$.subscribe(stfd => {
        should.exist(stfd);
        subscription.dispose();
        done()
      });

      statementRouter.currentAccount.statements$.onNext({value: text});
      statementRouter.currentAccount.dateChoices$.onNext('10/2016');
    });

    it('provides totals for comparison aggregated data when data is available for display', function(done) {
      const subscription = statementRouter.currentAccount.totalsForComparison$.subscribe(tfc => {
        should.exist(tfc);
        subscription.dispose();
        done()
      });

      statementRouter.currentAccount.statements$.onNext({value: text});
      statementRouter.currentAccount.dateChoices$.onNext('10/2016');
    });
  });

  describe('for savings accounts', function() {
    it('provides parsed statements when unparsed statements arrive', function(done) {
      const subscription = statementRouter.savingsAccount.parsedStatements$.subscribe(ps => {
        should.exist(ps);
        subscription.dispose();
        done();
      });
      statementRouter.savingsAccount.statements$.onNext({value: text});
    });
    
    it('provides the date structure of the parsed statements', function(done) {
      const subscription = statementRouter.savingsAccount.datesAvailable$.subscribe(da => {
        should.exist(da);
        subscription.dispose();
        done()
      });

      statementRouter.savingsAccount.statements$.onNext({value: text});
    });

    it('provides data for display when a date choice is made', function(done) {
      const subscription = statementRouter.savingsAccount.dataForDisplay$.subscribe(stfd => {
        should.exist(stfd);
        subscription.dispose();
        done()
      });

      statementRouter.savingsAccount.statements$.onNext({value: text});
      statementRouter.savingsAccount.dateChoices$.onNext('10/2016');
    });

    it('does not provide spending type aggregated data when data is available for display', function() {
      should.not.exist(statementRouter.savingsAccount.spendingTypesForDisplay$);
    });

    it('provides totals for comparison aggregated data when data is available for display', function(done) {
      const subscription = statementRouter.savingsAccount.totalsForComparison$.subscribe(tfc => {
        should.exist(tfc);
        subscription.dispose();
        done()
      });

      statementRouter.savingsAccount.statements$.onNext({value: text});
      statementRouter.savingsAccount.dateChoices$.onNext('10/2016');
    });

    it('provides totals for each month in the data', function(done) {
      const subscription = statementRouter.savingsAccount.totalsByMonth$.subscribe(tbm => {
        should.exist(tbm);
        subscription.dispose();
        done()
      });

      statementRouter.savingsAccount.statements$.onNext({value: text});
      statementRouter.savingsAccount.dateChoices$.onNext('10/2016');
    });    
  });
});