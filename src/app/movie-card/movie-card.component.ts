import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

/**
 * The MovieCardComponent displays a list of movies and allows users to filter, add to favorites, and remove from favorites.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    RouterModule,
  ],
})
export class MovieCardComponent implements OnInit {
  /**
   * List of all movies.
   */
  movies: any[] = [];

  /**
   * List of filtered movies based on the search term.
   */
  filteredMovies: any[] = [];

  /**
   * Set of favorite movie IDs.
   */
  favoriteMovies: Set<string> = new Set();

  /**
   * Constructor for MovieCardComponent.
   * @param fetchApiData - The service for API calls.
   * @param dialog - The MatDialog service for opening dialogs.
   * @param snackBar - The MatSnackBar service for showing notifications.
   * @param route - The ActivatedRoute service for accessing route parameters.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    this.getMovies();
    this.loadFavoriteMovies();
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params['search'];
      if (searchTerm) {
        this.filterMovies(searchTerm);
      } else {
        this.filteredMovies = this.movies;
      }
    });
  }

  /**
   * Fetches all movies from the API.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filteredMovies = resp;
    });
  }

  /**
   * Loads favorite movies from local storage.
   */
  loadFavoriteMovies(): void {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    if (storedFavorites) {
      this.favoriteMovies = new Set(JSON.parse(storedFavorites));
    }
  }

  /**
   * Saves favorite movies to local storage.
   */
  saveFavoriteMovies(): void {
    localStorage.setItem(
      'favoriteMovies',
      JSON.stringify(Array.from(this.favoriteMovies))
    );
  }

  /**
   * Filters movies based on the search term.
   * @param searchTerm - The term to filter movies by.
   */
  filterMovies(searchTerm: string): void {
    this.filteredMovies = this.movies.filter((movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  /**
   * Adds a movie to the favorites list.
   * @param movieId - The ID of the movie to add to favorites.
   */
  addToFavorites(movieId: string): void {
    this.favoriteMovies.add(movieId);
    this.saveFavoriteMovies();
    this.snackBar.open('Movie added to favorites', 'OK', {
      duration: 2000,
    });
  }

  /**
   * Removes a movie from the favorites list.
   * @param movieId - The ID of the movie to remove from favorites.
   */
  removeFromFavorites(movieId: string): void {
    this.favoriteMovies.delete(movieId);
    this.saveFavoriteMovies();
    this.snackBar.open('Movie removed from favorites', 'OK', {
      duration: 2000,
    });
  }

  /**
   * Checks if a movie is in the favorites list.
   * @param movieId - The ID of the movie to check.
   * @returns True if the movie is in the favorites list, false otherwise.
   */
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.has(movieId);
  }

  /**
   * Toggles the favorite status of a movie.
   * @param movieId - The ID of the movie to toggle.
   */
  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.removeFromFavorites(movieId);
    } else {
      this.addToFavorites(movieId);
    }
  }
}
