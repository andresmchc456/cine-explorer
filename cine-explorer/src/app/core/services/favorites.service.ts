import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { Movie } from '../models/movie';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private storage = inject(StorageService);
  private readonly KEY = 'cine-explorer-favoritas';

  private favoritasSubject = new BehaviorSubject<Movie[]>(
    this.storage.get<Movie[]>(this.KEY, [])
  );

  favoritas$: Observable<Movie[]> = this.favoritasSubject.asObservable();

  cantidad$: Observable<number> = this.favoritas$.pipe(
    map(favs => favs.length)
  );

  agregar(movie: Movie): void {
    const actuales = this.favoritasSubject.value;
    if (!actuales.find(m => m.id === movie.id)) {
      const nuevas = [...actuales, movie];
      this.favoritasSubject.next(nuevas);
      this.storage.set(this.KEY, nuevas);
    }
  }

  eliminar(id: number): void {
    const nuevas = this.favoritasSubject.value.filter(m => m.id !== id);
    this.favoritasSubject.next(nuevas);
    this.storage.set(this.KEY, nuevas);
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