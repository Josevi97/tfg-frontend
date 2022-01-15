import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class IconsService {
	constructor() {}

	public getIcon(icon: string) {
		switch (icon) {
			case 'inspect':
				return 'far fa-eye';
			case 'comment':
				return 'far fa-comment';
		}

		return '';
	}
}
