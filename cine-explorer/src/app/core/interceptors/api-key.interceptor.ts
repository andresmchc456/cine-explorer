import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_KEY = environment.tmdbApiKey;

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('api.themoviedb.org')) {
    if (!API_KEY) {
      console.warn('TMDB API key no configurada en src/environments/environment.ts');
      return next(req);
    }

    const clonedReq = req.clone({
      setParams: {
        api_key: API_KEY
      }
    });
    return next(clonedReq);
  }

  return next(req);
};
