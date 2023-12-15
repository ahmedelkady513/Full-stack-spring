import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginInfo } from '../common/login-info';
import { User } from '../common/user';
import { jwtDecode } from 'jwt-decode';
import { JwtToken } from '../common/jwt-token';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080';
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
    this.setCurrentUser();
  }

  private setCurrentUser() {
    const user = this.localStorageService.getItem<User>('user');
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  login(loginInfo: LoginInfo): Observable<User> {
    const loginUrl = `${this.baseUrl}/login`;
    return this.httpClient.post<User>(loginUrl, loginInfo).pipe(
      map((user: User) => {
        this.localStorageService.setItem('user', user);
        this.currentUserSubject.next(user)
        return user;
      }),
      catchError(this.handleError)
    )
  };

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
  getUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  tokenValid(): boolean {
    const user = this.localStorageService.getItem<User>('user');
    if (!user) {
      return false;
    }

    try {
      console.log(user.expiredAt)

      const token: JwtToken = jwtDecode<JwtToken>(user.token);
      console.log(token)

      const now = Date.now();
      return token.exp * 1000 > now;
    } catch (error) {
      console.log('imherre')

      return false;
    }

  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => {
      let errorMessage = 'An unknown error occurred';
      if (error.status === 403) {
        errorMessage = 'Wrong Username Or Password';
      }
      return new Error(errorMessage);
    });
  }
}