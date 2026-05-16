import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';
import { Quote } from './pages/quote/quote';
import { ColoredPpf } from './sections/colored-ppf/colored-ppf';
import { MattePpf } from './sections/matte-ppf/matte-ppf';
import { GlossPpf } from './sections/gloss-ppf/gloss-ppf';


export const routes: Routes = [
  { path: '', component: Home,runGuardsAndResolvers: 'always' },
  { path: 'about', component: About },
    { path: 'services', component: Services },

  // ✅ SINGLE DYNAMIC PAGE FOR ALL PPF TYPES
  { path: 'ppf/:slug', component: GlossPpf },
  { path: 'contact', component: Contact },
  { path: 'quote', component: Quote }
];