import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Comment {
  id?: string;
  content: string;
  user?: { email: string };
  createdAt?: string;
  parentId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getComments(requestId: string): Observable<Comment[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Comment[]>(`${this.apiUrl}/${requestId}/comments`, { headers });
  }

  addComment(requestId: string, content: string, parentId?: string): Observable<Comment> {
    const headers = this.authService.getAuthHeaders();
    const body: any = { content };
    if (parentId) body.parentId = parentId;
    return this.http.post<Comment>(`${this.apiUrl}/${requestId}/comments`, body, { headers });
  }
}
