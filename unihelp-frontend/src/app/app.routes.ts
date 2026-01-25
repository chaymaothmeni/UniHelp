import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewRequestComponent } from './components/request/new.request.component';
import { RequestDetailComponent } from './components/request/request-details.component';
import { WelcomeComponent } from './components/welcome/welcome';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: WelcomeComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'new-request', component: NewRequestComponent },
  { path: 'requests/:id', component: RequestDetailComponent },
{
  path: 'profile',
  component: ProfileComponent,
  canActivate: [authGuard]
},

  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];