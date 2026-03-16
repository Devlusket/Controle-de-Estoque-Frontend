import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  

  const authService = inject(AuthService);
  const router = inject(Router)


  const roleEsperada = route.data['role'];
  const roleUsuario = authService.getRole();

  if (roleEsperada === roleUsuario) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;

};
