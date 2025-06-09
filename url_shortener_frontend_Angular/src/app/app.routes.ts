// src/app/app.routes.ts
import { Route } from '@angular/router';
import { ShortenComponent } from './shorten/shorten.component';

export const routes: Route[] = [
  {
    path: '',
    component: ShortenComponent
  }
];
