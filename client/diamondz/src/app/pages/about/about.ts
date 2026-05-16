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
      title: 'Advanced TPU Technology',
      description:
        'Engineered with premium self-healing protection films delivering exceptional durability, clarity and surface defense.'
    },

    {
      number: '02',
      title: 'Luxury Finish Quality',
      description:
        'Deep gloss enhancement and elegant matte finishes crafted to elevate the visual appeal of modern vehicles.'
    },

    {
      number: '03',
      title: 'Trusted Performance',
      description:
        'Reliable protection solutions trusted for long-lasting automotive surface preservation and premium aesthetics.'
    },

    {
      number: '04',
      title: 'Innovation Driven',
      description:
        'Constantly evolving with advanced coating technologies and next-generation automotive protection systems.'
    }

  ];

}
