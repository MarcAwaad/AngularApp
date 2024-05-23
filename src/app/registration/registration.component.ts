import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  users: any[] = [];
  subscription: Subscription = new Subscription();
  token: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$')
      ]]
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
    if (this.registrationForm.valid) {
      const enteredEmail = this.registrationForm.get('email')?.value;
      const enteredPassword = this.registrationForm.get('password')?.value;
      const emailExists = this.users.some(user => user.email === enteredEmail);

      if (emailExists) {
        this.apiService.registerUser(enteredEmail, enteredPassword).subscribe({
          next: response => {
            this.token = response.token;
            console.log('Login successful, token:', this.token);
          },
          error: error => {
            console.error('Error registering:', error);
          }
        });
      } else {
        console.log('Email does not match any existing users.');
      }
    } else {
      console.log('Form is invalid');
    }
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }
}