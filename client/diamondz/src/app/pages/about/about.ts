import { Component } from '@angular/core';
import { Footer } from '../../layout/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [Footer, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  whyChooseUs = [

    {
      image: '../assets/images/why1.jpg',
      title: 'Direct Global Material Sourcing',
      description:
        'We import premium-grade raw materials and coatings from leading global innovators in the USA and Indonesia, including trusted suppliers associated with Lubrizol, Ashland, BASF, and Covestro technologies — ensuring exceptional clarity, durability, and long-term performance in every film.'
    },

    {
      image: '../assets/images/why2.png',
      title: 'Premium TPU Technology',
      description:
        'We use advanced TPU-based protection films designed for superior gloss retention, self-healing performance, stain resistance, and long-lasting protection against scratches, swirl marks, and environmental damage.'
    },

    {
      image: '../assets/images/why3.jpg',
      title: 'Trusted Quality & Authentic Products',
      description:
        'We believe in transparency and genuine materials only. Every film we install is sourced from globally recognized manufacturers with proven automotive-grade standards and consistent quality control.'
    },

    {
      image: '../assets/images/why1.jpg',
      title: 'Complete Vehicle Protection Solutions',
      description:
        'From Paint Protection Films and matte finishes to gloss enhancement, roof wraps, pillar protection, and interior protection solutions — we provide complete customization and protection packages tailored to your vehicle.'
    },

    {
      image: '../assets/images/why3.jpg',
      title: 'Precision Engineered Performance',
      description:
        'Developed using advanced coating and laminating technologies, our automotive films deliver exceptional surface smoothness, clarity, flexibility, and long-lasting protective performance.'
    },

    {
      image: '../assets/images/why3.jpg',
      title: 'Reliable Worldwide Distribution',
      description:
        'With efficient logistics management and international supply capabilities, we ensure smooth and timely product delivery for customers and partners across global automotive markets.'
    },

  ];

}