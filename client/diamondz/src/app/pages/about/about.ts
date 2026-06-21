import {
  Component,
  Inject,
  PLATFORM_ID,
  OnInit
} from '@angular/core';

import { Footer } from '../../layout/footer/footer';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [Footer, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {

    // SEO
    this.seoService.updateSeo(
      'About DiamondZ PPF | Premium Paint Protection Film in Bangalore',
      'Learn about DiamondZ PPF, our premium Paint Protection Film solutions, global sourcing, TPU technology, and commitment to automotive protection excellence.',
      'About DiamondZ PPF, PPF Bangalore, Paint Protection Film Bangalore, TPU PPF, Car Protection Film'
    );

    // Schema
    this.seoService.addSchema(
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "About DiamondZ PPF",
        "url": "https://diamondzppf.com/about",
        "description":
          "Learn about DiamondZ PPF and our premium Paint Protection Film solutions."
      },
      'about-schema'
    );

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      });
    }
  }

  whyChooseUs = [
    {
      image: '../assets/images/why1.jpg',
      title: 'Direct Global Material Sourcing',
      description:
        'We import premium-grade raw materials and coatings from leading global innovators in the USA and Indonesia, including trusted suppliers associated with Lubrizol, Ashland, BASF, and Covestro technologies.'
    },
    {
      image: '../assets/images/why2.png',
      title: 'Premium TPU Technology',
      description:
        'We use advanced TPU-based protection films designed for superior gloss retention, self-healing performance, stain resistance, and long-lasting protection.'
    },
    {
      image: '../assets/images/why3.png',
      title: 'Trusted Quality & Authentic Products From Germany',
      description:
        'Every film we install is sourced from globally recognized manufacturers with proven automotive-grade standards.'
    },
    {
      image: '../assets/images/why4.png',
      title: 'Complete Vehicle Protection Solutions',
      description:
        'From Paint Protection Films and matte finishes to gloss enhancement, roof wraps, pillar protection, and interior protection solutions.'
    },
    {
      image: '../assets/images/why5.png',
      title: 'Reliable Worldwide Distribution',
      description:
        'Efficient logistics management and international supply capabilities ensure smooth and timely product delivery.'
    }
  ];
}