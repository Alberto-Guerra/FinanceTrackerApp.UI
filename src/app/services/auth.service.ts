import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  private AuthUrl= "Auth";

  private tokenKey = 'auth_token';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    })
  };

  private token : BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { 

  }

  loadUser() {

  }

  login(username: string, password: string) : Observable<any>{
    return this.http.post( `${environment.apiUrl}/${this.AuthUrl}/login`, { username, password }).pipe(catchError(this.handleError));
  }
  
  handleError(error: HttpErrorResponse) {
      return throwError(() => error)
  }

  register(username: string, password: string) : Observable<any>{
    return this.http.post( `${environment.apiUrl}/${this.AuthUrl}/register`, { username, password }).pipe(catchError(this.handleError));
  }
  

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.updateHttpOptions();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.updateHttpOptions();
  }

  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  private updateHttpOptions(): void {
    const token = this.getToken();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }
  
  getOptions(){
    return this.httpOptions;
  }
  
}
