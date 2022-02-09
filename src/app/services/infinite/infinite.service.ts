import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class InfiniteService {
	private INFINITE_SCROLL_OFFSET = 5;

	constructor() {}

	onScroll(component: any, callback: Function): void {
		if (
			component.innerHeight + component.scrollY + this.INFINITE_SCROLL_OFFSET >=
			document.body.offsetHeight
		) {
			callback();
		}
	}
}
