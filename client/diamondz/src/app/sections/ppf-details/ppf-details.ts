import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser, NgFor } from '@angular/common';
import { PpfService } from '../../services/ppf.service';
import { Subject, takeUntil, tap } from 'rxjs';

import {
  LucideAngularModule,
  ChevronsRight
} from 'lucide-angular';

@Component({
  selector: 'app-ppf-details',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    LucideAngularModule
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
  chevronIcon = ChevronsRight;

  private destroy$ = new Subject<void>();
  private slideInterval: any;

  constructor(
   
    private route: ActivatedRoute,
    private ppfService: PpfService,
     @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  carImages: any = {
    'gloss-ppf': 'assets/images/glossmain.png',
    'matte-ppf': 'assets/images/mattemain.png',
    'colored-ppf': 'assets/images/colormain.png'
  };

  ngOnInit(): void {
   

    this.route.data.pipe(
      takeUntil(this.destroy$),
      tap(() => {
        this.loading = true;
      })
    ).subscribe({

      next: (data: any) => {

        this.pageData = data?.pageData;

        this.slug =
          this.route.snapshot.paramMap.get('slug') || '';

        // console.log('SLUG:', this.slug);

        this.loading = false;
      },

      error: () => {

        this.pageData = undefined;

        this.loading = false;
      }

    });

    this.slideInterval = setInterval(() => {
      // this.nextSlide();
    }, 2500);
     if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();

    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  get introImage(): string {

    return (
      this.carImages[this.slug] ||
      'assets/images/glossmain.png'
    );
  }

  loadPage() {

    this.ppfService
      .getBySlug(this.slug)
      .subscribe((res: any) => {

        this.pageData = res.data;
      });
  }
}