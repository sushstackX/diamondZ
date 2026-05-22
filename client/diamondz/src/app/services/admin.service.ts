import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private api = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getResources() {
    return this.http.get(`${this.api}/admin/resources`);
  }

  getSchema(key: string) {
    return this.http.get(`${this.api}/admin/schema/${key}`);
  }

  getAll(resource: string) {
    return this.http.get(`${this.api}/admin/crud/${resource}`);
  }

  create(resource: string, data: any) {
    return this.http.post(`${this.api}/admin/crud/${resource}`, data);
  }

  update(resource: string, id: number, data: any) {
    return this.http.put(`${this.api}/admin/crud/${resource}/${id}`, data);
  }

  delete(resource: string, id: number) {
    return this.http.delete(`${this.api}/admin/crud/${resource}/${id}`);
  }
}