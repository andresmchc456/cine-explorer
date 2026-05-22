import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card';
import { TmdbService } from '../../services/tmdb.service';
import { FavoritesService } from '../../services/favorites.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieCardComponent],
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

  esFavorita(id: number): boolean {
    return this.favoritesService.esFavorita(id);
  }

  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}
