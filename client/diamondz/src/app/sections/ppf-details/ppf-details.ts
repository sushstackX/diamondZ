import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import {
  CommonModule,
  isPlatformBrowser,
  NgFor
} from '@angular/common';

import { Subject, takeUntil, tap } from 'rxjs';

import {
  LucideAngularModule,
  ChevronsRight
} from 'lucide-angular';

import { Footer } from '../../layout/footer/footer';
import { PpfService } from '../../services/ppf.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-ppf-details',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    LucideAngularModule,
    Footer
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
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: object
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

        // Dynamic SEO
        this.setSeo(this.slug);

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
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      });
    }
  }

  private setSeo(slug: string): void {

    const seoMap: any = {

      'gloss-ppf': {
        title:
          'Gloss PPF | Diamondz PPF Bangalore',
        description:
          'Premium Gloss Paint Protection Film with self-healing technology, high-gloss finish and long-lasting protection.',
        schemaName:
          'Gloss Paint Protection Film'
      },

      'matte-ppf': {
        title:
          'Matte PPF | Diamondz PPF Bangalore',
        description:
          'Premium Matte Paint Protection Film delivering a satin finish while protecting against scratches and environmental damage.',
        schemaName:
          'Matte Paint Protection Film'
      },

      'colored-ppf': {
        title:
          'Colored PPF | Diamondz PPF Bangalore',
        description:
          'Premium Colored Paint Protection Film combining style, color transformation and superior paint protection.',
        schemaName:
          'Colored Paint Protection Film'
      }
    };

    const seo =
      seoMap[slug] ||
      seoMap['gloss-ppf'];

    this.seoService.updateSeo(
      seo.title,
      seo.description,
      `${slug}, PPF Bangalore, Paint Protection Film, DiamondzPPF`
    );

    this.seoService.addSchema(
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": seo.schemaName,
        "provider": {
          "@type": "Organization",
          "name": "Diamondz PPF"
        },
        "url":
          `https://diamondzppf.com/services/${slug}`
      },
      `${slug}-schema`
    );
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