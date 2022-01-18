import { Component, Input, OnInit } from '@angular/core';
import { IAccount } from 'src/app/models/accounts.interface';

@Component({
	selector: 'app-account-details',
	templateUrl: './account-details.component.html',
	styleUrls: ['./account-details.component.css'],
})
export class AccountDetailsComponent implements OnInit {
	@Input() public account: IAccount;
	@Input() public active: boolean;
	@Input() public showFollowButton: boolean;

	constructor() {}

	ngOnInit(): void {}
}
