import { Routes } from '@angular/router';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./features/movie-detail/movie-detail')
        .then((m) => m.MovieDetail)
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites')
        .then((m) => m.Favorites)
  },
  { path: '**', redirectTo: '' }
];

