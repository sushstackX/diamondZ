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

  images = [
    'assets/images/banner1a.png',
    'assets/images/banner2a.png',
    'assets/images/banner3a.png'
  ];

  currentIndex = 0;

  private sub!: Subscription;

  ngOnInit(): void {

    this.sub = interval(1000).subscribe(() => {

      this.currentIndex =
        (this.currentIndex + 1) % this.images.length;

      console.log(this.currentIndex);

    });

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}