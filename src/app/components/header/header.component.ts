import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isSidebarOpen = false;
  isDropdownOpen = false;

  @ViewChild('dropdownToggle') dropdownToggle!: ElementRef;

  navItems = [
    { route: '/create-order', label: 'Crear Pedidos' },
    { route: '/orders', label: 'Órdenes de Compra' },
    { route: '/add-product', label: 'Productos' },
    { route: '/clients', label: 'Clientes' }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    document.body.style.overflow = this.isSidebarOpen ? 'hidden' : '';
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.dropdownToggle && !this.dropdownToggle.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth >= 992 && this.isSidebarOpen) {
      this.toggleSidebar();
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error during logout:', error);
    });
  }
}