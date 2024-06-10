import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'music',
    loadComponent: () =>
      import('./music/music.component').then((m) => m.MusicComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
