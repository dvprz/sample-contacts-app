import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';
import { ContactsRoutingModule } from './contacts-routing.module';

import { ContactsComponent } from '../components/contacts/contacts.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';
import { ToggleComponent } from '../components/toggle/toggle.component';
import { DiscardOrSaveDialog } from '../components/discard-or-save-dialog/discard-or-save-dialog.component';
import { ChangePhotoComponent } from '../components/change-photo/change-photo.component';
import { ContactAvatarComponent } from '../components/contact-avatar/contact-avatar.component';

import { ContactsService } from '../services/contacts.service';
import { CheckFormGroupAgainstModelService } from '../services/check-form-group-against-model.service';
import { AvatarService } from '../services/avatar.service';

import { SlugifyPipe } from '../pipes/slugify.pipe';
import { ContactNamePipe } from '../pipes/contact-name.pipe';

@NgModule({
	imports: [
    	CommonModule,
		HttpClientModule,
		MaterialModule,
    	ContactsRoutingModule,
		ReactiveFormsModule
	],
	declarations: [
		SlugifyPipe,
		ContactNamePipe,
		ContactsComponent,
		ContactComponent,
		ContactFormComponent,
		ToggleComponent,
		DiscardOrSaveDialog,
		ChangePhotoComponent,
		ContactAvatarComponent
	],
	entryComponents: [ DiscardOrSaveDialog, ChangePhotoComponent ],
  	providers: [
  		ContactsService,
		ContactNamePipe,
		CheckFormGroupAgainstModelService,
		AvatarService
	]
})
export class ContactsModule { }
