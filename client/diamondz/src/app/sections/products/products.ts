import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products {
 products = [
    {
      title: 'Gloss PPF',
      description: 'Enhances shine with a mirror-like finish while protecting against scratches and UV damage.',
      image: 'assets/images/gloss.png',
      link: '/ppf/gloss'
    },
    {
      title: 'Matte PPF',
      description: 'Transforms your vehicle into a smooth matte look with premium protection and durability.',
      image: 'assets/images/matte.png',
      link: '/ppf/matte'
    },
    {
      title: 'Colored PPF',
      description: 'Change your car color with protection. Combines styling and safety in one solution.',
      image: 'assets/images/colored.png',
      link: '/ppf/colored'
    }
  ];
}