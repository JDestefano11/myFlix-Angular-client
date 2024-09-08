import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatIconModule],
  template: `
    <mat-form-field appearance="outline">
      <mat-label>Search movies</mat-label>
      <input
        matInput
        type="text"
        [(ngModel)]="searchTerm"
        (ngModelChange)="onSearchChange()"
      />
      <mat-icon matSuffix>search</mat-icon>
    </mat-form-field>
  `,
  styles: [
    `
      mat-form-field {
        width: 250px;
      }
    `,
  ],
})
export class SearchBarComponent {
  searchTerm: string = '';
  @Output() search = new EventEmitter<string>();

  onSearchChange(): void {
    this.search.emit(this.searchTerm);
  }
}
