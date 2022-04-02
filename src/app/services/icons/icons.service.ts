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
			case 'edit':
				return 'far fa-edit';
			case 'delete':
				return 'far fa-trash-alt';
			case 'copyright':
				return 'far fa-copyright';
			case 'up-arrow':
				return 'fa fa-caret-up';
			case 'down-arrow':
				return 'fa fa-caret-down';
		}

		return '';
	}
}
