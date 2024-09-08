import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    NgIf,
    RouterLink,
    SearchBarComponent,
  ],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isWelcomePage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isWelcomePage = event.url === '/welcome';
        this.isLoggedIn = !!localStorage.getItem('token');
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/welcome']);
  }

  onSearch(searchTerm: string): void {
    // Navigate to movies page with search term
    this.router.navigate(['/movies'], { queryParams: { search: searchTerm } });
  }
}
