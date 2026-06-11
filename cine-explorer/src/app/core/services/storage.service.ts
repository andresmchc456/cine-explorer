// storage.service.ts
// Servicio wrapper para localStorage con manejo de errores y tipado genérico
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  // Obtener un valor de localStorage con tipado genérico.
  // Si no existe o hay un error, devuelve defaultValue.
  get<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  // Guardar un valor en localStorage.
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }

  // Eliminar un valor concreto de localStorage.
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo el localStorage.
  clear(): void {
    localStorage.clear();
  }
}
