import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/person',
    pathMatch: 'full'
  },
  {
    path: 'person',
    loadComponent: () => import('./person/person').then(m => m.PersonComponent)
  }
];
