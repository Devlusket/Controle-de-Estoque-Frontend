import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';
import { SidebarComponent } from '../sidebar/sidebar';
import { ToastComponent } from "../../shared/components/toast/toast";

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, ToastComponent],
  templateUrl: './shell.html',
})
export class ShellComponent {}