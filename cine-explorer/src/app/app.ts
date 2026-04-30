import { Component, signal } from '@angular/core';

// decorador que define el componente
@Component({
  selector: 'app-root',
  // templateUrl es la ruta del archivo html que define la vista del componente
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

// logica de la aplicacion
export class App { 
  protected readonly title = signal('cine-explorer');
  titulo: string = '🎬 Cine explorer'; 
}
