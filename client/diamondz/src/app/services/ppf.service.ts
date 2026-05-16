import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PpfService {

  api =
    'http://localhost:5000/api/ppf-pages';

  constructor(
    private http: HttpClient
  ) {}

  getBySlug(slug: string) {

    return this.http.get(
      `${this.api}/${slug}`
    );

  }

}