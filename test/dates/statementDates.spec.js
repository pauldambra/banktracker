import { getDateInformation } from '../../app/dates/statementDates';

const parsedStatement = {
  '2015': {
    '05': [],
    '06': []
  },
  '2016': {
    '06': [],
    '08': []
  }
};

describe('dates in parsed statements', function() {

  it('can be grouped by year and month', function() {
    const result = getDateInformation(parsedStatement);
    result.should.eql({
      length: 16,
      start: '05/2015',
      end: '08/2016',
      range: [
      '05/2015', '06/2015', '07/2015', '08/2015', '09/2015', '10/2015', '11/2015', '12/2015', 
      '01/2016', '02/2016', '03/2016', '04/2016', '05/2016', '06/2016', '07/2016', '08/2016' 
      ].reverse()
    });
  });
});