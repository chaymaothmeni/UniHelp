import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HelpRequestService } from '../../services/help-request.service';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-new-request',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatIconModule,MatToolbarModule,RouterModule ],
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent {

  subject = '';
  topic = '';
  description = '';
  isLoading = false;
  
  constructor(private helpService: HelpRequestService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    const request = { subject: this.subject, topic: this.topic, description: this.description };
    this.helpService.createRequest(this.subject, this.topic, this.description, request)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          this.isLoading = false;
          console.error(err);
        }
      });
  }
}
