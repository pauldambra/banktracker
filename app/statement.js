'use strict';

const splitLine = l => l.split(/\s{2,}/)
                        .filter(i => i != '');

const strictParseFloat = function (value) {
  if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
    return Number(value);
  }
  return NaN;
}

const coerceAsMoney = m => {
  m = m.replace('£', '');
  const mightBeMoney = strictParseFloat(m);
  return isNaN(mightBeMoney) ? m : mightBeMoney;
}

const parseStatement = txt => {
  const lines = txt.split('\n');
  const [head, ...tail] = lines;
  const headers = splitLine(head);
  const result = [];

  tail.forEach(line => {
      const lineItems = splitLine(line);
      const statementItem = {};
      for (var i = 0; i < headers.length; i++) {
          const header = headers[i];
          const maybeMoney = coerceAsMoney(lineItems[i]);
          statementItem[header] = maybeMoney;
      }
      result.push(statementItem);
  });
  return result;
}

export default { parse: parseStatement };