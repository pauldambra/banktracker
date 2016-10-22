import {earliestDate, latestDate, calculateDateRange} from './ranges';

export const getDateInformation = parsedStatement => {
  const startDate = earliestDate(parsedStatement);
  const endDate = latestDate(parsedStatement);
  return calculateDateRange(startDate, endDate);
};