import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';
import { Quote } from './pages/quote/quote';

import { PpfDetails } from './sections/ppf-details/ppf-details';
import { PpfDetailsResolver } from './sections/ppf-details/ppf-details.resolver';


export const routes: Routes = [
  { path: '', component: Home,runGuardsAndResolvers: 'always' },
  { path: 'about', component: About },
 {
    path: 'services',
    component: Services,

    children: [

      {
        path: ':slug',
        component: PpfDetails,
        resolve: {
          pageData: PpfDetailsResolver
        },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
      },

      {
        path: '',
        redirectTo: 'gloss-ppf',
        pathMatch: 'full'
      }

    ]
  },
  { path: 'contact', component: Contact },
  { path: 'quote', component: Quote }
];