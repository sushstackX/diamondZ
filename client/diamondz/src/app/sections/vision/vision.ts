

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface VisionItem {
  title: string;
  description: string;
}

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vision.html',
  styleUrls: ['./vision.css']
})
export class Vision {

  // ✅ Dummy data (later replace with API response)
  visionData: VisionItem[] = [
    {
      title: 'Our Vision',
      description: 'To become a benchmark in premium paint protection, delivering unmatched quality, innovation, and craftsmanship in every installation.'
    },
    {
      title: 'Our Commitment',
      description: 'We aim to transform every vehicle into a lasting statement of perfection, combining protection, aesthetics, and durability.'
    },
    {
      title: 'Our Approach',
      description: 'Every step from preparation to installation is handled with precision to ensure a flawless finish.'
    },
    {
      title: 'Our Goal',
      description: 'To provide complete peace of mind through advanced protection solutions and premium service standards.'
    }
  ];

  // 🔥 Later (API example)
  // ngOnInit() {
  //   this.api.getVision().subscribe(data => {
  //     this.visionData = data;
  //   });
  // }
}