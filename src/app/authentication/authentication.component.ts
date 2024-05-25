import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, PopupComponent],
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  loginForm: FormGroup;
  users: any[] = [];
  subscription: Subscription = new Subscription();
  token: string | null = null;
  popupMessage: string = "";
  showMessage: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')]],
      password: ['', [Validators.required]]
    });
  }

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

  onSubmit() {
    if (this.loginForm.valid) {
      const enteredEmail = this.loginForm.get('email')?.value;
      const enteredPassword = this.loginForm.get('password')?.value;
      const emailExists = this.users.some(user => user.email === enteredEmail);

      if (emailExists) {
        this.apiService.loginUser(enteredEmail, enteredPassword).subscribe({
          next: response => {
            this.token = response.token;
            this.popupMessage = 'Login successful, token: ' + this.token;
            this.showMessage = true;
            this.loginForm.reset();
          },
          error: error => {
            this.popupMessage = 'Error logging in: ' + error;
            this.showMessage = true;
          }
        });
      } else {
        this.popupMessage = 'Email does not match any existing users.';
        this.showMessage = true;
      }
    }
  }

  closePopup() {
    this.showMessage = false;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
