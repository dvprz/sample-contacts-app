import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { contacts } from '../data/contacts';
import { Observable } from 'rxjs';
import { Contact } from './contacts.model';

const production = environment.production;

export class RestService {
	base: string = 'http://localhost:3000';

    resource: string = '/';

	private contacts: Contact[];

	private lsKey: string = 'ng-app-contacts'

	constructor(@Inject(HttpClient) private http: HttpClient) {
		if (production) {

			if (!localStorage.getItem(this.lsKey)) {
				this.contacts = contacts;
				localStorage.setItem(this.lsKey, JSON.stringify(contacts));
			} else {
				this.contacts = JSON.parse(localStorage.getItem(this.lsKey));
			}
		}
	}

	get url() {
		return this.base + this.resource;
	}

	query<T>(query?: any) {
		if (production) {
			return Observable.create(observer => {
				if (query && query.sort) {
					const key = query.sort;

					if (query.order && query.order.toLowerCase() === 'asc') {
						this.contacts.sort((a, b) => this.sortAsc(a.first_name.toLowerCase(), b.first_name.toLowerCase()))
					} else if (query.order && query.order.toLowerCase() === 'desc') {
						this.contacts.sort((a, b) => this.sortDesc(a.first_name.toLowerCase(), b.first_name.toLowerCase()))
					} else {
						this.contacts.sort((a, b) => this.sortAsc(a.first_name.toLowerCase(), b.first_name.toLowerCase()))
					}
				}
				observer.next(this.contacts);
			})
		}

		let url = this.url;

		if (query) {
			url += `?${this.toQueryString(query)}`;
		}
		return this.http.get<T>(url);
	}

	get<T>(id: number) {
		if (production) {
			return Observable.create(observer => {
				const found = this.contacts.find(contact => contact.id == id);
				observer.next(found);
			})
		}
		return this.http.get(`${this.url}/${id}`);
	}

	create<T>(body: any)  {
		if (production) {
			return Observable.create(observer => {
				const copied = this.contacts.slice();
				const last = copied.sort((a, b) => this.sortAsc(a.id, b.id)).pop()

				body.id = last.id + 1;

				this.contacts.push(body)
				localStorage.setItem(this.lsKey, JSON.stringify(this.contacts));

				observer.next(body);
			})
		}
		return this.http.post(this.url, body);
	}

	update<T>(id: number, body: any) {
		if (production) {
			return Observable.create(observer => {
				this.contacts = this.contacts.map(contact => {
					if (contact.id === id) {
						return Object.assign({}, contact, body)
					} else {
						return contact
					}
				})

				localStorage.setItem(this.lsKey, JSON.stringify(this.contacts))

				observer.next(body);
			})
		}
		return this.http.put(`${this.url}/${id}`, body);
	}

	delete<T>(id: number) {
		if (production) {
			return Observable.create(observer => {
				let found;
				this.contacts = this.contacts.filter(contact => {
					if (contact.id === id) found = contact;
					return contact.id !== id
				})

				localStorage.setItem(this.lsKey, JSON.stringify(this.contacts));

				observer.next(found)
			})
		}
		return this.http.delete(`${this.url}/${id}`);
	}

	private toQueryString(paramsObject) {
		return Object
        	.keys(paramsObject)
        	.map(key => `_${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
        	.join('&');
    }

	private sortDesc(a, b) {
		if (a > b) {
			return -1
		}

		if (a < b) {
			return 1
		}

		return 0;
	}

	private sortAsc(a, b) {
		if (a < b) {
			return -1
		}

		if (a > b) {
			return 1
		}

		return 0;
	}

}
