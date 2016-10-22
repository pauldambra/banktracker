

const smallest = (min, current) => parseInt(current, 10) < min ? parseInt(current, 10) : min;
const largest = (max, current) => parseInt(current, 10) > max ? parseInt(current, 10) : max;

const formatDate = (month, year) => {
  month = parseInt(month, 10);
  year = parseInt(year, 10);
  month = month < 10 ? '0' + month : month;
  return `${month}/${year}`;
}

const getDate = (s, comparison, initialValue) => {
  const year = Object.keys(s).reduce(comparison, initialValue);
  const yearsMonths = s[`${year}`];
  if (!yearsMonths) return '?';

  let month = Object.keys(yearsMonths).reduce(comparison, initialValue);
  
  return formatDate(month, year);
}

export const earliestDate = s => getDate(s, smallest, Infinity);
export const latestDate = s => getDate(s, largest, -Infinity);

const splitMonthYear = my => ({
    month: my.split('/')[0],
    year: my.split('/')[1]
  });

const buildRange = (end, numberOfMonths) => {
  let year = end.year;
  let month = end.month;
  const result = [];

  do {
    numberOfMonths--;

    result.push(formatDate(month, year));

    month = month - 1;
    if (month == 0) {
      month = 12;
      year = year - 1;
    }
  }
  while (numberOfMonths > 0);
    
  return result;
}

const calculateRangeLength = (start, end) => {
  var numberOfYears = end.year - start.year;
  var totalMonths = (numberOfYears + 1) * 12;
  var rangeMonths = totalMonths - (start.month - 1) - (12 - end.month);
  return rangeMonths;
}

export const calculateDateRange = (s, e) => {
  const start = splitMonthYear(s);
  const end = splitMonthYear(e);
  const length = calculateRangeLength(start, end);
  const range = buildRange(end, length);

  return {
    length,
    start: s,
    end: e,
    range
  };
};