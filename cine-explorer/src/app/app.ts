import { Component } from '@angular/core';
import { MovieCardComponent } from './components/movie-card/movie-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  titulo: string = 'CineExplorer';
}
