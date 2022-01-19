import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEntrance } from 'src/app/models/entrances.interface';
import { IconsService } from 'src/app/services/icons/icons.service';

@Component({
	selector: 'app-entrance',
	templateUrl: './entrance.component.html',
	styleUrls: ['./entrance.component.css'],
})
export class EntranceComponent implements OnInit {
	@Input() public onCommentsClick: Function;
	@Input() public entrance: IEntrance;
	@Input() public showAccount: boolean;
	@Input() public showCommunity: boolean;

	constructor(public iconsService: IconsService, public router: Router) {}

	ngOnInit(): void {}

	onVotesClick(key: string): void {
		console.log(key);
	}

	navigateToEntrance(): void {
		this.router.navigate([`/entrance/${this.entrance.id}`]);
	}

	navigateToAccount(): void {
		this.router.navigate([`/account/${this.entrance.account.id}`]);
	}

	navigateToCommunity(): void {
		this.router.navigate([`/community/${this.entrance.community.id}`]);
	}
}
