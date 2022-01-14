import { Injectable } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Injectable({
	providedIn: 'root',
})
export class IconsService {
	constructor() {}

	public getIcon(icon: string) {
		switch (icon) {
			case 'times':
				return faTimes;
			case 'check':
				return faCheck;
		}

		return faTimes;
	}
}
