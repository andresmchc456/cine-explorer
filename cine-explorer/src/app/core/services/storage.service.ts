// storage.service.ts
// Servicio wrapper para localStorage con manejo de errores y tipado genérico
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  // Obtener un valor de localStorage con tipado genérico
  get<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  // Guardar un valor en localStorage
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }

  // Eliminar un valor
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo localStorage
  clear(): void {
    localStorage.clear();
  }
}
