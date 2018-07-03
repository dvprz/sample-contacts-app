import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AlertService {
	private _notify: Subject<any> = new Subject();

	get notify() {
		return this._notify;
	}
}
