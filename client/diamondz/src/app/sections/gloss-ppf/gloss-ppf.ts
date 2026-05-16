import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PpfService } from '../../services/ppf.service';

@Component({
  selector: 'app-gloss-ppf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gloss-ppf.html',
  styleUrls: ['./gloss-ppf.css']
})
export class GlossPpf implements OnInit, OnDestroy {

  data: any;

  features: any[] = [];
  warrantyPlans: any[] = [];
  gallery: string[] = [];

  currentIndex = 0;
  transformStyle = 'translateX(0px)';
  intervalId: any;

  constructor(
    private route: ActivatedRoute,
    private ppfService: PpfService
  ) {}

  ngOnInit() {

    // ✅ GET SLUG FROM URL
    this.route.paramMap.subscribe(params => {

      const slug = params.get('slug');

      console.log('SLUG:', slug);

      if (!slug) return;

      this.loadData(slug);

    });

    // ✅ AUTO SLIDER
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  // ✅ LOAD API DATA
  loadData(slug: string) {

    this.ppfService.getBySlug(slug).subscribe(res => {

      console.log('API RESPONSE:', res);

      this.data = res.data;

      this.features = this.data?.features ?? [];

      this.warrantyPlans = this.data?.warranties ?? [];

      // ✅ GALLERY WITH FALLBACK
      this.gallery =
        (this.data?.gallery ?? []).length > 0
          ? this.data.gallery.map((g: any) => g.imageUrl)
          : this.getDummyGallery();

    });

  }

  // ✅ DUMMY IMAGES (FALLBACK)
  getDummyGallery(): string[] {
    return [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a',
      'https://images.unsplash.com/photo-1504215680853-026ed2a45def',
      'https://images.unsplash.com/photo-1483721310020-03333e577078',
      'https://images.unsplash.com/photo-1511910849309-0dffb8785146',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d'
    ];
  }

  // ✅ SLIDER LOGIC
  nextSlide() {

    if (!this.gallery.length) return;

    const cardWidth = 266;

    this.currentIndex++;

    if (this.currentIndex > this.gallery.length - 3) {
      this.currentIndex = 0;
    }

    this.transformStyle =
      `translateX(-${this.currentIndex * cardWidth}px)`;
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}