import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, NgIf, NgFor],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isServicesOpen = false;

  services = [
    { name: 'Gloss PPF', route: '/services/gloss-ppf' },
    { name: 'Matte PPF', route: '/services/matte-ppf' },
    { name: 'Colored PPF', route: '/services/colored-ppf' },
  ];

  toggleServices() {
    this.isServicesOpen = !this.isServicesOpen;
  }

  closeDropdown() {
    this.isServicesOpen = false;
  }
}