import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccount } from 'src/app/models/accounts.interface';

@Component({
	selector: 'app-entity',
	templateUrl: './entity.component.html',
	styleUrls: ['./entity.component.css'],
})
export class EntityComponent implements OnInit {
	@Input() public show: boolean;
	@Input() public account: IAccount;
	@Input() public active: boolean;
	@Input() public showFollowButton: boolean;

	constructor(private router: Router) {}

	ngOnInit(): void {}

	navigateToAccount(): void {
		this.router.navigate([`/account/${this.account.id}`]);
	}
}
