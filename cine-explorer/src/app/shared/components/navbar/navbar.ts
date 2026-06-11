import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { FavoritesService } from '../../../core/services/favorites.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  private favoritesService = inject(FavoritesService);
  private themeService = inject(ThemeService);
  private router = inject(Router);

  // Control del input de búsqueda.
  searchControl = new FormControl('');

  get cantidadFavoritas(): number {
    return this.favoritesService.obtenerCantidad();
  }

  get temaActual(): string {
    return this.themeService.obtenerTema();
  }

  // Cambia el tema entre claro y oscuro.
  toggleTema(): void {
    this.themeService.toggle();
  }

  constructor() {
    // Escuchar cambios en el campo de búsqueda y navegar a /search.
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => !!term && term.length >= 2)
    ).subscribe(term => {
      this.router.navigate(['/search'], { queryParams: { q: term } });
    });
  }
}
