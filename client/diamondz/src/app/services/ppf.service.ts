import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PpfService {

  api = 'http://localhost:5000/api/ppf-pages';
  uploadUrl = 'http://localhost:5000/api/uploads';

  private slugCache = new Map<string, Observable<any>>();
  private allPages$?: Observable<any>;

  constructor(
    private http: HttpClient
  ) {}

  getBySlug(slug: string): Observable<any> {
    if (!slug) {
      return this.http.get(this.api).pipe(shareReplay(1));
    }

    if (this.slugCache.has(slug)) {
      return this.slugCache.get(slug)!;
    }

    const request$ = this.http
      .get(`${this.api}/${slug}`)
      .pipe(shareReplay(1));

    this.slugCache.set(slug, request$);

    return request$;
  }

  getAllPages(): Observable<any> {
    if (!this.allPages$) {
      this.allPages$ = this.http
        .get(this.api)
        .pipe(shareReplay(1));
    }
    return this.allPages$;
  }

  updatePage(slug: string, payload: any): Observable<any> {
    return this.http.patch(`${this.api}/${slug}`, payload);
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.uploadUrl, formData);
  }

  prefetchSlugs(slugs: string[]): Observable<any> {
    return forkJoin(
      slugs.map(slug =>
        this.getBySlug(slug).pipe(
          catchError(() => of(null))
        )
      )
    );
  }

  clearCache(): void {
    this.allPages$ = undefined;
    this.slugCache.clear();
  }

  uploadGallery(pageId: string, files: FileList | File[]): Observable<any> {
    const formData = new FormData();
    const fileArray = Array.isArray(files) ? files : Array.from(files);
    fileArray.forEach(file => formData.append('images', file));
    return this.http.post(`${this.api}/${pageId}/gallery`, formData);
  }

}