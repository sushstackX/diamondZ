import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqService } from '../../services/faq.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrls: ['./faq.css']
})
export class Faq implements OnInit {

  faqs: any[] = [];
  loading = true;
  error = false;

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.getFaqs();
  }

  getFaqs(): void {

    this.loading = true;
    this.error = false;
    this.faqs = [];

    this.faqService.getAll().subscribe({
      next: (response: any) => {

        // console.log('FAQ RESPONSE:', response);

        const items =
          response?.data ??
          response?.faqs ??
          response?.items ??
          [];

        if (!Array.isArray(items)) {
          this.loading = false;
          this.error = true;
          return;
        }

        this.faqs = items.map((faq: any) => ({
          ...faq,
          open: false
        }));

        this.loading = false;
      },

      error: (err) => {
        console.error('FAQ ERROR:', err);
        this.loading = false;
        this.error = true;
      }
    });
  }

  toggleFAQ(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }
}