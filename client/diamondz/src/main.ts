import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { APP_INITIALIZER } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { forkJoin, firstValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { httpCacheInterceptor } from './app/http-cache.interceptor';
import { FaqService } from './app/services/faq.service';
import { ProcessStepService } from './app/services/process-step.service';
import { BenefitService } from './app/services/benefit.service';
import { PpfService } from './app/services/ppf.service';

function preloadApis(
  faqService: FaqService,
  processStepService: ProcessStepService,
  benefitService: BenefitService,
  ppfService: PpfService
) {
  return () => firstValueFrom(
    forkJoin([
      faqService.prefetchAll().pipe(catchError(() => of(null))),
      processStepService.prefetchAll().pipe(catchError(() => of(null))),
      benefitService.prefetchAll().pipe(catchError(() => of(null))),
      ppfService.prefetchSlugs(['gloss-ppf', 'matte-ppf', 'colored-ppf']).pipe(catchError(() => of(null)))
    ])
  );
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([httpCacheInterceptor])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: preloadApis,
      deps: [FaqService, ProcessStepService, BenefitService, PpfService],
      multi: true,
    },
  ]
});