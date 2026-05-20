import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Partner {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners.html',
  styleUrls: ['./partners.css']
})
export class Partners {

  partners: Partner[] = [
{
    name: 'Lubrizol',
    logo: 'assets/images/lubrizol.png'
  },
  {
    name: 'BASF',
    logo: 'assets/images/lubrizol.png'
  },
  {
    name: 'Covestro',
    logo: 'assets/images/covestro.png'
  },
  {
    name: 'Ashland',
    logo: 'assets/images/ashland.png'
  }
  ];

}