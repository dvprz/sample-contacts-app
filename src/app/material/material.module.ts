import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
	MatProgressSpinnerModule,
	MatDialogModule,
	MatSnackBarModule,
	MatDividerModule,
	MatCardModule,
	MatToolbarModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatSelectModule,
	MatInputModule,
	MatButtonModule,
	MatMenuModule,
	MatIconModule,
	MatListModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
	BrowserAnimationsModule,
	MatProgressSpinnerModule,
	MatDialogModule,
	MatSnackBarModule,
	MatDividerModule,
	MatCardModule,
	MatToolbarModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatSelectModule,
	MatInputModule,
	MatButtonModule,
	MatMenuModule,
	MatIconModule,
	MatListModule
  ],
  exports: [
	  MatProgressSpinnerModule,
	  MatDialogModule,
	  MatSnackBarModule,
	  MatDividerModule,
	  MatCardModule,
	  MatToolbarModule,
	  MatExpansionModule,
	  MatFormFieldModule,
	  MatSelectModule,
	  MatInputModule,
	  MatButtonModule,
	  MatMenuModule,
	  MatIconModule,
	  MatListModule
  ]
})
export class MaterialModule { }
