

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LucideAngularModule,
  ShieldCheck,
  Sparkles,
  Sun,
  Droplets,
  Layers,
  Shield,
  Eye,
  Zap
} from 'lucide-angular';

@Component({
  selector: 'app-ppf-info-visual',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './ppf-info-visual.html',
  styleUrls: ['./ppf-info-visual.css']
})
export class PpfInfoVisual {

  ppfPoints = [
    { icon: Layers, title: 'Invisible Protection Layer' },
    { icon: ShieldCheck, title: 'Protects Paint Surface' },
    { icon: Sparkles, title: 'Self-Healing Technology' },
    { icon: Sun, title: 'UV Protection' },
    { icon: Droplets, title: 'Water Repellent' },
    { icon: Shield, title: 'Impact Resistant' },
    { icon: Eye, title: 'Maintains Original Look' },
    { icon: Zap, title: 'Long Lasting Performance' }
  ];
}