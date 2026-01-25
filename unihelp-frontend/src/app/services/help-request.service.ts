import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface HelpRequest {
  id?: string;
  subject: string;
  topic: string;
  description: string;
  status?: string;
  createdAt?: string;
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {
  deleteRequest(arg0: string) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  createRequest(subject: string, topic: string, description: string, request: HelpRequest): Observable<HelpRequest> {
    return this.http.post<HelpRequest>(this.apiUrl, request, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getAllRequests(): Observable<HelpRequest[]> {
    return this.http.get<HelpRequest[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getRequestById(id: string): Observable<HelpRequest> {
    return this.http.get<HelpRequest>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getRequestsByUser(userId: string): Observable<HelpRequest[]> {
    return this.http.get<HelpRequest[]>(`${this.apiUrl}/user/${userId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}