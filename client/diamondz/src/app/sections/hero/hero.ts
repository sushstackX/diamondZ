import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero implements OnInit, OnDestroy {

  images: string[] = [
    // 'assets/images/ppf1.jpg',
    // 'assets/images/ppf2.jpg',
    'assets/images/ppf3.jpg'
  ];

  currentIndex = 0;
  private sub!: Subscription;

  ngOnInit() {
    this.sub = interval(4000).subscribe(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.images.length;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}