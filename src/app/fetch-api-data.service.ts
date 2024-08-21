import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'YOUR_HOSTED_API_URL_HERE/';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject the HttpClient module into the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the API call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      // Transform the response data using the map operator
      map((response) => {
        // You can perform transformation here
        // For example, let's assume you want to return just a success message
        return { message: 'User registered successfully!', data: response };
      }),
      // Handle errors using catchError
      catchError(this.handleError)
    );
  }

  // User login
  public userLogin(userCredentials: any): Observable<any> {
    console.log(userCredentials);
    return this.http.post(apiUrl + 'login', userCredentials).pipe(
      // Transform the response data using the map operator
      map((response) => {
        return { message: 'User logged in successfully!', data: response };
      }),
      // Handle errors using catchError
      catchError(this.handleError)
    );
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        map((response) => {
          return { message: 'Movies retrieved successfully!', data: response };
        }),
        catchError(this.handleError)
      );
  }

  // Get one movie
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        map((response) => {
          return { message: 'Movie retrieved successfully!', data: response };
        }),
        catchError(this.handleError)
      );
  }

  // Get director
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/' + directorName, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        map((response) => {
          return {
            message: 'Director retrieved successfully!',
            data: response,
          };
        }),
        catchError(this.handleError)
      );
  }

  // Get genre
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        map((response) => {
          return { message: 'Genre retrieved successfully!', data: response };
        }),
        catchError(this.handleError)
      );
  }

  // Get user
  public getUser(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        map((response) => {
          return {
            message: 'User info retrieved successfully!',
            data: response,
          };
        }),
        catchError(this.handleError)
      );
  }

  // Add a movie to favoirte movies list
  public addFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .post(
        apiUrl + 'users/' + username + '/movies/' + movieId,
        {},
        {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        }
      )
      .pipe(
        map((response) => {
          return {
            message: 'Movie added to favorites successfully!',
            data: response,
          };
        }),
        catchError(this.handleError)
      );
  }

  // Edit users
  public editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + username, updatedUser, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        map((response) => {
          return { message: 'User updated successfully!', data: response };
        }),
        catchError(this.handleError)
      );
  }

  // Delete user
  public deleteUser(): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        map((response) => {
          return { message: 'User deleted successfully!', data: response };
        }),
        catchError(this.handleError)
      );
  }

  // Delete a movie from the favorite movies
  public deleteFavoriteMovie(movieId: string): Observable<any> {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(
        map((response) => {
          return {
            message: 'Movie removed from favorites successfully!',
            data: response,
          };
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
