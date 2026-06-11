import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, timeout } from 'rxjs';
import { Movie, MovieResponse, MovieDetail, Credits, Genre } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  // Inyectamos HttpClient con la nueva API de Angular standalone.
  private http = inject(HttpClient);
  private apiUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  // Traer películas populares de TMDB.
  obtenerPopulares(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}/movie/popular`, {
      params: {
        language: 'es-ES',
        page: page.toString()
      }
    }).pipe(
      catchError((error) => {
        console.error('Error HTTP populares:', error);
        return throwError(() => new Error(this.mapError(error)));
      })
    );
  }

  // Traer películas mejor valoradas.
  obtenerTopRated(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}/movie/top_rated`, {
      params: {
        language: 'es-ES',
        page: page.toString()
      }
    }).pipe(
      catchError((error) => {
        console.error('Error HTTP top rated:', error);
        return throwError(() => new Error(this.mapError(error)));
      })
    );
  }

  // Obtener detalle completo de una película.
  obtenerDetalle(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.apiUrl}/movie/${id}`, {
      params: {
        language: 'es-ES'
      }
    }).pipe(
      timeout(10000),
      catchError((error) => {
        console.error('Error HTTP detalle:', error);
        return throwError(() => new Error(this.mapError(error)));
      })
    );
  }

  // Buscar películas por texto.
  buscar(query: string, page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.apiUrl}/search/movie`, {
      params: {
        query,
        language: 'es-ES',
        page: page.toString()
      }
    }).pipe(
      catchError((error) => {
        console.error('Error HTTP búsqueda:', error);
        return throwError(() => new Error(this.mapError(error)));
      })
    );
  }

  // Obtener reparto y equipo de la película.
  obtenerCreditos(id: number): Observable<Credits> {
    return this.http.get<Credits>(`${this.apiUrl}/movie/${id}/credits`).pipe(
      timeout(10000),
      catchError((error) => {
        console.error('Error HTTP créditos:', error);
        return throwError(() => new Error(this.mapError(error)));
      })
    );
  }

  // Obtener lista de géneros disponibles en TMDB.
  obtenerGeneros(): Observable<{ genres: Genre[] }> {
    return this.http.get<{ genres: Genre[] }>(`${this.apiUrl}/genre/movie/list`, {
      params: {
        language: 'es-ES'
      }
    }).pipe(
      catchError((error) => {
        console.error('Error HTTP géneros:', error);
        return throwError(() => new Error(this.mapError(error)));
      })
    );
  }

  // Convierte errores HTTP comunes en mensajes legibles.
  private mapError(error: any): string {
    if (!error) {
      return 'Sin conexión a internet';
    }

    if (error.name === 'TimeoutError') {
      return 'La petición tardó demasiado. Intenta de nuevo.';
    }

    if (!error.status) {
      return 'Sin conexión a internet';
    }

    if (error.status === 401) {
      return 'API key inválida';
    }
    if (error.status === 404) {
      return 'Recurso no encontrado';
    }

    return 'Error del servidor';
  }
}
