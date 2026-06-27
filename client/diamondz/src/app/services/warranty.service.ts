import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarrantyService {

  // private apiUrl =
  //   'https://api.diamondzppf.com/api/warranty';

      private apiUrl = `${environment.apiUrl}/api/warranty`;
    
  constructor(
    private http: HttpClient
  ) {}

  createWarranty(
    formData: FormData
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      formData
    );
  }

  getWarrantyByMobile(
    mobile: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/mobile/${mobile}`
    );
  }
}