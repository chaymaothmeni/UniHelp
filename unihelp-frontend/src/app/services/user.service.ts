import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HelpRequest } from './help-request.service';

export interface User {
  id: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateUser(user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/me`, user, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/me/password`,
      { oldPassword, newPassword },
      { headers: this.authService.getAuthHeaders() }
    );
  }

  getMyRequests(): Observable<HelpRequest[]> {
    return this.http.get<HelpRequest[]>(
      `${this.apiUrl}/me/requests`,
      { headers: this.authService.getAuthHeaders() }
    );
  }
}
