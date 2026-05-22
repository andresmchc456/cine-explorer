import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then((m) => m.Home)
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./features/movie-detail/movie-detail')
        .then((m) => m.MovieDetailComponent)
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./features/favorites/favorites')
        .then((m) => m.Favorites)
  },
  { path: '**', redirectTo: '' }
];

