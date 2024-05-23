import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { UserhandlingComponent } from './userhandling/userhandling.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'userhandling', component: UserhandlingComponent},
  { path: 'newuser', component: NewUserComponent },
  { path: 'user/:id', component: UserDetailsComponent },
];
