import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {

  resources: any[] = [];

  selectedResource: any = null;

  items: any[] = [];

  selectedItem: any = null;

  editData: any = {};

  jsonFields = [
    'features',
    'warranties',
    'uniqueCharacteristics',
    'gallery'
  ];

  constructor(
    private adminService: AdminService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadResources();
  }

  // =========================
  // LOAD RESOURCES
  // =========================
  loadResources() {

    this.adminService.getResources().subscribe({

      next: (res: any) => {

        this.resources = res || [];

        if (this.resources.length > 0) {
          this.selectResource(this.resources[0].key);
        }

      },

      error: (err) => {
        console.log(err);
      }

    });

  }

  // =========================
  // SELECT RESOURCE
  // =========================
  selectResource(key: string) {

    this.adminService.getSchema(key).subscribe({

      next: (schema: any) => {

        this.selectedResource = schema;

        this.selectedItem = null;

        this.editData = {};

        this.loadItems();

      },

      error: (err) => {
        console.log(err);
      }

    });

  }

  onResourceChange(event: Event) {

    const key = (event.target as HTMLSelectElement).value;

    this.selectResource(key);

  }

  // =========================
  // LOAD ITEMS
  // =========================
  loadItems() {

    if (!this.selectedResource?.endpoint) {
      return;
    }

    this.adminService.getAll(this.selectedResource.endpoint)
      .subscribe({

        next: (res: any) => {

          this.items = res?.data || [];

        },

        error: (err) => {

          console.log(err);

          this.items = [];

        }

      });

  }

  // =========================
  // SELECT ITEM
  // =========================
  selectItem(item: any) {

    this.selectedItem = item;

    this.editData = JSON.parse(JSON.stringify(item));

    this.convertJsonToString();

  }

  // =========================
  // NEW ITEM
  // =========================
  startNew() {

    this.selectedItem = null;

    this.editData = {};

  }

  // =========================
  // JSON CONVERT
  // =========================
  convertJsonToString() {

    this.jsonFields.forEach(key => {

      if (
        this.editData[key] &&
        typeof this.editData[key] !== 'string'
      ) {

        this.editData[key] = JSON.stringify(
          this.editData[key],
          null,
          2
        );

      }

    });

  }

  convertJsonBeforeSave(data: any) {

    const payload = { ...data };

    this.jsonFields.forEach(key => {

      if (
        payload[key] &&
        typeof payload[key] === 'string'
      ) {

        try {

          payload[key] = JSON.parse(payload[key]);

        } catch (e) {

          alert(`Invalid JSON in ${key}`);

          throw e;

        }

      }

    });

    return payload;

  }

  // =========================
  // SAVE
  // =========================
  save() {

    if (!this.selectedResource?.endpoint) {
      return;
    }

    const resource = this.selectedResource.endpoint;

    let payload;

    try {

      payload = this.convertJsonBeforeSave(this.editData);

    } catch {

      return;

    }

    // UPDATE
    if (this.selectedItem?.id) {

      this.adminService.update(
        resource,
        this.selectedItem.id,
        payload
      ).subscribe({

        next: () => {

          alert('Updated successfully');

          this.loadItems();

        },

        error: (err) => {

          console.log(err);

          alert('Update failed');

        }

      });

    }

    // CREATE
    else {

      this.adminService.create(
        resource,
        payload
      ).subscribe({

        next: () => {

          alert('Created successfully');

          this.loadItems();

        },

        error: (err) => {

          console.log(err);

          alert('Create failed');

        }

      });

    }

  }

  // =========================
  // DELETE ITEM
  // =========================
  delete(item: any) {

    if (!item?.id) {
      return;
    }

    if (!confirm('Delete this item?')) {
      return;
    }

    const resource = this.selectedResource.endpoint;

    this.adminService.delete(
      resource,
      item.id
    ).subscribe({

      next: () => {

        alert('Deleted');

        this.loadItems();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // =========================
  // GALLERY UPLOAD
  // =========================
  uploadGallery(event: any) {

    const files = event.target.files;

    if (
      !files.length ||
      !this.selectedItem?.id
    ) {
      return;
    }

    const formData = new FormData();

    for (let file of files) {

      formData.append('images', file);

    }

    this.http.post(
      `http://localhost:5000/api/ppf-pages/${this.selectedItem.id}/gallery`,
      formData
    ).subscribe({

      next: (res: any) => {

        this.loadItems();

        if (res?.data) {

          this.editData.gallery = res.data.gallery;

        }

        alert('Gallery updated');

      },

      error: (err) => {

        console.log(err);

        alert('Upload failed');

      }

    });

  }

  // =========================
  // REMOVE IMAGE
  // =========================
  removeImage(index: number) {

    if (!this.editData.gallery) {
      return;
    }

    this.editData.gallery.splice(index, 1);

  }

  // =========================
  // TABLE COLUMNS
  // =========================
  get columns(): string[] {

    return this.selectedResource?.tableColumns || [];

  }

  // =========================
  // CHECK JSON FIELD
  // =========================
  isJsonField(name: string): boolean {

    return this.jsonFields.includes(name);

  }

}