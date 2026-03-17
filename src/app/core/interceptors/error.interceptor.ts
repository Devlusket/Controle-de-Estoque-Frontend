import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../services/auth.service";
import { catchError, throwError } from "rxjs";


export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const snackBar = inject(MatSnackBar);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 401:
          authService.logout();
          break;
        case 403:
          snackBar.open('Sem permissão para esta ação.', 'Fechar', {duration: 3000})
          break;
        case 404:
          snackBar.open('Recurso não encontrado', 'Fechar', {duration: 3000})
          break;
        case 400:
          snackBar.open('Dados inválidos.', 'Fechar', {duration: 3000})
          break;
        default:
          snackBar.open('Erro interno do servidor.', 'Fechar', {duration: 3000})
      }
      return throwError(() => error);
    })
  )

}