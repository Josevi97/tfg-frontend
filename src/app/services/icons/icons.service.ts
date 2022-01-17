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
			case 'comment':
				return 'far fa-comment';
		}

		return '';
	}
}
