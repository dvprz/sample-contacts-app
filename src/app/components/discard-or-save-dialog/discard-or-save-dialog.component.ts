import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'discard-or-save-dialog',
  templateUrl: './discard-or-save-dialog.component.html',
  styleUrls: ['./discard-or-save-dialog.component.css']
})
export class DiscardOrSaveDialog {

	constructor(private dialogRef: MatDialogRef<DiscardOrSaveDialog>) {}

	discard() {
		this.dialogRef.close(false);
	}

	save() {
		this.dialogRef.close(true);
	}
}
