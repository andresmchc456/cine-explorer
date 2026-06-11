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
  // Inyecta el servicio de favoritas para leer/actualizar el estado.
  private favoritesService = inject(FavoritesService);

  // Lista de películas favoritas almacenada localmente.
  get favoritas(): Movie[] {
    return this.favoritesService.obtenerTodas();
  }

  // Se ejecuta cuando el usuario hace clic en el corazón de una tarjeta.
  // Si ya es favorita, se elimina; si no, se agrega.
  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}
