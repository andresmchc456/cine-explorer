import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card';
import { Spinner } from '../../shared/components/spinner/spinner';
import { TmdbService } from '../../core/services/tmdb.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { Movie } from '../../core/models';

// Página principal que muestra películas populares.
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCardComponent, Spinner],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit {
  private tmdbService = inject(TmdbService);
  private favoritesService = inject(FavoritesService);
  private cdr = inject(ChangeDetectorRef);

  peliculas: Movie[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.cargando = true;
    this.error = '';

    this.tmdbService.obtenerPopulares().subscribe({
      next: (response) => {
        this.peliculas = response.results;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar películas:', err);
        this.error = err?.message || 'No se pudieron cargar las películas. Verifica tu conexión.';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  // Verifica si una película está en favoritos.
  esFavorita(id: number): boolean {
    return this.favoritesService.esFavorita(id);
  }

  // Alterna el estado favorito de una película.
  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}
