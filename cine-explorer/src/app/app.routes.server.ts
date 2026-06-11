import { RenderMode, ServerRoute } from '@angular/ssr';

// Rutas que deben ser renderizadas en el servidor.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
