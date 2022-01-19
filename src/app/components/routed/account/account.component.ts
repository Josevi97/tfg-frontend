import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAccount } from 'src/app/models/accounts.interface';
import { IEntrance, IEntrancePage } from 'src/app/models/entrances.interface';
import { ISort } from 'src/app/models/sort.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
	public sessionAccount: IAccount;
	public currentAccount: IAccount;
	public entrances: IEntrance[];

	public state: string;
	public sortData: ISort[];

	constructor(
		private activatedRoute: ActivatedRoute,
		private accountsService: AccountsService
	) {
		this.state = 'entrances';
		this.sortData = [
			{
				icon: 'article',
				text: 'Entradas',
				key: 'entrances',
			},
			{
				icon: 'comment',
				text: 'Comentarios',
				key: 'comments',
			},
		];
	}

	ngOnInit(): void {
		const id = this.activatedRoute.snapshot.params['account'];

		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
		this.accountsService
			.findOne(id)
			.subscribe((data: IAccount) => (this.currentAccount = data));
		this.accountsService
			.getEntrancesByAccount(id)
			.subscribe((data: IEntrancePage) => (this.entrances = data.content));
	}

	changeState(key: string): void {
		this.state = key;
	}

	sendComment(): void {}
}
