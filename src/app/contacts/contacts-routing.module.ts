import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from '../components/contacts/contacts.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';


const routes: Routes = [
	{ path: 'contacts', component: ContactsComponent },
	{ path: 'contacts/new', component: ContactFormComponent },
	{ path: 'contacts/:contact_id', component: ContactComponent },
	{ path: 'contacts/:contact_id/edit', component: ContactFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
