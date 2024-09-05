import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

export const routes: Routes = [
  { path: 'movies', component: MovieCardComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];

console.log('Routes configured:', routes);
