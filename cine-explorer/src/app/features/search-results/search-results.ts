import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap, distinctUntilChanged } from 'rxjs';
import { TmdbService } from '../../core/services/tmdb.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card';
import { Spinner } from '../../shared/components/spinner/spinner';
import { Movie } from '../../core/models';

// Página de resultados de búsqueda.
@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [MovieCardComponent, Spinner],
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.scss']
})
export class SearchResults implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  private favoritesService = inject(FavoritesService);

  resultados: Movie[] = [];
  termino = '';
  cargando = false;
  error = '';

  ngOnInit(): void {
    this.route.queryParams.pipe(
      distinctUntilChanged((prev, curr) => prev['q'] === curr['q']),
      tap(params => {
        this.termino = params['q'] || '';
        if (!this.termino) {
          this.cargando = false;
          this.resultados = [];
          this.error = '';
        }
      }),
      filter(params => !!params['q']),
      tap(() => {
        this.cargando = true;
        this.error = '';
      }),
      switchMap(params => this.tmdbService.buscar(params['q']))
    ).subscribe({
      next: (response) => {
        this.resultados = response.results;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error en búsqueda:', err);
        this.error = err?.message || 'No se pudo realizar la búsqueda';
        this.cargando = false;
      }
    });
  }

  // Verifica si una película está marcada como favorita.
  esFavorita(id: number): boolean {
    return this.favoritesService.esFavorita(id);
  }

  // Alterna el estado favorito de una película.
  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}
