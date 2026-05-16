import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { Products } from '../../sections/products/products';
import { Hero } from '../../sections/hero/hero';
import { Benefits } from '../../sections/benefits/benefits';
import { Process } from '../../sections/process/process';
import { Faq } from '../../sections/faq/faq';
import { Contact } from '../contact/contact';
import { PpfInfoVisual } from '../../sections/ppf-info-visual/ppf-info-visual';
import { PpfInfoSteps } from '../../sections/ppf-info-steps/ppf-info-steps';
import { Company } from '../../sections/company/company';
import { Vision } from '../../sections/vision/vision';
import { Partners } from '../../sections/partners/partners';
import { Footer } from '../../layout/footer/footer';
import { Services } from '../services/services';
import { FaqService } from '../../services/faq.service';
import { ProcessStepService } from '../../services/process-step.service';
import { BenefitService } from '../../services/benefit.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    Hero,
    PpfInfoVisual,
    Process,
    Benefits,
    Company,
    Products,
    // Services,
    Vision,
    Faq,
    Partners,
    Footer
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, OnDestroy {

  images: string[] = [
    // 'assets/images/ppf1.jpg',
    // 'assets/images/ppf2.jpg',
    'assets/images/ppf3.jpg'
  ];

  currentIndex = 0;
  private sliderSub!: Subscription;

  constructor(
    private faqService: FaqService,
    private processStepService: ProcessStepService,
    private benefitService: BenefitService
  ) {}

    // ✅ PRODUCTS DATA (dummy backend response)
  products = [
    {
      title: 'Gloss PPF',
      description: 'High-gloss finish paint protection film that enhances shine, protects against scratches, and features self-healing technology.',
      image: 'assets/images/ppf1.jpg'
    },
    {
      title: 'Matte PPF',
      description: 'Elegant matte finish film that delivers a smooth satin look while protecting your vehicle from damage and UV exposure.',
      image: 'assets/images/ppf2.jpg'
    }
  ];

  ngOnInit() {
    this.sliderSub = interval(4000).subscribe(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.images.length;
    });
  }

  ngOnDestroy() {
    if (this.sliderSub) {
      this.sliderSub.unsubscribe();
    }
  }

   loadProductsFromBackend() {
    // example API response
    const response = [
      {
        title: 'Gloss PPF',
        description: 'From API...',
        image: 'api-image-url-1'
      }
    ];

    this.products = response;
  }
}