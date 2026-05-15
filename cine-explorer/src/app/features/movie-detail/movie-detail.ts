import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { FavoritesService } from '../../services/favorites.service';
import { MovieDetail as MovieDetailModel, Credits } from '../../models/movie';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.scss']
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  private favoritesService = inject(FavoritesService);

  pelicula: MovieDetailModel | null = null;
  creditos: Credits | null = null;
  cargando = true;
  error = '';

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.cargarPelicula(id);
    this.cargarCreditos(id);
  }

  cargarPelicula(id: number): void {
    this.tmdbService.obtenerDetalle(id).subscribe({
      next: (data) => {
        this.pelicula = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la película';
        this.cargando = false;
      }
    });
  }

  cargarCreditos(id: number): void {
    this.tmdbService.obtenerCreditos(id).subscribe({
      next: (data) => (this.creditos = data)
    });
  }

  get esFavorita(): boolean {
    return this.pelicula ? this.favoritesService.esFavorita(this.pelicula.id) : false;
  }

  toggleFavorito(): void {
    if (this.pelicula) {
      this.favoritesService.toggle(this.pelicula);
    }
  }
}
