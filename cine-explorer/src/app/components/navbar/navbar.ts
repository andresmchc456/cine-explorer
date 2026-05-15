import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  private favoritesService = inject(FavoritesService);
  private router = inject(Router);

  termino = '';

  get cantidadFavoritas(): number {
    return this.favoritesService.obtenerCantidad();
  }

  buscar(): void {
    const query = this.termino.trim();
    if (!query) {
      return;
    }
    this.router.navigate(['/search'], {
      queryParams: { q: query }
    });
  }
}
