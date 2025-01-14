import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = false;

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      this.isMenuOpen = false;
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const menuContainer = document.querySelector('.mobile-menu');
    const menuButton = document.querySelector('.menu-toggle');
    
    if (this.isMenuOpen && 
        menuContainer && 
        menuButton && 
        !menuContainer.contains(event.target as Node) && 
        !menuButton.contains(event.target as Node)) {
      this.isMenuOpen = false;
    }
  }
}