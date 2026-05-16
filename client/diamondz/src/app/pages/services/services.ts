import { NgFor } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Footer } from '../../layout/footer/footer';
import { PpfService } from '../../services/ppf.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,

    NgFor,
    Footer
  ],
  templateUrl: './services.html',
  styleUrls: ['./services.css'],
})
export class Services implements OnInit {

  services: any[] = [];

  constructor(
    private ppfService: PpfService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.ppfService.getAll().subscribe(res => {

      this.services = res.data;

      this.cdr.detectChanges();

    });

  }
}