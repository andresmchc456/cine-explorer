// stars.pipe.ts
// Pipe que convierte una puntuación numérica (0-10) en estrellas visuales
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars',
  standalone: true
})
export class StarsPipe implements PipeTransform {
  transform(value: number, maxStars: number = 5): string {
    const filledStars = Math.round((value / 10) * maxStars);
    const filled = '★'.repeat(filledStars);
    const empty = '☆'.repeat(maxStars - filledStars);
    return filled + empty;
  }
}
