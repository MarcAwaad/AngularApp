import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, PopupComponent],
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  users: any[] = [];
  subscription: Subscription = new Subscription();
  token: string | null = null;
  popupMessage: string = "";
  showMessage: boolean = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$')]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$')]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
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
            this.popupMessage = 'Registration successful, token: ' + this.token;
            this.showMessage = true;
            this.registrationForm.reset();
          },
          error: error => {
            console.error('Error registering:', error);
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
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }
}
