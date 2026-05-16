import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LucideAngularModule,
  SprayCan,
  Sparkles,
  Scissors,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
} from 'lucide-angular';

@Component({
  selector: 'app-ppf-info-steps',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './ppf-info-steps.html',
  styleUrl: './ppf-info-steps.css',
})



export class PpfInfoSteps {

    arrowIcon = ArrowRight;


  steps = [
    {
      icon: SprayCan,
      title: 'Surface Cleaning',
      desc: 'Vehicle is thoroughly washed and decontaminated.'
    },
    {
      icon: Sparkles,
      title: 'Paint Preparation',
      desc: 'Polishing removes imperfections for smooth finish.'
    },
    {
      icon: Scissors,
      title: 'Film Cutting',
      desc: 'PPF is precision-cut for perfect fit.'
    },
    {
      icon: ShieldCheck,
      title: 'Application',
      desc: 'Film is applied carefully without bubbles.'
    },
    {
      icon: CheckCircle,
      title: 'Final Inspection',
      desc: 'Quality check ensures flawless protection.'
    }
  ];
}