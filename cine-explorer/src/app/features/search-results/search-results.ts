import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { FavoritesService } from '../../services/favorites.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [MovieCardComponent],
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
    this.route.queryParams.subscribe(params => {
      this.termino = params['q'] || '';
      if (this.termino) {
        this.buscar(this.termino);
      } else {
        this.resultados = [];
      }
    });
  }

  buscar(termino: string): void {
    this.cargando = true;
    this.error = '';

    this.tmdbService.buscar(termino).subscribe({
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

  esFavorita(id: number): boolean {
    return this.favoritesService.esFavorita(id);
  }

  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}
