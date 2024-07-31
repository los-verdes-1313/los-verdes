import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoading = true;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUser().subscribe(user => {
      console.log('Current auth state:', user ? 'Authenticated' : 'Not authenticated');
      if (!user) {
        this.router.navigate(['/login']);
      }
      this.isLoading = false;
    });
  }
}
