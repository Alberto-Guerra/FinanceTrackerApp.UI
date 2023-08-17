import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';
import { Transaction } from '../models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private TransactionUrl= "Transactions";
  private CategoryUrl= "Categories";

  constructor(private http: HttpClient) { }

  // Transaction CRUD

  public getTransactions() : Observable<Transaction[]>{
   
    return this.http.get<Transaction[]>( `${environment.apiUrl}/${this.TransactionUrl}`);
  }

  public addTransaction(transaction: Transaction) : Observable<Transaction[]>{
    return this.http.post<Transaction[]>(`${environment.apiUrl}/${this.TransactionUrl}`, transaction);
  }

  public deleteTransaction(transaction: Transaction) : Observable<Transaction[]>{
    return this.http.delete<Transaction[]>(`${environment.apiUrl}/${this.TransactionUrl}/${transaction.id}`);
  }

  public updateTransaction(transaction: Transaction) : Observable<Transaction[]>{
    return this.http.put<Transaction[]>(`${environment.apiUrl}/${this.TransactionUrl}`, transaction);
  }

  public getTransactionsByCategory(category: Category) : Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${environment.apiUrl}/${this.TransactionUrl}/${category.id}`);
  }

  // Category CRUD

  public getCategories() : Observable<Category[]>{
    return this.http.get<Category[]>( `${environment.apiUrl}/${this.CategoryUrl}`);
  }

  public addCategory(category: Category) : Observable<Category[]>{
    return this.http.post<Category[]>(`${environment.apiUrl}/${this.CategoryUrl}`, category);
  }

  public deleteCategory(category: Category) : Observable<Category[]>{
    return this.http.delete<Category[]>(`${environment.apiUrl}/${this.CategoryUrl}/${category.id}`);
  }

  public updateCategory(category: Category) : Observable<Category[]>{
    return this.http.put<Category[]>(`${environment.apiUrl}/${this.CategoryUrl}`, category);
  }

  // Category to Transaction

  public addCategoryToTransaction(transaction: Transaction, category: Category) : Observable<Transaction[]>{
    return this.http.put<Transaction[]>(`${environment.apiUrl}/${this.TransactionUrl}/addCategory/${transaction.id}`, category);
  }

  public removeCategoryFromTransaction(transaction: Transaction, category: Category) : Observable<Transaction[]>{
    return this.http.put<Transaction[]>(`${environment.apiUrl}/${this.TransactionUrl}/removeCategory/${transaction.id}`, category);
  }



}
