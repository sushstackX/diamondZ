import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  Renderer2
} from '@angular/core';

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { interval, Subscription } from 'rxjs';

import { Products } from '../../sections/products/products';
import { Hero } from '../../sections/hero/hero';
import { Benefits } from '../../sections/benefits/benefits';
import { Process } from '../../sections/process/process';
import { Faq } from '../../sections/faq/faq';
import { PpfInfoVisual } from '../../sections/ppf-info-visual/ppf-info-visual';
import { Company } from '../../sections/company/company';
import { Vision } from '../../sections/vision/vision';
import { Partners } from '../../sections/partners/partners';
import { Footer } from '../../layout/footer/footer';

import { FaqService } from '../../services/faq.service';
import { ProcessStepService } from '../../services/process-step.service';
import { BenefitService } from '../../services/benefit.service';

import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Hero,
    PpfInfoVisual,
    Process,
    Benefits,
    Company,
    Products,
    Vision,
    Faq,
    Partners,
    Footer
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit, OnDestroy {

  images: string[] = ['assets/images/ppf3.jpg'];

  currentIndex = 0;
  private sliderSub!: Subscription;

  products = [
    {
      title: 'Gloss PPF',
      description: 'High-gloss finish paint protection film that enhances shine, protects against scratches, and features self-healing technology.',
      image: 'assets/images/ppf1.jpg'
    },
    {
      title: 'Matte PPF',
      description: 'Elegant matte finish film that delivers a smooth satin look while protecting your vehicle.',
      image: 'assets/images/ppf2.jpg'
    }
  ];

  constructor(
    private renderer: Renderer2,
    private faqService: FaqService,
    private processStepService: ProcessStepService,
    private benefitService: BenefitService,
    @Inject(PLATFORM_ID) private platformId: object,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {

    // ✅ SEO ALWAYS RUNS (IMPORTANT FOR GOOGLE)
    this.title.setTitle("DiamondZ PPF | Premium Paint Protection Film in Bengaluru");

    this.meta.updateTag({
      name: 'description',
      content: 'DiamondZ PPF offers premium Paint Protection Film in Bengaluru. Gloss, matte & self-healing protection for cars with long-lasting durability.'
    });

    // ✅ ONLY BROWSER LOGIC
    if (isPlatformBrowser(this.platformId)) {

      this.sliderSub = interval(4000).subscribe(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      });

      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      this.addSchema();
    }
  }

  ngOnDestroy() {
    this.sliderSub?.unsubscribe();
  }

  addSchema() {

    const existing = document.querySelector('[data-schema="org"]');
    if (existing) return;

    const script = this.renderer.createElement('script');

    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'org');

    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "DiamondZ PPF",
      "url": "https://diamondzppf.com",
      "logo": "https://diamondzppf.com/assets/images/logo2-1.png",
      "description": "Premium Paint Protection Film provider offering gloss, matte and colored PPF solutions.",
      "sameAs": [
        "https://www.instagram.com/diamondzppf",
        "https://www.facebook.com/diamondzppf"
      ]
    });

    this.renderer.appendChild(document.head, script);
  }
}