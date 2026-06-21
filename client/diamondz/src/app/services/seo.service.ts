import {
  Injectable,
  Renderer2,
  RendererFactory2,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  updateSeo(
    title: string,
    description: string,
    keywords: string = ''
  ) {
    this.titleService.setTitle(title);
    this.metaService.updateTag({
      name: 'description',
      content: description
    });

    if (keywords) {
      this.metaService.updateTag({
        name: 'keywords',
        content: keywords
      });
    }

    this.metaService.updateTag({
      property: 'og:title',
      content: title
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: description
    });

    this.metaService.updateTag({
      property: 'og:type',
      content: 'website'
    });
  }

  addSchema(schema: any, schemaId: string) {

    // SSR protection
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const existing = document.querySelector(
      `[data-schema="${schemaId}"]`
    );

    if (existing) {
      existing.remove();
    }

    const script = this.renderer.createElement('script');

    script.type = 'application/ld+json';
    script.setAttribute('data-schema', schemaId);
    script.text = JSON.stringify(schema);

    this.renderer.appendChild(
      document.head,
      script
    );
  }
}