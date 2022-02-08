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

	navigateToEntrance(id: number): void {
		this.router
			.navigateByUrl('/', { skipLocationChange: true })
			.then(() => this.router.navigate([`/entrance/${id}`]));
	}

	navigateToComment(id: number): void {
		this.router
			.navigateByUrl('/', { skipLocationChange: true })
			.then(() => this.router.navigate([`/comment/${id}`]));
	}

	navigateToHome(): void {
		this.router
			.navigateByUrl('/', { skipLocationChange: true })
			.then(() => this.router.navigate(['/home']));
	}

	navigateToAuth(): void {
		this.router
			.navigateByUrl('/', { skipLocationChange: true })
			.then(() => this.router.navigate(['/auth']));
	}
}
