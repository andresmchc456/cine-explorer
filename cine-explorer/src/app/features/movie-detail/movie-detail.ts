// movie-detail.component.ts
// Página de detalle que carga datos reales de la API
import { Component, OnInit, inject,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { FavoritesService } from '../../services/favorites.service';
import { MovieDetail, Credits } from '../../models/movie';
import { UpperCasePipe } from '@angular/common';
import { ReviewForm } from './review-form/review-form';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, ReviewForm],
  templateUrl: './movie-detail.html'
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  private favoritesService = inject(FavoritesService);
  private cdr = inject(ChangeDetectorRef);

  // Estado del componente
  pelicula: MovieDetail | null = null;  // null mientras carga
  creditos: Credits | null = null;
  cargando: boolean = true;
  error: string = '';

  ngOnInit(): void {
    // Leer el parámetro :id de la URL
    const id = +this.route.snapshot.params['id'];
    this.cargarPelicula(id);
    this.cargarCreditos(id);
  }

  // Cargar detalle de la película
  cargarPelicula(id: number): void {
    this.tmdbService.obtenerDetalle(id).subscribe({
      next: (data) => {
        this.pelicula = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudo cargar la película';
        this.cargando = false;
       this.cdr.markForCheck();
      }
    });
  }

  // Cargar créditos (reparto)
  cargarCreditos(id: number): void {
    this.tmdbService.obtenerCreditos(id).subscribe({
      next: (data) => this.creditos = data
    });
  }

  // Verificar si es favorita
  get esFavorita(): boolean {
    return this.pelicula ? this.favoritesService.esFavorita(this.pelicula.id) : false;
  }

  // Alternar favorito
  toggleFavorito(): void {
    if (this.pelicula) {
      this.favoritesService.toggle(this.pelicula);
    }
  }
}