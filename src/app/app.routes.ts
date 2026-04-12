import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./pages/app-page/app-page').then(m => m.AppPageComponent),
  },
  { path: '**', redirectTo: '' },
];
