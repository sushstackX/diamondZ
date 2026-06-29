import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  OnInit
} from '@angular/core';

import Swal from 'sweetalert2';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Footer } from '../../layout/footer/footer';
import { ContactService } from '../../services/contact.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    Footer,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {

  contactForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  submittedData: any = null;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: object
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

      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    // SEO
    this.seoService.updateSeo(
      'Contact Diamondz PPF | Paint Protection Film Bangalore',
      'Contact Diamondz PPF for Gloss PPF, Matte PPF, Colored PPF and premium paint protection solutions in Bangalore.',
      'Contact Diamondz PPF, PPF Bangalore, Paint Protection Film Bangalore, Gloss PPF, Matte PPF, Colored PPF'
    );

    // Schema
    this.seoService.addSchema(
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Diamondz PPF",
        "url": "https://diamondzppf.com/contact"
      },
      'contact-schema'
    );

    if (isPlatformBrowser(this.platformId)) {

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      });
    }
  }

  submitForm() {

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

    this.contactService
      .submitInquiry(this.contactForm.value)
      .subscribe({

        next: (res: any) => {

          console.log(
            ' Enquiry Submitted:',
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

          this.isSubmitting = false;

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

    const el = document.querySelector('#formSection');

    el?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}