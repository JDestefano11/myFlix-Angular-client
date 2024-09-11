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

  // Method to delete the user
  deleteUser() {
    if (confirm('Are you sure you want to delete your account?')) {
      const username = this.userData.Username; // Assuming you have the username stored in userData
      this.fetchApiData.deleteUser(username).subscribe({
        next: (response: any) => {
          alert(response.message);

          this.router.navigate(['/welcome']);
        },
        error: (err: any) => {
          alert('Failed to delete the account. Please try again.');
          console.error('Error deleting user:', err);
        },
      });
    }
  }
}
