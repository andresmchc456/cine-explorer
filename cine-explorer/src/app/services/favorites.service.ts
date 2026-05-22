import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favoritasSubject = new BehaviorSubject<Movie[]>([]);

  
  favoritas$: Observable<Movie[]> = this.favoritasSubject.asObservable();

  cantidad$: Observable<number> = this.favoritas$.pipe(
    map(favs => favs.length)
  );

  agregar(movie: Movie): void {
    const actuales = this.favoritasSubject.value;
    if (!actuales.find(m => m.id === movie.id)) {
      
      this.favoritasSubject.next([...actuales, movie]);
    }
  }

  eliminar(id: number): void {
    const nuevas = this.favoritasSubject.value.filter(m => m.id !== id);
    this.favoritasSubject.next(nuevas);
  }

  esFavorita(id: number): boolean {
    return this.favoritasSubject.value.some(m => m.id === id);
  }

  toggle(movie: Movie): void {
    if (this.esFavorita(movie.id)) {
      this.eliminar(movie.id);
    } else {
      this.agregar(movie);
    }
  }

  obtenerTodas(): Movie[] {
    return this.favoritasSubject.value;
  }

  obtenerCantidad(): number {
    return this.favoritasSubject.value.length;
  }
}