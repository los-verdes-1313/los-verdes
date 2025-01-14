import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface Solution {
  title: string;
  description: string;
  benefits: string[];
  icon: string;
}

interface Step {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-ideas',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './ideas.component.html',
  styleUrl: './ideas.component.scss'
})
export class IdeasComponent {
  solutions: Solution[] = [
    {
      title: 'Automatización de tareas',
      description: 'Generación automática de órdenes, recordatorios y planillas de cálculo.',
      benefits: ['Evita el trabajo manual', 'Reduce errores'],
      icon: 'auto_awesome'
    },
    {
      title: 'Gestión de clientes',
      description: 'Creación de base de datos de clientes, guardado de preferencias del usuario y su historial de compras.',
      benefits: ['Ayuda a la memoria del usuario', 'Fideliza la clientela'],
      icon: 'group'
    },
    {
      title: 'Comunicación',
      description: 'Notificaciones automatizadas, muestra de estado de pedidos y aviso de promociones.',
      benefits: ['Informa al cliente'],
      icon: 'chat'
    },
    {
      title: 'Gestión de inventario',
      description: 'Control de stock con alertas ante baja cantidad de stock y seguimiento de los productos más vendidos.',
      benefits: ['Mayor organización principalmente para pequeños comercios'],
      icon: 'inventory_2'
    },
    {
      title: 'Análisis de ventas',
      description: 'Reportes diarios y/o mensuales, tendencias de ventas y productos más rentables.',
      benefits: ['Optimizar el rendimiento'],
      icon: 'analytics'
    },
    {
      title: 'Gestión de pedidos',
      description: 'Sistema de órdenes de compra, seguimiento de pedidos y acceso al historial de tus clientes.',
      benefits: ['Mayor organización ante un gran volúmen de pedidos'],
      icon: 'shopping_cart'
    }
  ];

  steps: Step[] = [
    {

      title: '1. Relevamiento',
      description: 'Reunión inicial para entender tus necesidades. Elaboración de presupuesto acorde a tu proyecto.',
      icon: 'assignment'
    },
    {
      title: '2. Avances',
      description: 'Seguimiento del desarrollo para asegurarnos que estemos yendo en la dirección correcta.',
      icon: 'preview'
    },
    {
      title: '3. Revisión',
      description: 'Análisis de la versión preliminar para ajustes finales.',
      icon: 'rate_review'
    },
    {
      title: '4. Entrega',
      description: 'Presentación del proyecto finalizado y capacitación en su uso.',
      icon: 'verified'
    }
  ];
}