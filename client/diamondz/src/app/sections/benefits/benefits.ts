import { Component, OnInit } from '@angular/core';
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

  constructor(
    private benefitService: BenefitService
  ) {}

  ngOnInit(): void {
    this.getBenefits();
  }

  getBenefits(): void {

    this.benefitService.getAll().subscribe({

      next: (response: any) => {

        // Support multiple API shapes:
        // - array: [ { ... }, ... ]
        // - wrapped: { data: [ { ... }, ... ] }
        // - named payload: { benefits: [ { ... }, ... ] }
        const items = Array.isArray(response)
          ? response
          : response?.data ?? response?.items ?? response?.benefits ?? [];

        this.benefits = (items as any[]).map((benefit: any) => ({
          ...benefit,
          title: benefit.title ?? benefit.name ?? benefit.label ?? benefit.heading ?? benefit.text ?? 'Benefit',
          description: benefit.description ?? benefit.summary ?? '',
          icon: this.iconMap[benefit.icon] || ShieldCheck
        }));

      },

      error: (error) => {
        console.error(
          'Error fetching benefits:',
          error
        );
      }

    });

  }
}