import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company.html',
  styleUrls: ['./company.css']
})

export class Company implements OnInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef) {}

  slides = [
    { image: 'assets/images/ppf2.jpg', label: 'Gloss Finish' },
    { image: 'assets/images/ppf3.jpg', label: 'Matte Finish' }
  ];

  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.slides.length;

      this.cdr.detectChanges(); // 🔥 important
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}