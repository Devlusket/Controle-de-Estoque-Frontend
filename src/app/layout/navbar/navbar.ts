import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  email = this.authService.getEmail();

  logout(): void {
    this.authService.logout();
  }
}