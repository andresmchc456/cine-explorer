import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { Movie } from '../models';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private storage = inject(StorageService);
  private readonly KEY = 'cine-explorer-favoritas';

  // Estado reactivo de favoritos inicializado desde localStorage.
  private favoritasSubject = new BehaviorSubject<Movie[]>(
    this.storage.get<Movie[]>(this.KEY, [])
  );

  // Observable público con la lista de favoritas.
  favoritas$: Observable<Movie[]> = this.favoritasSubject.asObservable();

  // Observable que expone la cantidad de favoritos.
  cantidad$: Observable<number> = this.favoritas$.pipe(
    map(favs => favs.length)
  );

  // Agrega una película a favoritos si no existe ya.
  agregar(movie: Movie): void {
    const actuales = this.favoritasSubject.value;
    if (!actuales.find(m => m.id === movie.id)) {
      const nuevas = [...actuales, movie];
      this.favoritasSubject.next(nuevas);
      this.storage.set(this.KEY, nuevas);
    }
  }

  // Elimina una película de favoritos por id.
  eliminar(id: number): void {
    const nuevas = this.favoritasSubject.value.filter(m => m.id !== id);
    this.favoritasSubject.next(nuevas);
    this.storage.set(this.KEY, nuevas);
  }

  // Devuelve si una película ya está marcada como favorita.
  esFavorita(id: number): boolean {
    return this.favoritasSubject.value.some(m => m.id === id);
  }

  // Alterna el estado favorito de una película.
  toggle(movie: Movie): void {
    if (this.esFavorita(movie.id)) {
      this.eliminar(movie.id);
    } else {
      this.agregar(movie);
    }
  }

  // Obtiene todas las películas favoritas sin observable.
  obtenerTodas(): Movie[] {
    return this.favoritasSubject.value;
  }

  // Obtiene el tamaño actual de la lista de favoritas.
  obtenerCantidad(): number {
    return this.favoritasSubject.value.length;
  }
}
