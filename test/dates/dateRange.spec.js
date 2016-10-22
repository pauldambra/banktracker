

import { calculateDateRange } from '../../app/dates/ranges';

describe('calculating date ranges', function() {
  it('can handle a range of 1 month', function() {
    var range = calculateDateRange('09/2016', '09/2016');
    range.should.eql({
      length: 1,
      start: '09/2016',
      end: '09/2016',
      range: ['09/2016']
    });
  });
  it('can handle a range within a year', function() {
    var range = calculateDateRange('04/1912', '09/1912');
    range.should.eql({
      length: 6,
      start: '04/1912',
      end: '09/1912',
      range: ['04/1912', '05/1912', '06/1912', '07/1912', '08/1912', '09/1912'].reverse()
    });
  });
  it('can handle a range that is a full year', function() {
    var range = calculateDateRange('01/2013', '12/2013');
    range.should.eql({
      length: 12,
      start: '01/2013',
      end: '12/2013',
      range: ['01/2013', '02/2013', '03/2013', '04/2013', '05/2013', '06/2013', '07/2013', '08/2013', '09/2013', '10/2013', '11/2013', '12/2013'].reverse()
    });
  });
  it('can handle a range over a few years', function() {
    var range = calculateDateRange('12/2012', '01/2014');
    range.should.eql({
      length: 14,
      start: '12/2012',
      end: '01/2014',
      range: ['12/2012', '01/2013', '02/2013', '03/2013', '04/2013', '05/2013', '06/2013', '07/2013', '08/2013', '09/2013', '10/2013', '11/2013', '12/2013', '01/2014'].reverse()
    });
  });
  it('can handle a range of exactly several years', function() {
    var range = calculateDateRange('01/2012', '12/2014');
    range.should.eql({
      length: 36,
      start: '01/2012',
      end: '12/2014',
      range: [
      '01/2012', '02/2012', '03/2012', '04/2012', '05/2012', '06/2012', '07/2012', '08/2012', '09/2012', '10/2012', '11/2012', '12/2012', 
      '01/2013', '02/2013', '03/2013', '04/2013', '05/2013', '06/2013', '07/2013', '08/2013', '09/2013', '10/2013', '11/2013', '12/2013', 
      '01/2014', '02/2014', '03/2014', '04/2014', '05/2014', '06/2014', '07/2014', '08/2014', '09/2014', '10/2014', '11/2014', '12/2014', 
      ].reverse()
    });
  });
  it('can calculate an expected length', function() {
    var range = calculateDateRange('09/2014', '11/2016');
    range.should.eql({
      length: 27,
      start: '09/2014',
      end: '11/2016',
      range: [
      '09/2014', '10/2014', '11/2014', '12/2014', 
      '01/2015', '02/2015', '03/2015', '04/2015', '05/2015', '06/2015', '07/2015', '08/2015', '09/2015', '10/2015', '11/2015', '12/2015', 
      '01/2016', '02/2016', '03/2016', '04/2016', '05/2016', '06/2016', '07/2016', '08/2016', '09/2016', '10/2016', '11/2016'
      ].reverse()
    });
  });
})