import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { title } from 'process';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero implements OnInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef) {}

slides = [
  {
    image: 'assets/images/banner1a.png',
    top: 'STYLE. PROTECTION. PERFORMANCE.',
    title1: 'WRAP',
    white: 'PROTECT',
    title2: 'FINISH',
    subtitle: 'CHANGE THE LOOK PTORECT WHAT MATTERS',
    desc: 'Upgrade your vehicle instantly with premium film.'
  },

  {
    image: 'assets/images/banner2a.png',
    top: 'MATTE FINISH. PREMIUM LOOK.',
    title1: 'MATTE',
    white: 'TIMELESS',
    title2: 'PROTECTION',
    subtitle: 'PREMIUM AUTOMOTIVE FILM',
    desc: 'Matte PPF gives a bold and sophisticated finish.'
  },
    {
    image: 'assets/images/banner3a.png',
    top: 'BOLD COLORS. ULTIMATE PROTECTION.',
    title1: 'COLOUR',
    white: 'PPF',
    title2: '',
    subtitle: 'EXPRESS YOUR STYLE',
    desc: 'Premium Paint Protection Film that changes the look while protecting what matters most.'
  },
  
];

  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.slides.length;

      this.cdr.detectChanges();
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}