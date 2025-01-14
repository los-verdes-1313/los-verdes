import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PresentationComponent } from '../../sections/presentation/presentation.component';
import { WhyUsComponent } from '../../sections/why-us/why-us.component';
import { IdeasComponent } from '../../sections/ideas/ideas.component';
import { FaqComponent } from '../../sections/faq/faq.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, PresentationComponent, WhyUsComponent, IdeasComponent, FaqComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
