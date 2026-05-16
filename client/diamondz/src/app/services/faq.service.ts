import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private apiUrl = 'http://localhost:5000/api/faqs';
  private faqs$?: Observable<any>;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    if (!this.faqs$) {
      this.faqs$ = this.http.get<any>(this.apiUrl).pipe(
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.faqs$;
  }

  prefetchAll(): Observable<any> {
    return this.getAll();
  }

  getById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}