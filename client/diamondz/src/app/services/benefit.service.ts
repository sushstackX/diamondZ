import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BenefitService {

  private apiUrl = `${environment.apiUrl}/api/benefits`;
  private benefits$?: Observable<any>;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    if (!this.benefits$) {
      this.benefits$ = this.http.get<any>(this.apiUrl).pipe(
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.benefits$;
  }

  prefetchAll(): Observable<any> {
    return this.getAll();
  }

  getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
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