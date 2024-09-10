import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchApiDataService } from '../fetch.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const movieTitle = this.route.snapshot.paramMap.get('title');
    if (movieTitle) {
      this.getMovieDetails(movieTitle);
    } else {
      console.error('Movie title is null');
    }
  }

  getMovieDetails(movieTitle: string): void {
    this.fetchApiData.getOneMovie(movieTitle).subscribe((resp: any) => {
      console.log('Movie details response:', resp); // Add this line for debugging
      this.movie = resp;
    });
  }

  goBack(): void {
    this.router.navigate(['/movies']);
  }
}
