import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../services/contacts.model';

@Component({
  selector: 'contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
	contacts: Contact[];
	resourcesHaveLoaded: boolean = false;

	constructor(
		private contactsService: ContactsService,
		private router: Router
	) {}

	ngOnInit() {
		this.contactsService.query<Array<Contact>>({
			sort: 'first_name',
			order: 'asc'
		}).subscribe(contacts => {
			if (contacts && contacts.length !== 0) {
				this.contacts = contacts;
				this.resourcesHaveLoaded = true;
			}
		})
	}

	add() {
		this.router.navigateByUrl('/contacts/new')
	}
}
