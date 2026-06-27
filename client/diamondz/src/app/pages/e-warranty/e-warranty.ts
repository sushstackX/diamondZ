import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { WarrantyService } from '../../services/warranty.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-e-warranty',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './e-warranty.html',
  styleUrls: ['./e-warranty.css']
})
export class EWarranty {

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  loading = false;
  errorMessage: string | null = null;

  formErrors: Record<string, string> = {};
  selectedFiles: File[] = [];

  formData = {
    customerName: '',
    mobileNumber: '',
    email: '',
    vehicleBrand: '',
    vehicleModel: '',
    vehicleRegistration: '',
    productType: '',
    installationDate: '',
    installerName: '',
    invoiceNumber: '',
    installationArea: '',
    remarks: ''
  };

  constructor(
    private warrantyService: WarrantyService
  ) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFiles = input.files ? Array.from(input.files) : [];
  }

  submitWarranty(form: NgForm): void {

    this.errorMessage = null;
    this.formErrors = {};

    if (form.invalid) {
      form.control.markAllAsTouched();
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const request = new FormData();

    Object.keys(this.formData).forEach(key => {
      request.append(key, (this.formData as any)[key] ?? '');
    });

    this.selectedFiles.forEach(file => {
      request.append('files', file);
    });

    this.loading = true;

    this.warrantyService.createWarranty(request).subscribe({

      next: (response) => {

        this.loading = false;

        //  SWEET ALERT (1 MINUTE DISPLAY)
      Swal.fire({
        icon: 'success',
        title: 'Warranty Registered',
        text: response?.message || 'Your warranty has been successfully submitted.',
        timer: 30000, // 30 sec max
        timerProgressBar: true,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,

        background: '#0b1220',
        color: '#ffffff',

        iconColor: '#42a5f5',

        customClass: {
          popup: 'swal-glass'
        }
      });

        form.resetForm();
        this.resetForm();
      },

      error: (err) => {

        this.loading = false;

        const apiError = err?.error;

        if (apiError?.errors) {
          apiError.errors.forEach((item: any) => {
            this.formErrors[item.field] = item.message;
          });
        }

        this.errorMessage =
          apiError?.message ||
          'Unable to register warranty. Please try again.';
      }

    });
  }

  resetForm(): void {
    this.formData = {
      customerName: '',
      mobileNumber: '',
      email: '',
      vehicleBrand: '',
      vehicleModel: '',
      vehicleRegistration: '',
      productType: '',
      installationDate: '',
      installerName: '',
      invoiceNumber: '',
      installationArea: '',
      remarks: ''
    };

    this.selectedFiles = [];

    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}