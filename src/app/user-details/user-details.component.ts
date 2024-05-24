import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  user: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUserDetails(userId);
    } else {
      console.error('User id is null');
    }
}

loadUserDetails(id: string): void {
    this.apiService.getUserById(id).subscribe({
      next: response => {
        this.user = response.data;
      },
      error: error => {
        console.error('Error fetching user details:', error);
      }
    });
}

navigateToUserHandling(): void {
  this.router.navigate(['/userhandling']);
}

}