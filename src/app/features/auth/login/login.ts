import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
            MatCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule
  ],
  templateUrl: './login.html',
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = false;
  erro = '';


  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required, Validators.minLength(3)]
  });

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.erro = '';

    this.authService.login(this.form.value as any).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.erro = 'Email ou senha inválidos.';
        this.loading = false;
      } 
    });
  }

}
