import {
  HttpEvent,
  HttpRequest,
  HttpEventType,
  HttpHandlerFn
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, shareReplay, tap } from 'rxjs/operators';

const cache = new Map<string, Observable<HttpEvent<any>>>();

export function httpCacheInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  if (req.method !== 'GET' || req.headers.has('x-cache-bypass')) {
    return next(req);
  }

  const cacheKey = req.urlWithParams;
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse) {
    return cachedResponse;
  }

  const request$ = next(req).pipe(
    filter(event => event.type === HttpEventType.Response),
    tap({
      error: () => cache.delete(cacheKey)
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  cache.set(cacheKey, request$);

  return request$;
}
