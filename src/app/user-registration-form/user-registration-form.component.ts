import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
  ],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    private fetchApiData: UserRegistrationService,
    private dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    // Ensure all required fields are filled out before sending request
    if (
      !this.userData.Username ||
      !this.userData.Password ||
      !this.userData.Email
    ) {
      this.snackBar.open('Please fill in all required fields!', 'OK', {
        duration: 3000,
      });
      return;
    }

    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        this.dialogRef.close(); // Close the dialog after successful registration
        this.snackBar.open('Registration successful!', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open('Registration failed. Please try again.', 'OK', {
          duration: 3000,
        });
      }
    );
  }
}
