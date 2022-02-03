import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccount } from 'src/app/models/accounts.interface';
import { IEntity } from 'src/app/models/entities.interface';
import { InteractivityService } from 'src/app/services/interactivity/interactivity.service';

@Component({
	selector: 'app-entity',
	templateUrl: './entity.component.html',
	styleUrls: ['./entity.component.css'],
})
export class EntityComponent implements OnInit {
	@Input() public sessionAccount: IAccount;
	@Input() public show: boolean;
	@Input() public entity: IEntity;
	@Input() public active: boolean;
	@Input() public onLinksClick: Function;
	@Input() public onProfileButtonClick: Function;
	@Input() public showFollowButton: boolean;

	constructor(
		private router: Router,
		private interactivityService: InteractivityService
	) {}

	ngOnInit(): void {}

	navigateToAccount(): void {
		this.router.navigate([`/${this.entity.type}/${this.entity.id}`]);
	}

	onFollowClick() {
		if (this.sessionAccount === null) {
			this.router.navigate(['/auth']);
		}

		this.interactivityService.calculateFollow(
			this.entity,
			(e: IEntity) => (this.entity = e)
		);
	}

	profileButtonClick(): void {
		if (this.onProfileButtonClick) {
			if (this.shouldSettings()) {
				this.router.navigate(['/settings']);
			} else this.onProfileButtonClick(this.entity);
		}
	}

	shouldSettings(): boolean {
		return (
			!this.sessionAccount.admin ||
			(this.entity.type === 'account' &&
				this.entity.id === this.sessionAccount.id)
		);
	}
}
