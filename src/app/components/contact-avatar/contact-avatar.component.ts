import { Component, Input } from '@angular/core';

@Component({
  selector: 'contact-avatar',
  templateUrl: './contact-avatar.component.html',
  styleUrls: ['./contact-avatar.component.css']
})
export class ContactAvatarComponent {
	@Input() letter: string;

	@Input() avatar: string;
}
