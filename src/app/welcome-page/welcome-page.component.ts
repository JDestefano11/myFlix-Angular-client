import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * The WelcomePageComponent is the entry point of the application.
 * It provides options for user registration and login.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ]
})
export class WelcomePageComponent {
  /**
   * Constructor for WelcomePageComponent.
   * @param dialog - The MatDialog service for opening dialogs.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Opens the user registration dialog.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '400px',
      maxWidth: '90vw',
      panelClass: 'custom-dialog'
    });
  }

  /**
   * Opens the user login dialog.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '400px',
      maxWidth: '90vw',
      panelClass: 'custom-dialog'
    });
  }
}
