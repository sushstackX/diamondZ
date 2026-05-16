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
    'assets/images/banner3.png'
  ];

  currentIndex = 0;
  private sub!: Subscription;

  ngOnInit(): void {

    this.sub = interval(5000).subscribe(() => {

      this.currentIndex =
        (this.currentIndex + 1) % this.images.length;

    });

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}