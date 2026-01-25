import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'unihelp_token';
  private currentUserSubject = new BehaviorSubject<any>(null);
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object  
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    
    if (this.isBrowser) {
      const token = this.getToken();
      if (token) {
        this.currentUserSubject.next({ token });
      }
    }
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, email, password }).pipe(
      tap((res: any) => {
        if (res.token && this.isBrowser) {
          this.setToken(res.token);
        }
      }),
      catchError(err => {
        console.error('Register error', err);
        return throwError(() => err);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => {
        if (res.token && this.isBrowser) {
          this.setToken(res.token);
          this.currentUserSubject.next({ token: res.token });
        }
      }),
      catchError(err => {
        console.error('Login error', err);
        return throwError(() => err);
      })
    );
  }

  private setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;  
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isBrowser && !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  getCurrentUser(): Observable<any> {
  return this.http.get(`${this.apiUrl}/me`, { headers: this.getAuthHeaders() }).pipe(
    catchError(err => {
      console.error('Erreur getCurrentUser', err);
      return throwError(() => err);
    })
  );
}

updateProfile(data: { username: string, email: string, currentPassword: string, newPassword?: string }): Observable<any> {
  return this.http.put(`${this.apiUrl}/update-profile`, data, { headers: this.getAuthHeaders() }).pipe(
    catchError(err => {
      console.error('Erreur updateProfile', err);
      return throwError(() => err);
    })
  );
}
}