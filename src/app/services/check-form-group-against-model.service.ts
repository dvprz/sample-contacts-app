import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class CheckFormGroupAgainstModelService {

	forChanges(formGroup: FormGroup, model) {
		for (let [key, value] of Object.entries(formGroup.getRawValue())) {
			if (key !== 'id' && model[key] !== value) return true
		}

		return false
	}
}
