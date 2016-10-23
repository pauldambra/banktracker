import Rx from 'rx';
import { parse } from './input/smileStatement';
import { getDateInformation } from './dates/statementDates';
import { spendingTypesForDisplayFrom } from './spendingTypes';

export const statements$ = new Rx.Subject();

export const parsedStatements$ = 
  statements$.map(s => parse(s.value));

export const datesAvailable$ = 
  parsedStatements$
  .map(ps => getDateInformation(ps));

export const dateChoices$ = new Rx.Subject();

export const dataForDisplay$ = 
  Rx.Observable.combineLatest(dateChoices$, parsedStatements$);

export const spendingTypesForDisplay$ = new Rx.Subject();

var dataStream$ = spendingTypesForDisplayFrom(dataForDisplay$);

dataStream$.subscribe(s => spendingTypesForDisplay$.onNext(s));