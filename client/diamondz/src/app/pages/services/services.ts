import { Component } from '@angular/core';

import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { NgFor } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,

  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgFor
  ],

  templateUrl: './services.html',
  styleUrls: ['./services.css'],
})

export class Services {

  services = [

    {
      id: 1,
      name: 'Gloss PPF',
      slug: 'gloss-ppf'
    },

    {
      id: 2,
      name: 'Matte PPF',
      slug: 'matte-ppf'
    },

    {
      id: 3,
      name: 'Colored PPF',
      slug: 'colored-ppf'
    }

  ];

  selectService(service: any) {

    sessionStorage.setItem(
      'selectedServiceId',
      service.id
    );

    sessionStorage.setItem(
      'selectedSlug',
      service.slug
    );

    sessionStorage.setItem(
      'selectedServiceName',
      service.name
    );

  }

}