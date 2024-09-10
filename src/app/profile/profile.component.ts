import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class ProfileComponent implements OnInit {
  userData = { Username: '', Email: '', Birthday: '' };
  newUsername = ''; // Property to store the new username

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.userData.Username = user.username || '';
      this.userData.Email = user.email || '';
      this.userData.Birthday = user.birthday || '';
    }
  }

  updateUsername(): void {
    if (!this.newUsername || !/^[a-zA-Z0-9]+$/.test(this.newUsername)) {
      this.snackBar.open(
        'Invalid username. It must be alphanumeric and at least 5 characters long.',
        'OK',
        {
          duration: 3000,
        }
      );
      return;
    }

    this.fetchApiData.updateUser({ newUsername: this.newUsername }).subscribe(
      (result) => {
        localStorage.setItem('user', JSON.stringify(result.user));
        this.userData.Username = this.newUsername; // Update the local username display
        this.snackBar.open('Username updated successfully!', 'OK', {
          duration: 2000,
        });
        this.newUsername = ''; // Reset the newUsername property
      },
      (error) => {
        this.snackBar.open(
          'Failed to update username. Please try again.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }

  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(
      () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.snackBar.open('User deleted successfully!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['/welcome']);
      },
      (error) => {
        this.snackBar.open(
          'Failed to delete account. Please try again.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
