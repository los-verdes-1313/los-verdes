import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  onSubmit() {
    this.authService.login(this.email, this.password)
    .then(() => {
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.error('Login error:', error);
      let errorMessage = 'Ha ocurrido un error durante el inicio de sesión';
      
      // Personalizar mensajes de error basados en el código de error de Firebase
      switch(error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No existe una cuenta con este correo electrónico';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El formato del correo electrónico es inválido';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Esta cuenta ha sido deshabilitada';
          break;
        // Puedes agregar más casos según sea necesario
      }
      
      this.toastr.error(errorMessage, 'Error de autenticación');
    });
  }
}
