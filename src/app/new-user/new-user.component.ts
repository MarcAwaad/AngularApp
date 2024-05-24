import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  userForm: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      job: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.apiService.createUser(this.userForm.get('name')?.value, this.userForm.get('job')?.value).subscribe({
        next: response => {
          console.log('Creation successful:', response);
        },
        error: error => {
          console.error('Error creating user:', error);
        }
      });
      } 
    }

  get name() {
    return this.userForm.get('name');
  }

  get job() {
    return this.userForm.get('job');
  }
}
