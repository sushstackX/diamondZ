import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PpfService {

  private baseUrl = 'http://localhost:5000/api/ppf-types';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getBySlug(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${slug}`);
  }
}