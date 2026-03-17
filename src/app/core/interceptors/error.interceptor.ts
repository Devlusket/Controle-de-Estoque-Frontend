import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 401:
          authService.logout();
          break;
        case 403:
          toast.show('Sem permissão para esta ação.');
          break;
        case 404:
          toast.show('Recurso não encontrado.');
          break;
        case 400:
          toast.show('Dados inválidos.');
          break;
        default:
          toast.show('Erro interno do servidor.');
      }
      return throwError(() => error);
    })
  );
};