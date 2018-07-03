import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'change-photo',
  templateUrl: './change-photo.component.html',
  styleUrls: ['./change-photo.component.css']
})
export class ChangePhotoComponent {
	hasImage: boolean;

	constructor(
		private dialogRef: MatDialogRef<ChangePhotoComponent>,
		@Inject(MAT_DIALOG_DATA) private data
	) {
		this.hasImage = this.data.hasImage;
	}

	remove() {
		this.dialogRef.close('remove');
	}

	new() {
		this.dialogRef.close('new');
	}

	cancel() {
		this.dialogRef.close(null)
	}

}
