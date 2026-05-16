import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';

import { NgFor } from '@angular/common';

import { PpfService } from '../../services/ppf.service';

@Component({
  selector: 'app-services',
  standalone: true,

  imports: [
    RouterModule,
    NgFor
  ],

  templateUrl: './services.html',
  styleUrls: ['./services.css'],
})

export class Services implements OnInit {

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

  constructor(private ppfService: PpfService) {}

  ngOnInit() {
    this.ppfService.prefetchSlugs(
      this.services.map(service => service.slug)
    );
  }

  selectService(service: any) {
    if (typeof window === 'undefined' || !window.sessionStorage) {
      return;
    }

    window.sessionStorage.setItem(
      'selectedServiceId',
      service.id
    );

    window.sessionStorage.setItem(
      'selectedSlug',
      service.slug
    );

    window.sessionStorage.setItem(
      'selectedServiceName',
      service.name
    );
  }

}