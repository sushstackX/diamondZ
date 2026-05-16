import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matte-ppf',
  imports: [NgFor],
  templateUrl: './matte-ppf.html',
  styleUrl: './matte-ppf.css',
})
export class MattePpf  implements OnInit {
  features = [
    {
      title: 'High Gloss Finish',
      desc: 'Enhances factory paint with deep mirror-like shine.'
    },
    {
      title: 'Self-Healing Technology',
      desc: 'Minor scratches disappear with heat exposure.'
    },
    {
      title: 'UV Protection',
      desc: 'Prevents fading and oxidation from sunlight.'
    },
    {
      title: 'Scratch Resistance',
      desc: 'Protects from daily wear and stone chips.'
    },
    {
      title: 'Hydrophobic Surface',
      desc: 'Repels water, dust, and stains easily.'
    }
  ];

  warrantyPlans = [
    {
      years: 5,
      points: [
        'Paint Protection Coverage',
        'UV & Fade Resistance',
        'Minor Scratch Resistance',
        'Authorized Installation Warranty'
      ]
    },
    {
      years: 7,
      points: [
        'Enhanced Scratch Protection',
        'Self-Healing Layer',
        'Yellowing Resistance',
        'Peeling Protection'
      ]
    },
    {
      years: 10,
      points: [
        'Full Premium Protection',
        'Advanced Self-Healing Tech',
        'Chemical Resistance',
        'Lifetime Finish Stability'
      ]
    }
  ];

  gallery = [
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a',
    'https://images.unsplash.com/photo-1504215680853-026ed2a45def',
    'https://images.unsplash.com/photo-1483721310020-03333e577078',
    'https://images.unsplash.com/photo-1511910849309-0dffb8785146',
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d'
  ];

  currentIndex = 0;
  transformStyle = 'translateX(0px)';

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 400);
  }

  nextSlide() {
    const cardWidth = 266; // card width + gap

    this.currentIndex++;

    // reset when end reached
    if (this.currentIndex > this.gallery.length - 3) {
      this.currentIndex = 0;
    }

    this.transformStyle = `translateX(-${this.currentIndex * cardWidth}px)`;
  }
}