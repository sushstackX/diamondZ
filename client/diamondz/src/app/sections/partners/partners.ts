import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ShieldCheck,
  Link2,
  BadgeCheck,
  FlaskConical,
  Globe,
  Landmark,
  LucideAngularModule
} from 'lucide-angular';

interface Partner {
  name: string;
  logo: string;
  country: string;
  flag: string;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule
  ],
  templateUrl: './partners.html',
  styleUrls: ['./partners.css']
})

export class Partners {

  readonly ShieldCheck = ShieldCheck;
  readonly Link2 = Link2;
  readonly BadgeCheck = BadgeCheck;
  readonly FlaskConical = FlaskConical;
  readonly Globe = Globe;
  readonly Landmark = Landmark;

  partners: Partner[] = [

    {
      name: 'BASF',
      logo: 'assets/images/basf.png',
      country: 'Germany',
      flag: 'assets/images/germany.png'
    },

    {
      name: 'Lubrizol',
      logo: 'assets/images/lubrizol.png',
      country: 'USA',
      flag: 'assets/images/usa.png'
    },

    {
      name: 'Ashland',
      logo: 'assets/images/ashland.png',
      country: 'USA',
      flag: 'assets/images/usa.png'
    },

    {
      name: 'Covestro',
      logo: 'assets/images/covestro.png',
      country: 'Germany',
      flag: 'assets/images/germany.png'
    }

  ];

}