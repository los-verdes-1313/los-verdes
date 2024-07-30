import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  logout() {
    // Implementa aquí la lógica de cierre de sesión
    // Por ejemplo:
    // this.authService.logout();
    this.router.navigate(['/login']);
  }

}
