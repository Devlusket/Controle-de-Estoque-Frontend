import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { ShellComponent } from './layout/shell/shell';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

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
          import('./features/dashboard/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'produtos',
        loadComponent: () => 
          import('./features/produtos/lista-produtos/lista-produtos').then(m => m.ListaProdutosComponent)
      },
      {
        path: 'cidades',
        canActivate: [roleGuard],
        data: {role: 'ADMIN'},
        loadComponent: () =>
          import('./features/cidades/lista-cidades/lista-cidades').then(m => m.ListaCidadesComponent)
      }
    ]
  }, 
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
