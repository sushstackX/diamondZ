import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PpfService } from '../../services/ppf.service';

@Injectable({
  providedIn: 'root'
})
export class PpfDetailsResolver implements Resolve<any> {
  constructor(private ppfService: PpfService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const slug = route.paramMap.get('slug') || '';
    return this.ppfService.getBySlug(slug).pipe(
      map((response: any) => response?.data),
      catchError(() => of(null))
    );
  }
}
