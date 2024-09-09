import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

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
    MatIconModule,
    MatMenuModule,
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
}
