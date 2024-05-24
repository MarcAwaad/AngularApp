import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  id = input.required<string>();
  email = input.required<string>();
  firstName = input.required<string>();
  lastName = input.required<string>();

  constructor(private router: Router) {}

  navigateToUserDetails(): void {
    this.router.navigate(['/user']);
  }
}