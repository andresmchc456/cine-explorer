// movie-card.component.ts
// Componente que muestra una tarjeta con la información de una película
import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../../core/models';
import { TruncatePipe, TmdbImagePipe, StarsPipe } from '../../pipes';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [TruncatePipe, TmdbImagePipe, StarsPipe],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCardComponent {
  private router = inject(Router);

  // Datos de la película recibidos desde el componente padre.
  movie = input.required<Movie>();

  // Indica si la película ya está en favoritos.
  esFavorita = input<boolean>(false);

  // Evento que emite la película cuando el usuario hace clic en favorito.
  toggleFavorito = output<Movie>();

  onToggleFavorito(): void {
    this.toggleFavorito.emit(this.movie());
  }

  // Navega a la pantalla de detalle de la película.
  verDetalle(): void {
    const id = this.movie().id;
    this.router.navigate(['/movie', id]);
  }
}




