import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LucideAngularModule,
  Shield,
  ShieldCheck,
  Sparkles,
  Sun,
  Droplets,
  Layers,
  ArrowRight,
  LucideIconData
} from 'lucide-angular';

import { ProcessStepService } from '../../services/process-step.service';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './process.html',
  styleUrl: './process.css',
})
export class Process implements OnInit {

  arrowIcon = ArrowRight;

  steps: any[] = [];

  loading = true;
  error = false;

  iconMap: Record<string, LucideIconData> = {
    Shield,
    ShieldCheck,
    Sparkles,
    Sun,
    Droplets,
    Layers
  };

  constructor(private processStepService: ProcessStepService) {}

  ngOnInit(): void {
    this.getProcessSteps();
  }

  getProcessSteps(): void {

    this.loading = true;
    this.error = false;
    this.steps = [];

    this.processStepService.getAll().subscribe({
      next: (response: any) => {

        const items = response?.data;

        if (!Array.isArray(items)) {
          console.warn('Invalid API response:', response);
          this.loading = false;
          this.error = true;
          return;
        }

        this.steps = items.map((step: any) => ({
          ...step,
          icon: this.iconMap[step.icon] || Shield
        }));

        this.loading = false;
      },

      error: (err) => {
        console.error('API Error:', err);
        this.loading = false;
        this.error = true;
      }
    });
  }
}