import { Component } from '@angular/core';
import { Footer } from '../../layout/footer/footer';
import { Navbar } from '../../layout/navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ Footer,CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  whyChooseUs = [

    {
      number: '01',
      title: 'Direct Global Material Sourcing',
      description:
        'We import premium-grade raw materials and coatings from leading global innovators in the USA and Indonesia, including trusted suppliers associated with Lubrizol, Ashland, BASF, and Covestro technologies — ensuring exceptional clarity, durability, and long-term performance in every film.'
    },

    {
      number: '02',
      title: 'Premium TPU Technology',
      description:
        'We use advanced TPU-based protection films designed for superior gloss retention, self-healing performance, stain resistance, and long-lasting protection against scratches, swirl marks, and environmental damage.'
    },

    {
      number: '03',
      title: 'Trusted Quality & Authentic Products',
      description:
        'We believe in transparency and genuine materials only. Every film we install is sourced from globally recognized manufacturers with proven automotive-grade standards and consistent quality control.'
    },

    {
      number: '04',
      title: 'Complete Vehicle Protection Solutions',
      description:
        'From Paint Protection Films and matte finishes to gloss enhancement, roof wraps, pillar protection, and interior protection solutions — we provide complete customization and protection packages tailored to your vehicle.'
    },
      {
      number: '05',
      title: 'Premium Finish with Long-Term Performance',
      description:
        'Our films are designed to maintain deep gloss, color richness, and surface smoothness for years while reducing oxidation, fading, and paint deterioration caused by UV exposure.'
    },

    {
      number: '06',
      title: 'Customer-First Support',
      description:
        'We focus on long-term customer satisfaction with expert guidance, aftercare support, and solutions customized for luxury cars, daily drivers, and performance vehicles alike.'
    }

  ];

}
