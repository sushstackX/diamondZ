import {
  Component,
  OnInit,
  ElementRef,
  ViewChildren,
  QueryList,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  LucideAngularModule,
  ShieldCheck,
  Sparkles,
  Sun,
  Droplets,
  Gem,
  Target,
  Cpu,
  Award,
  LucideIconData
} from 'lucide-angular';

import { BenefitService } from '../../services/benefit.service';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './benefits.html',
  styleUrls: ['./benefits.css']
})
export class Benefits implements OnInit {

  benefits: any[] = [];

  iconMap: Record<string, LucideIconData> = {
    ShieldCheck,
    Sparkles,
    Sun,
    Droplets,
    Gem,
    Target,
    Cpu,
    Award
  };

  @ViewChildren('benefitCard', { read: ElementRef })
  cards!: QueryList<ElementRef>;

  constructor(
    private benefitService: BenefitService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getBenefits();
  }

  getBenefits(): void {

    this.benefitService.getAll().subscribe({

      next: (response: any) => {

        const items = Array.isArray(response)
          ? response
          : response?.data ?? response?.items ?? response?.benefits ?? [];

        this.benefits = (items as any[]).map((benefit: any) => ({
          ...benefit,
          title: benefit.title ?? benefit.name ?? benefit.label ?? benefit.heading ?? benefit.text ?? 'Benefit',
          description: benefit.description ?? benefit.summary ?? '',
          icon: this.iconMap[benefit.icon] || ShieldCheck
        }));

        // IMPORTANT: wait for DOM render
        this.cdr.detectChanges();

        setTimeout(() => {
          this.initObserver();
        });

      },

      error: (error) => {
        console.error('Error fetching benefits:', error);
      }

    });

  }

  initObserver(): void {

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }

        });

      },
      {
        threshold: 0.2
      }
    );

    this.cards.forEach((card) => {
      observer.observe(card.nativeElement);
    });

  }

}