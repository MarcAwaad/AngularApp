import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, PopupComponent],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  userForm: FormGroup;
  subscription: Subscription = new Subscription();
  popupMessage: string = "";
  showMessage: boolean = false;

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
          this.popupMessage = 'Creation successful.';
          this.showMessage = true;
          this.userForm.reset();
        },
        error: error => {
          this.popupMessage = 'Error creating user: ' + error;
          this.showMessage = true;
        }
      });
      } 
    }

  closePopup() {
    this.showMessage = false;
  }

  get name() {
    return this.userForm.get('name');
  }

  get job() {
    return this.userForm.get('job');
  }
}
