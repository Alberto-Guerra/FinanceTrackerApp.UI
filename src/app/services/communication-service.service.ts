import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TimeSelector } from './time-selectors/time-selector';
import { Transaction } from '../models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

   private selector = new Subject<TimeSelector>();
   private transactions = new Subject<Transaction[]>();
   private allTransactions = new Subject<Transaction[]>();


   private transactionToEdit = new Transaction();

  constructor() { }

  getSelector() : Observable<TimeSelector>{
    return this.selector.asObservable();
  }

  setSelector(selector : TimeSelector){
    this.selector.next(selector);
  }

  getTransactions() : Observable<Transaction[]>{
    return this.transactions.asObservable();
  }

  setTransactions(transactions : Transaction[]){
    this.transactions.next(transactions);
  }

  getAllTransactions() : Observable<Transaction[]>{
    return this.allTransactions.asObservable();
  }

  setAllTransactions(transactions : Transaction[]){
    this.allTransactions.next(transactions);
  }

  setTransactionToEdit(transaction : Transaction){
    this.transactionToEdit = transaction;
  }

  getTransactionToEdit() : Transaction{
    return this.transactionToEdit;
  }

}
