import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FetchApiDataService } from '../fetch.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCardModule],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private fetchApiData: FetchApiDataService
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
}
