import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.scss']
})
export class MovieDetail implements OnInit {
  private route = inject(ActivatedRoute);
  movieId = 0;

  ngOnInit(): void {
    this.movieId = +this.route.snapshot.params['id'];
    console.log('ID de la película:', this.movieId);
  }
}
