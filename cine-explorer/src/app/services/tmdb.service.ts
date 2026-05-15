import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Movie, MovieResponse, MovieDetail, Credits, Genre } from '../models/movie';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.tmdbApiKey;

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

  obtenerDetalle(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.apiUrl}/movie/${id}`, {
      params: {
        language: 'es-ES'
      }
    }).pipe(
      catchError((error) => {
        console.error('Error HTTP detalle:', error);
        return throwError(() => new Error(this.mapError(error)));
      })
    );
  }

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

  obtenerCreditos(id: number): Observable<Credits> {
    return this.http.get<Credits>(`${this.apiUrl}/movie/${id}/credits`).pipe(
      catchError((error) => {
        console.error('Error HTTP créditos:', error);
        return throwError(() => new Error(this.mapError(error)));
      })
    );
  }

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

  private mapError(error: any): string {
    if (!error || !error.status) {
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
