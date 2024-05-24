import { Component, Input } from '@angular/core';
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
  @Input() id = '';
  @Input() email = '';
  @Input() firstName = '';
  @Input() lastName = '';

  constructor(private router: Router) {}

  navigateToUserDetails(): void {
    this.router.navigate(['/user']);
  }
}