import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss'
})
export class WhyUsComponent {
  features: Feature[] = [
    {
      icon: 'design_services',
      title: 'A tu medida',
      description: 'Diseñamos soluciones a medida que se adaptan perfectamente a tu negocio, garantizando que cada función responda exactamente a tus necesidades específicas.'
    },
    {
      icon: 'rocket_launch',
      title: 'Resultados rápidos',
      description: 'Desarrollamos y entregamos soluciones en tiempo récord sin comprometer la calidad, permitiéndote implementar tu software y ver resultados rápidamente.'
    },
    {
      icon: 'savings',
      title: 'Precio justo',
      description: 'Ofrecemos soluciones con una excelente relación calidad-precio, haciendo que el software profesional sea accesible para pequeños y medianos comercios.'
    }
  ];

}
