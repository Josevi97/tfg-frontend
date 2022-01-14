import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class IconsService {
	constructor() {}

	public getIcon(icon: string) {
		switch (icon) {
			case 'times':
				return 'fas fa-times';
			case 'check':
				return 'fas fa-check';
			case 'arrowUp':
				return 'fas fa-caret-up';
			case 'arrowDown':
				return 'fas fa-caret-down';
			case 'comment':
				return 'far fa-comment';
		}
		return 'fas fa-times';
	}
}
