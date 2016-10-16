'use strict';

const splitLine = l => l.split(/\s{2,}/)
                        .filter(i => i != '');

const coerceAsMoney = m => {
    if (/-{0,1}£\d+/.test(m)) {
        return parseFloat(m.replace(/£/, ''), 10);
    }
    return m;
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
          statementItem[header] = coerceAsMoney(lineItems[i]);
      }
      result.push(statementItem);
  });

  return result;
}

export default { parse: parseStatement };