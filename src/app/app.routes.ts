import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { UserHandlingComponent } from './userhandling/userhandling.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'userhandling', component: UserHandlingComponent},
  { path: 'newuser', component: NewUserComponent },
  { path: 'user', component: UserDetailsComponent}
];
