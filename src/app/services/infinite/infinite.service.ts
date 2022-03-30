import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class InfiniteService {
	private INFINITE_SCROLL_OFFSET = 0;

	constructor() {}

	onScroll(callback: Function, component: any): void {
		const height: number = component
			? component.offsetHeight
			: window.innerHeight;
		const size: number = component ? component.scrollTop : window.scrollY;
		const limit: number = component
			? component.scrollHeight
			: document.body.offsetHeight;

		if (height + size + this.INFINITE_SCROLL_OFFSET >= limit) {
			callback();
		}
	}
}
