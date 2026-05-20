import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { PpfService } from '../../services/ppf.service';
import { Subject, takeUntil, tap } from 'rxjs';
import {LucideAngularModule,ChevronsRight} from 'lucide-angular';
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
      // this.nextSlide();
    }, 2500);

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }


carImages: any = {
  gloss: '..assets/images/glossmain.png',
  
  matte: '..assets/images/main2.jpg',

  colored: '..assets/images/main2.jpg'
};

get introImage(): string {

  return (
    this.carImages[this.slug] ||
    '../assets/images/glossmain.png'
  );

}
  loadPage() {

    this.ppfService
      .getBySlug(this.slug)
      .subscribe((res: any) => {

        this.pageData = res.data;

      });

  }

  // nextSlide() {

  //   if (!this.pageData?.gallery) return;

  //   const cardWidth = 266;

  //   this.currentIndex++;

  //   if (
  //     this.currentIndex >
  //     this.pageData.gallery.length - 3
  //   ) {

  //     this.currentIndex = 0;

  //   }

  //   this.transformStyle =
  //     `translateX(-${this.currentIndex * cardWidth}px)`;

  // }

}