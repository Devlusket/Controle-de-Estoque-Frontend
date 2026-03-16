import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { ShellComponent } from './layout/shell/shell';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => 
          import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }, 
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
