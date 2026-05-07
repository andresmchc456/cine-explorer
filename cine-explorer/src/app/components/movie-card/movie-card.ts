// movie-card.component.ts
// Componente que muestra una tarjeta con la información de una película
import { Component, input, output } from '@angular/core';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCardComponent {
  // Por ahora usamos datos de ejemplo hardcodeados
  // En el próximo capítulo recibiremos los datos del componente padre con @Input

  movie = input.required<Movie>();

  // input<boolean>() con valor por defecto false (no es obligatorio pasarlo)
  esFavorita = input<boolean>(false);


  toggleFavorito = output<Movie>();


  onToggleFavorito(): void {
    this.toggleFavorito.emit(this.movie());
  }
}




