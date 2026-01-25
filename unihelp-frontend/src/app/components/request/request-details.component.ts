import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HelpRequestService, HelpRequest } from '../../services/help-request.service';
import { CommentService, Comment } from '../../services/comment.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-request-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, MatIconModule,MatToolbarModule ],
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  request!: HelpRequest;
  comments: Comment[] = [];
  newComment = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private helpService: HelpRequestService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    
    this.helpService.getRequestById(id).subscribe({
      next: (data: HelpRequest) => {
        this.request = data;
        this.loadComments(this.request.id!);
      },
      error: (err: any) => console.error('Erreur récupération request:', err)
    });
  }

  loadComments(requestId: string): void {
    this.commentService.getComments(requestId).subscribe({
      next: (data: Comment[]) => this.comments = data,
      error: (err: any) => console.error('Erreur récupération commentaires:', err)
    });
  }

  submitComment(form: NgForm): void {
    if (!this.newComment || form.invalid) return;

    this.isLoading = true;
    console.log('Request ID:', this.request.id);

    this.commentService.addComment(this.request.id!, this.newComment)
      .subscribe({
        next: (data: Comment) => {
          this.newComment = '';
          this.isLoading = false;
          this.loadComments(this.request.id!);
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error('Erreur ajout commentaire:', err);
        }
      });
  }
}
