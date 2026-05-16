import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Footer } from '../../layout/footer/footer';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [Footer,CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {

  contactForm: FormGroup;

  // ✅ ADD THESE (fix your error)
  successMsg: string = '';
  errorMsg: string = '';

  submittedData: any = null;

  constructor(private fb: FormBuilder) {

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      inquiryType: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submitForm() {

    // ❌ validation fail case
    if (this.contactForm.invalid) {
      this.errorMsg = "Please fill all required fields correctly.";
      this.successMsg = '';
      return;
    }

    // ✅ success case
    this.submittedData = this.contactForm.value;

    console.log("🚗 PPF Inquiry Data:", this.submittedData);

    this.successMsg = "Inquiry submitted successfully!";
    this.errorMsg = '';

    alert("Inquiry submitted successfully!");

    this.contactForm.reset();
  }

  scrollToForm() {
  const el = document.querySelector('#formSection');
  el?.scrollIntoView({ behavior: 'smooth' });
}
}