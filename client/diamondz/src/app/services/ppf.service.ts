import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PpfService {

  api =
    'http://localhost:5000/api/ppf-pages';

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

  prefetchSlugs(slugs: string[]): Observable<any> {
    return forkJoin(
      slugs.map(slug =>
        this.getBySlug(slug).pipe(
          catchError(() => of(null))
        )
      )
    );
  }

}