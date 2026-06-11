// movie-detail.component.ts
// Página de detalle que carga datos reales de la API
import { Component, OnInit, inject,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TmdbService } from '../../core/services/tmdb.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { MovieDetail, Credits } from '../../core/models';
import { UpperCasePipe } from '@angular/common';
import { ReviewForm } from './review-form/review-form';
import { Spinner } from '../../shared/components/spinner/spinner';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, ReviewForm, Spinner],
  templateUrl: './movie-detail.html'
})
export class MovieDetailComponent implements OnInit {
  // Servicios inyectados necesarios para:
  // - route: leer el id de la película desde la URL
  // - tmdbService: consultar detalles y créditos de TMDB
  // - favoritesService: marcar/desmarcar favoritos
  // - cdr: forzar detección de cambios cuando se actualiza el estado manualmente
  private route = inject(ActivatedRoute);
  private tmdbService = inject(TmdbService);
  private favoritesService = inject(FavoritesService);
  private cdr = inject(ChangeDetectorRef);

  // Estado del componente
  // pelicula == null indica que aún no se cargó la data.
  pelicula: MovieDetail | null = null;
  creditos: Credits | null = null;
  cargando: boolean = true;
  error: string = '';

  ngOnInit(): void {
    // Leer el parámetro :id de la URL y cargar los datos.
    const id = +this.route.snapshot.params['id'];
    this.cargarPelicula(id);
    this.cargarCreditos(id);
  }

  // Carga el detalle completo de la película desde TMDB.
  cargarPelicula(id: number): void {
    this.tmdbService.obtenerDetalle(id).subscribe({
      next: (data) => {
        this.pelicula = data;
        this.cargando = false;
        this.cdr.markForCheck();
      },
      error: () => {
        // Mostrar mensaje si falla la carga.
        this.error = 'No se pudo cargar la película';
        this.cargando = false;
        this.cdr.markForCheck();
      }
    });
  }

  // Cargar créditos (reparto) y guardarlos en el estado local.
  // Estos datos se muestran en la sección de reparto de la plantilla.
  cargarCreditos(id: number): void {
    this.tmdbService.obtenerCreditos(id).subscribe({
      next: (data) => this.creditos = data
    });
  }

  // Verificar si la película cargada está en favoritos.
  // Se utiliza para cambiar el texto y la clase del botón.
  get esFavorita(): boolean {
    return this.pelicula ? this.favoritesService.esFavorita(this.pelicula.id) : false;
  }

  // Alterna la película en favoritos cuando el usuario hace clic.
  // Usa el servicio para persistir el estado en localStorage.
  toggleFavorito(): void {
    if (this.pelicula) {
      this.favoritesService.toggle(this.pelicula);
    }
  }
}
