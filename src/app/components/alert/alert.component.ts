import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

	constructor(
		private alertService: AlertService,
		private snackBar: MatSnackBar
	) {
		this.alertService.notify.subscribe(options => {
			this.snackBar.open(options.message, options.action, options.config);
		});
	}
}
