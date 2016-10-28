
export const splitDateWindow = dw => {
  const month = dw.split('/')[0];
  const year = dw.split('/')[1];
  return {month, year};
}

export const dateWindowIsValid = dw => {
  const d = splitDateWindow(dw);
  return Number.isSafeInteger(d.month) && Number.isSafeInteger(d.year);
}
