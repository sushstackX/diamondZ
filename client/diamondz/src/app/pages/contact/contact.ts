import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import Swal from 'sweetalert2';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Footer } from '../../layout/footer/footer';

import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    Footer,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})

export class Contact {

  contactForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  submittedData: any = null;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {

    this.contactForm = this.fb.group({

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

  submitForm() {

    // VALIDATION
    if (this.contactForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill all required fields correctly.',
        confirmButtonColor: '#111827'
      });

      return;
    }

    this.isSubmitting = true;

    // API CALL
    this.contactService
      .submitInquiry(this.contactForm.value)
      .subscribe({

        next: (res: any) => {

          console.log(
            "🚗 Enquiry Submitted:",
            res
          );

          Swal.fire({

            icon: 'success',
            title: 'Enquiry Submitted',
            text: 'Thank you! Our team will contact you soon.',
            showConfirmButton: false,
            timer: 2500
          });

          this.contactForm.reset();
          this.isSubmitting = false;

        },

        error: (err) => {

          console.log(err);

          Swal.fire({

            icon: 'error',
            title: 'Submission Failed',
            text: 'Something went wrong. Please try again.',
            confirmButtonColor: '#111827'
          });
        }
      });
  }

  scrollToForm() {

    const el =
      document.querySelector('#formSection');

    el?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}