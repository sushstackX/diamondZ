import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { CommonModule, NgFor } from '@angular/common';

import { PpfService } from '../../services/ppf.service';

import { Subject, takeUntil, tap } from 'rxjs';

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

export class PpfDetails implements OnInit, OnDestroy {

  slug = '';

  pageData: any;

  loading = true;

  currentIndex = 0;

  transformStyle = 'translateX(0px)';

  private destroy$ = new Subject<void>();

  private slideInterval: any;

  constructor(
    private route: ActivatedRoute,
    private ppfService: PpfService
  ) {}

  ngOnInit(): void {

    this.route.data.pipe(
      takeUntil(this.destroy$),
      tap(() => {
        this.loading = true;
      })
    ).subscribe({
      next: (data: any) => {
        this.pageData = data?.pageData;
        this.slug = this.route.snapshot.paramMap.get('slug') || '';
        this.loading = false;
      },
      error: () => {
        this.pageData = undefined;
        this.loading = false;
      }
    });

    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 2500);

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
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