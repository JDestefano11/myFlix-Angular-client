import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  favoriteMovies: Set<string> = new Set();

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'];
      if (searchTerm) {
        this.filterMovies(searchTerm);
      } else {
        this.filteredMovies = this.movies;
      }
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filteredMovies = resp;
    });
  }

  filterMovies(searchTerm: string): void {
    this.filteredMovies = this.movies.filter((movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  addToFavorites(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe(
      () => {
        this.favoriteMovies.add(movieId);
        this.snackBar.open('Movie added to favorites', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open(error, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.has(movieId);
  }
}
