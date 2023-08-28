import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';
import { Transaction } from '../models/Transaction';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private TransactionUrl= "Transactions";
  private CategoryUrl= "Categories";

  constructor(private http: HttpClient, private auth : AuthService) { }

  // Transaction CRUD

  public getTransactions() : Observable<Transaction[]>{
   
    return this.http.get<Transaction[]>( `${environment.apiUrl}/${this.TransactionUrl}`, this.auth.getOptions());
  }

  public addTransaction(transaction: Transaction) : Observable<Transaction[]>{
    return this.http.post<Transaction[]>(`${environment.apiUrl}/${this.TransactionUrl}`, transaction, this.auth.getOptions());
  }

  public deleteTransaction(transaction: Transaction) : Observable<Transaction[]>{
    return this.http.delete<Transaction[]>(`${environment.apiUrl}/${this.TransactionUrl}/${transaction.id}`, this.auth.getOptions());
  }

  public updateTransaction(transaction: Transaction) : Observable<Transaction[]>{
    return this.http.put<Transaction[]>(`${environment.apiUrl}/${this.TransactionUrl}`, transaction, this.auth.getOptions());
  }

  public getTransactionsByCategory(category: Category) : Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${environment.apiUrl}/${this.TransactionUrl}/${category.id}`, this.auth.getOptions());
  }

  // Category CRUD

  public getCategories() : Observable<Category[]>{


    return this.http.get<Category[]>( `${environment.apiUrl}/${this.CategoryUrl}`, this.auth.getOptions());
  }

  public addCategory(category: Category) : Observable<Category[]>{
    return this.http.post<Category[]>(`${environment.apiUrl}/${this.CategoryUrl}`, category, this.auth.getOptions());
  }

  public deleteCategory(category: Category) : Observable<Category[]>{
    return this.http.delete<Category[]>(`${environment.apiUrl}/${this.CategoryUrl}/${category.id}`, this.auth.getOptions());
  }

  public updateCategory(category: Category) : Observable<Category[]>{
    return this.http.put<Category[]>(`${environment.apiUrl}/${this.CategoryUrl}`, category, this.auth.getOptions());
  }

  // Category to Transaction

  public addCategoryToTransaction(transaction: Transaction, category: Category) : Observable<Transaction[]>{
    return this.http.put<Transaction[]>(`${environment.apiUrl}/${this.TransactionUrl}/addCategory/${transaction.id}`, category, this.auth.getOptions());
  }

  public removeCategoryFromTransaction(transaction: Transaction, category: Category) : Observable<Transaction[]>{
    return this.http.put<Transaction[]>(`${environment.apiUrl}/${this.TransactionUrl}/removeCategory/${transaction.id}`, category, this.auth.getOptions());
  }



}
