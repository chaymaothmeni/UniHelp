import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HelpRequest {
  id?: string;
  subject: string;
  topic: string;
  description: string;
  status?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HelpRequestService {

  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAllRequests(): Observable<HelpRequest[]> {
    return this.http.get<HelpRequest[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getRequestById(id: string): Observable<HelpRequest> {
    return this.http.get<HelpRequest>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createRequest(subject: string, topic: string, description: string): Observable<HelpRequest> {
    return this.http.post<HelpRequest>(
      this.apiUrl,
      { subject, topic, description },
      { headers: this.getAuthHeaders() }
    );
  }
}
