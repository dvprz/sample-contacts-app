import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable()
export class ContactsService extends RestService {
	resource: string = '/contacts'
}
