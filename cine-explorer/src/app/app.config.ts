import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withInterceptors,
  withFetch
} from '@angular/common/http';

import { routes } from './app.routes';

import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';

import { apiKeyInterceptor } from './core/interceptors/api-key.interceptor';

// Configuración global de la aplicación.
// Aquí se registran los providers que estarán disponibles para todo el app.
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    // Router basado en las rutas definidas en app.routes.ts
    provideRouter(routes),

    // HTTP client con soporte para fetch y un interceptor de API key
    provideHttpClient(
      withFetch(),
      withInterceptors([apiKeyInterceptor])
    ),

    // Hidratación del cliente para SSR, reenvía eventos ocurridos durante el render del servidor.
    provideClientHydration(withEventReplay())
  ]
};
