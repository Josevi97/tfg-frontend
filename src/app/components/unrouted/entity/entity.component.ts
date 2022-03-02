import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccount } from 'src/app/models/accounts.interface';
import { IEntity } from 'src/app/models/entities.interface';

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
	@Input() public onAddClick: Function;
	@Input() public showFollowButton: boolean;
	@Input() public onFollowClick: Function;

	constructor(private router: Router) {}

	ngOnInit(): void {}

	navigateToAccount(): void {
		this.router.navigate([`/${this.entity.type}/${this.entity.id}`]);
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
