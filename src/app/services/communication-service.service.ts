import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject  } from 'rxjs';
import { TimeSelector } from './time-selectors/time-selector';
import { Transaction } from '../models/Transaction';
import { WeekSelector } from './time-selectors/week-selector';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

   private selector = new BehaviorSubject<TimeSelector>(new WeekSelector());
   private transactions = new BehaviorSubject<Transaction[]>([]);
   private allTransactions = new BehaviorSubject<Transaction[]>([]);
   private categories = new BehaviorSubject<Category[]>([]);


   private transactionToEdit = new Transaction();
   private categoryToEdit = new Category();

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

  getCategories() : Observable<Category[]>{
    return this.categories.asObservable();
  }

  setCategories(categories : Category[]){
    this.categories.next(categories);
  }


  setTransactionToEdit(transaction : Transaction){
    this.transactionToEdit = transaction;
  }

  getTransactionToEdit() : Transaction{
    return this.transactionToEdit;
  }

  setCategoryToEdit(category : Category){
    this.categoryToEdit = category;
  }

  getCategoryToEdit() : Category{
    return this.categoryToEdit;
  }

}
