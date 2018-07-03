import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../services/contacts.model';

@Pipe({
  name: 'contactName'
})
export class ContactNamePipe implements PipeTransform {

  transform(contact: Contact): string {
	  let name = '';

	  if ( contact.name_prefix !== "" ) {
		  name += `${contact.name_prefix} `;
	  }

	  if ( contact.first_name !== "" ) {
		  name += contact.first_name;
	  }

	  if ( contact.last_name !== "" ) {
		  name += ` ${contact.last_name}`;
	  }

	  if ( contact.name_suffix !== "" ) {
		  name += ` ${contact.name_suffix}`;
	  }

	  return name;
  }

}
