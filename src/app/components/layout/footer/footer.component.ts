import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
interface SocialLink {
  name: string;
  iconDesktop: string;
  iconMobile: string;
  url: string;
}
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  socialLinks: SocialLink[] = [
    {
      name: 'Whatsapp',
      iconDesktop: 'RRSS=Whatsapp, Dispositivo=Desktop.png',
      iconMobile: 'RRSS=Whatsapp, Dispositivo=Mobile.png',
      url: 'https://wa.me/5491123992362?text=Hola,%20me%20gustaría%20coordinar%20una%20entrevista%20para%20conocer%20más%20sobre%20sus%20servicios.'
    },
    {
      name: 'Email',
      iconDesktop: 'RRSS=Email, Dispositivo=Desktop.png',
      iconMobile: 'RRSS=Email, Dispositivo=Mobile.png',
      url: 'mailto:contacto.simpleapps@gmail.com?subject=Consulta%20Simple%20Apps&body=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20sus%20servicios.'
    },
    {
      name: 'Instagram',
      iconDesktop: 'RRSS=Instagram, Dispositivo=Desktop.png',
      iconMobile: 'RRSS=Instagram, Dispositivo=Mobile.png',
      url: 'https://www.instagram.com/simpleapps.com.ar/?utm_source=ig_web_button_share_sheet'
    },
    {
      name: 'LinkedIn',
      iconDesktop: 'RRSS=LinkedIn, Dispositivo=Desktop.png',
      iconMobile: 'RRSS=LinkedIn, Dispositivo=Mobile.png',
      url: 'https://www.linkedin.com/in/santiago-scally-55884a15b/'
    }
  ];

}
