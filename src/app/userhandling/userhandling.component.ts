import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhandling',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userhandling.component.html',
  styleUrl: './userhandling.component.css'
})
export class UserhandlingComponent {
  users: any[] = [];
  subscription: Subscription = new Subscription();

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

  navigateToUserDetails(id: string): void {
    this.router.navigate(['/user', id]);
  }
}