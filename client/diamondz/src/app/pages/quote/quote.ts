import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import Swal from 'sweetalert2';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';


import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './quote.html',
  styleUrl: './quote.css',
})

export class Quote {

  quoteForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {

    this.quoteForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      company: ['', Validators.required],
      enquiryType: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submitQuote() {

    if (this.quoteForm.invalid) {

      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill all required fields correctly.'
      });

      return;
    }

    this.isSubmitting = true;
    this.contactService
      .submitInquiry(this.quoteForm.value)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Quote Request Submitted',
            text: 'We will contact you shortly.',
            showConfirmButton: false,
            timer: 2500
          });

          this.quoteForm.reset();
          this.isSubmitting = false;
        },

        error: () => {

          Swal.fire({
            icon: 'error',
            title: 'Submission Failed',
            text: 'Please try again later.'
          });

          this.isSubmitting = false;
        }
      });
  }
}