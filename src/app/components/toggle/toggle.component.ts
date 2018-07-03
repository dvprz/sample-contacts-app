import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {
	opened: boolean = false;

	@Output() toggled: EventEmitter<any> = new EventEmitter()

	click() {
		this.opened = !this.opened
		this.toggled.emit(this.opened)
	}
}
