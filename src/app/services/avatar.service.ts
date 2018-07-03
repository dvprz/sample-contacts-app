import { Injectable } from '@angular/core';
import * as faker from 'faker';

@Injectable()
export class AvatarService {

	fetch() {
		return faker.internet.avatar();
	}

}
