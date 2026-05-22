import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { forkJoin, firstValueFrom, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { httpCacheInterceptor } from './http-cache.interceptor';
import { FaqService } from './services/faq.service';
import { ProcessStepService } from './services/process-step.service';
import { BenefitService } from './services/benefit.service';
import { PpfService } from './services/ppf.service';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),

    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),

    provideHttpClient(
      withFetch(),
      withInterceptors([httpCacheInterceptor])
    ),

    provideClientHydration(withEventReplay()),

    {
      provide: APP_INITIALIZER,
      useFactory: (
        faqService: FaqService,
        processStepService: ProcessStepService,
        benefitService: BenefitService,
        ppfService: PpfService
      ) => {
        return () =>
          firstValueFrom(
            forkJoin([
              faqService.prefetchAll().pipe(catchError(() => of(null))),
              processStepService.prefetchAll().pipe(catchError(() => of(null))),
              benefitService.prefetchAll().pipe(catchError(() => of(null))),
              ppfService.prefetchSlugs([
                'gloss-ppf',
                'matte-ppf',
                'colored-ppf'
              ]).pipe(catchError(() => of(null)))
            ])
          );
      },
      deps: [
        FaqService,
        ProcessStepService,
        BenefitService,
        PpfService
      ],
      multi: true,
    }
  ]
};
