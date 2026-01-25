import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // optionnel pour loading
import { MatTableModule } from '@angular/material/table';
import { UserService, User } from '../../services/user.service';
import { HelpRequest } from '../../services/help-request.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule, 
    MatTableModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  updatedUser: Partial<User> = {};
  oldPassword: string = '';
  newPassword: string = '';
  isUpdatingProfile = false;
  isUpdatingPassword = false;

  
  myRequests: HelpRequest[] = [];
  displayedColumns: string[] = ['subject', 'topic', 'status'];
  loadError: boolean = false;
  constructor(private userService: UserService) {}
  errorMessage: string = '';
  ngOnInit() {
    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        this.user = data;
        this.updatedUser = { 
          username: data.username, 
          email: data.email 
        };
      },
      error: (err) => console.error('Erreur chargement profil', err)
    });

    
    this.userService.getMyRequests().subscribe({
      next: (data) => this.myRequests = data,
      error: (err) => console.error('Erreur chargement demandes', err)
    });
  }

  updateProfile(form: NgForm) {
    if (form.invalid) return;

    this.isUpdatingProfile = true;
    this.userService.updateUser(this.updatedUser).subscribe({
      next: (updated) => {
        this.user = updated;
        this.updatedUser = { username: updated.username, email: updated.email };
        this.isUpdatingProfile = false;
        form.form.markAsPristine(); 
        alert('Profil mis à jour avec succès !');
      },
      error: (err) => {
        this.isUpdatingProfile = false;
        alert('Erreur lors de la mise à jour du profil');
        console.error(err);
      }
    });
  }

  updatePassword(form: NgForm) {
    if (form.invalid) return;

    this.isUpdatingPassword = true;
    this.userService.updatePassword(this.oldPassword, this.newPassword).subscribe({
      next: () => {
        this.isUpdatingPassword = false;
        this.oldPassword = '';
        this.newPassword = '';
        form.resetForm(); 
        alert('Mot de passe modifié avec succès !');
      },
      error: (err) => {
        this.isUpdatingPassword = false;
        alert('Erreur lors du changement de mot de passe');
        console.error(err);
      }
    });
  }
}