import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqItems: FaqItem[] = [
    {
      question: '¿Cuánto tiempo lleva desarrollar una aplicación personalizada?',
      answer: 'El tiempo de desarrollo varía según la complejidad del proyecto. En general, una aplicación básica puede estar lista en 2-4 semanas, mientras que proyectos más complejos pueden llevar 3-4 meses. Durante nuestra primera reunión, podremos darte un estimado más preciso basado en tus necesidades específicas.',
      isOpen: false
    },
    {
      question: '¿Qué tipo de soporte ofrecen después del lanzamiento?',
      answer: 'Ofrecemos soporte técnico continuo que incluye mantenimiento y corrección de errores. También proporcionamos capacitación para tu equipo y asistencia directa para cualquier consulta o problema que pueda surgir. Nuestro objetivo es asegurar que tu aplicación funcione sin problemas.',
      isOpen: false
    },
    {
      question: '¿Las aplicaciones funcionan en todos los dispositivos?',
      answer: 'Sí, desarrollamos aplicaciones responsivas que funcionan perfectamente en computadoras, tablets y smartphones. Utilizamos un enfoque "mobile-first" para garantizar una experiencia óptima en todos los dispositivos, adaptando la interfaz automáticamente según el tamaño de pantalla.',
      isOpen: false
    },
    {
      question: '¿Qué pasa si necesito modificaciones después del desarrollo?',
      answer: 'Entendemos que los negocios evolucionan. Por eso, diseñamos nuestras soluciones de manera modular y escalable. Podemos realizar modificaciones y agregar nuevas funcionalidades según tus necesidades. Ofrecemos planes de mantenimiento flexibles para adaptarnos a tu crecimiento.',
      isOpen: false
    },
  ];

  toggleFaq(item: FaqItem): void {
    item.isOpen = !item.isOpen;
  }
}
