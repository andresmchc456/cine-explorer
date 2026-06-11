import { Routes } from '@angular/router';

// Definición de rutas principales de la aplicación.
// Cada ruta carga un componente de forma lazy para mejorar el rendimiento.
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

  // Ruta para resultados de búsqueda.
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search-results/search-results')
        .then((m) => m.SearchResults)
  },

  // Cualquier ruta desconocida redirige al home.
  { path: '**', redirectTo: '' }
];
