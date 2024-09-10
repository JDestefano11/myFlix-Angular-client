import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'movies/:title', component: MovieDetailsComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

console.log('Routes configured:', routes);
