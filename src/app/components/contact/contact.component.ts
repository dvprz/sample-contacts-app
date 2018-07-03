import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../../services/contacts.model';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	contact: Contact;
	resourceHasLoaded: boolean = false;

	constructor(
		private contactsService: ContactsService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			const contactId = params.contact_id;

			if (contactId) {
				this.contactsService.get<Contact>(contactId).subscribe((contact: Contact) => {
					this.contact = contact
					this.resourceHasLoaded = true;
				})
			}
		})
	}

	back() {
		this.router.navigate(['contacts']);
	}

	edit() {
		this.router.navigate(['contacts', this.contact.id, 'edit'])
	}

}
