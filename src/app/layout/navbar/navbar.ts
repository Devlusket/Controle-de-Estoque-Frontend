import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent {


  private authService = inject(AuthService);

  email = this.authService.getEmail();

  logout(): void {
    this.authService.logout();
  }

}
