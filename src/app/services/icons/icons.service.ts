import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class IconsService {
	constructor() {}

	public getIcon(icon: string) {
		switch (icon) {
			case 'search':
				return 'fas fa-search';
			case 'copyright':
				return 'far fa-copyright';
			case 'comment':
				return 'far fa-comment';
			case 'copyright':
				return 'far fa-copyright';
		}

		return '';
	}
}
