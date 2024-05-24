import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-userhandling',
  standalone: true,
  imports: [CommonModule, UserDetailsComponent],
  templateUrl: './userhandling.component.html',
  styleUrl: './userhandling.component.css'
})
export class UserHandlingComponent {
  users: any[] = [];
  subscription: Subscription = new Subscription();
  userId: string = '';
  userEmail: string = '';
  userFirstName: string = '';
  userLastName: string = '';
  userClicked: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.subscription = this.apiService.getUsers().subscribe({
      next: response => {
        this.users = response.data;
      },
      error: error => {
        console.error('Error fetching users:', error);
      }
    });
  }

  navigateToNewUserPage(): void {
    this.router.navigate(['/newuser']);
  }

  showDetails(id: string, email: string, firstName: string, lastName: string): void {
    this.userId = id;
    this.userEmail = email;
    this.userFirstName = firstName;
    this.userLastName = lastName;
    this.userClicked = true;
  }

  navigateToUserHandling(): void {
    this.userClicked = false;
  }
}
