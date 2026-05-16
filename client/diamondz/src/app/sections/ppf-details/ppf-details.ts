import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { CommonModule, NgFor } from '@angular/common';

import { PpfService } from '../../services/ppf.service';

@Component({
  selector: 'app-ppf-details',

  standalone: true,

  imports: [
    CommonModule,
    NgFor
  ],

  templateUrl: './ppf-details.html',

  styleUrls: ['./ppf-details.css']
})

export class PpfDetails implements OnInit {

  slug: string = '';

  pageData: any;

  currentIndex = 0;

  transformStyle = 'translateX(0px)';

  constructor(
    private route: ActivatedRoute,
    private ppfService: PpfService
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      this.slug =
        params.get('slug') || '';

      this.loadPage();

    });

    setInterval(() => {
      this.nextSlide();
    }, 2500);

  }

  loadPage() {

    this.ppfService
      .getBySlug(this.slug)
      .subscribe((res: any) => {

        this.pageData = res.data;

      });

  }

  nextSlide() {

    if (!this.pageData?.gallery) return;

    const cardWidth = 266;

    this.currentIndex++;

    if (
      this.currentIndex >
      this.pageData.gallery.length - 3
    ) {

      this.currentIndex = 0;

    }

    this.transformStyle =
      `translateX(-${this.currentIndex * cardWidth}px)`;

  }

}