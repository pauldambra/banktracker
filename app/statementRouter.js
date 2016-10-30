import Rx from 'rx';
import { parse } from './statements/smileStatement';
import { getDateInformation } from './dates/statementDates';
import { spendingTypesForDisplayFrom } from './spendingByType/spendingTypes';
import { totalsForComparisonFrom } from './moneyInAndOut/totalsForComparison';

class AccountStatment {
 constructor() {
  this._statements$ = new Rx.Subject();
  this._parsedStatements$ = this._statements$.map(s => parse(s.value));

  this._datesAvailable$ = this._parsedStatements$.map(ps => getDateInformation(ps));

  this._dateChoices$ = new Rx.Subject();

  this._dataForDisplay$ = Rx.Observable.combineLatest(this._dateChoices$, this._parsedStatements$);

  this._totalsForComparison$ = new Rx.Subject();
  const totalsStream$ = totalsForComparisonFrom(this._dataForDisplay$);
  totalsStream$.subscribe(s => this._totalsForComparison$.onNext(s));
 }

 get statements$() {
  return this._statements$;
 }

 get parsedStatements$() {
  return this._parsedStatements$;
 }

 get datesAvailable$() {
  return this._datesAvailable$;
 }

 get dateChoices$() {
  return this._dateChoices$;
 }

 get dataForDisplay$() {
  return this._dataForDisplay$;
 }

 get totalsForComparison$() {
  return this._totalsForComparison$;
 }
}

class CurrentAccountStatement extends AccountStatment {
  constructor() {
    super();
    this._spendingTypesForDisplay$ = new Rx.Subject();
    const spendingTypes$ = spendingTypesForDisplayFrom(this._dataForDisplay$);
    spendingTypes$.subscribe(s => this._spendingTypesForDisplay$.onNext(s));
  }

  get spendingTypesForDisplay$() {
    return this._spendingTypesForDisplay$;
  }
}

export default {
  currentAccount: new CurrentAccountStatement(),
  savingsAccount: new AccountStatment()
};




