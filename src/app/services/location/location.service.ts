import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class LocationService {
	constructor(private router: Router) {}

	navigateToCommunity(id: number): void {
		this.router
			.navigateByUrl('/', { skipLocationChange: true })
			.then(() => this.router.navigate([`/community/${id}`]));
	}

	navigateToAccount(id: number): void {
		this.router
			.navigateByUrl('/', { skipLocationChange: true })
			.then(() => this.router.navigate([`/account/${id}`]));
	}
}
