import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { UserhandlingComponent } from './userhandling/userhandling.component';

export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'userhandling', component: UserhandlingComponent}
];
