import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card';
import { FavoritesService } from '../../core/services/favorites.service';
import { Movie } from '../../core/models';

// Página de favoritas. Muestra las películas guardadas como favoritas.
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MovieCardComponent, RouterLink],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss']
})
export class Favorites {
  private favoritesService = inject(FavoritesService);

  // Lista reactiva de favoritas leída desde el servicio.
  get favoritas(): Movie[] {
    return this.favoritesService.obtenerTodas();
  }

  // Quita o agrega una película de favoritas.
  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}
