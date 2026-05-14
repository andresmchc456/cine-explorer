import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieCardComponent } from '../../components/movie-card/movie-card';
import { FavoritesService } from '../../services/favorites.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MovieCardComponent, RouterLink],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.scss']
})
export class Favorites {
  private favoritesService = inject(FavoritesService);

  get favoritas(): Movie[] {
    return this.favoritesService.obtenerTodas();
  }

  toggleFavorito(movie: Movie): void {
    this.favoritesService.toggle(movie);
  }
}
