import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';
import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, 
            MatSidenavModule, 
            NavbarComponent,
            SidebarComponent],
  templateUrl: './shell.html',
})
export class ShellComponent {}
