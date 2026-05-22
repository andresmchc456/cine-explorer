import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  private favoritesService = inject(FavoritesService);
  private router = inject(Router);

  searchControl = new FormControl('');

  get cantidadFavoritas(): number {
    return this.favoritesService.obtenerCantidad();
  }

  constructor() {
    
    this.searchControl.valueChanges.pipe(
      
      debounceTime(300),
    
      distinctUntilChanged(),
      
      filter(term => !!term && term.length >= 2)
    ).subscribe(term => {
      
      this.router.navigate(['/search'], { queryParams: { q: term } });
    });
  }
}