import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Contact } from '../../services/contacts.model';

import { ContactsService } from '../../services/contacts.service';
import { CheckFormGroupAgainstModelService } from '../../services/check-form-group-against-model.service';
import { AlertService } from '../../services/alert.service';
import { AvatarService } from '../../services/avatar.service';

import { ContactNamePipe } from '../../pipes/contact-name.pipe';

import { DiscardOrSaveDialog } from '../discard-or-save-dialog/discard-or-save-dialog.component';
import { ChangePhotoComponent } from '../change-photo/change-photo.component';
import { environment } from '../../../environments/environment'


@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
	contactForm: FormGroup;

	saveChangesDialogRef: MatDialogRef<DiscardOrSaveDialog>;

	changePhotoRef: MatDialogRef<ChangePhotoComponent>;

	showExtraPersonFormFields: boolean = false;

	contact: Contact;

	viewTitle : string = '';

	@ViewChild('avatar') avatarRef: ElementRef;

	avatar_url: string = '';

	labels = [
		'Mobile',
		'Work',
		'Home',
		'Main',
		'Work Fax',
		'Home Fax',
		'Pager',
		'Other'
	];

	constructor(
		private alert: AlertService,
		private avatarService: AvatarService,
		private contactNamePipe: ContactNamePipe,
    	private formBuilder: FormBuilder,
		private checkFormGroup: CheckFormGroupAgainstModelService,
		private contactsService: ContactsService,
		private dialog: MatDialog,
		private location: Location,
		private route: ActivatedRoute,
		private router: Router
	) {
		const path = this.location.path();

		if ( path.includes('edit') ) {
			this.viewTitle = 'Edit contact';
		} else if ( path.includes('new') ) {
			this.viewTitle = 'Create contact';
		} else {
			this.viewTitle = '';
		}

		this.contactForm = this.formBuilder.group({
			id: [''],
			name_prefix: [''],
			first_name: ['', Validators.required],
			last_name: [''],
			name_suffix: [''],
			company: [''],
			email: [''],
			phone: [''],
			phone_label: [''],
            avatar_url: ['']
		})
	}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			const contactId = params.contact_id;

			if (contactId) {
				this.contactsService.get<Contact>(contactId).subscribe((contact: Contact) => {
					this.contactForm.setValue(contact);
					this.contact = contact;
					this.avatar_url = contact.avatar_url;
				})
			} else {
				this.contact = new Contact()
				this.contact.phone_label = 'mobile'
				this.contactForm.setValue(Object.assign({}, {id: ''}, this.contact))
			}
		})
	}

	// phoneLabelChanges() {
	// 	this.contactForm.get('phone_label').valueChanges.subscribe(phoneLabel => {
	// 		this.phoneFormField.nativeElement.focus()
	// 		// this.phoneFormField._control.focused = true
	// 	})
	// }

	toggleExtraPersonFormFields(value: boolean) {
		this.showExtraPersonFormFields = value
	}

	save() {
        if (this.contactForm.invalid) return false

		if (this.contact.id) {
			this.contactsService.update<Contact>(this.contact.id, this.contactForm.value).subscribe((response: Contact) => {
				this.contact = response;
				this.alertAndRedirect('saved', ['contacts', response.id])
			})
		} else {
			this.contactsService.create<Contact>(this.contactForm.value).subscribe((response: Contact) => {
				this.contact = response;
				this.alertAndRedirect('saved', ['contacts', response.id])
			})
		}
	}

	delete() {
		this.contactsService.delete<Contact>(this.contact.id).subscribe((response: Contact) => {
			this.alertAndRedirect('deleted', ['contacts'])
		})
	}

	close() {
		if (this.checkFormGroup.forChanges(this.contactForm, this.contact)) {
			this.saveChangesDialogRef = this.dialog.open(DiscardOrSaveDialog, {
                minWidth: '80vw',
				autoFocus: false
            })
			this.saveChangesDialogRef.afterClosed().subscribe(shouldSave => {
				if (shouldSave) {
					return this.save()
				} else {
					return this.navigate(['contacts'])
				}
			});
		} else {
			this.navigate(['contacts'])
		}
	}

	editAvatar() {
		this.changePhotoRef = this.dialog.open(ChangePhotoComponent, {
            minWidth: '80vw',
			autoFocus: false,
			data: {
				hasImage: !this.avatar_url ? true : false
			}
        })

		this.changePhotoRef.afterClosed().subscribe(action => {
			if (action === 'remove') {
				this.contactForm.patchValue({ avatar_url: '' })
				this.avatar_url = '';
				return this.alert.notify.next({
					message: `${this.contactNamePipe.transform(this.contact)} avatar updated`,
					action: null,
					config: {
						duration: 1000
					}
				})
			}

			if (action === 'new') {
				const newAvatar = this.avatarService.fetch()
				this.contactForm.patchValue({ avatar_url: newAvatar })
				this.avatar_url = newAvatar
				return this.alert.notify.next({
					message: `${this.contactNamePipe.transform(this.contact)} avatar updated`,
					action: null,
					config: {
						duration: 1000
					}
				})
			}
		});
	}

	private navigate(params: Array<any>) {
		this.router.navigate(params);
	}

	private alertAndRedirect(action: string, urlParams: Array<any>) {
		this.alert.notify.next({
			message: `${this.contactNamePipe.transform(this.contact)} ${action}`,
			action: null,
			config: {
				duration: 1000
			}
		})
		this.navigate(urlParams)
	}
}
