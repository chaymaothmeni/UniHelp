import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { HelpRequest, HelpRequestService } from "../../services/help-request.service";
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  requests: HelpRequest[] = [];
  filteredRequests: HelpRequest[] = [];
  searchTerm = '';

  constructor(
    private helpRequestService: HelpRequestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.helpRequestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.filteredRequests = data; 
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors du chargement des demandes');
      }
    });
  }

  filterRequests() {
    const term = this.searchTerm.toLowerCase();
    this.filteredRequests = this.requests.filter(req =>
      req.subject.toLowerCase().includes(term)
    );
  }

  goToNewRequest() {
    this.router.navigate(['/new-request']);
  }

  viewDetail(id: string) {
    this.router.navigate(['/requests', id]);
  }
}
