import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEntrance, IEntrancePage } from 'src/app/models/entrances.interface';
import { EntranceService } from 'src/app/services/entrance/entrance.service';
import { IAccount } from '../../../models/accounts.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	public sessionAccount: IAccount;
	public entrances: IEntrance[];

	constructor(
		private activatedRoute: ActivatedRoute,
		private entranceService: EntranceService
	) {}

	ngOnInit(): void {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
		this.entranceService.getAllEntrances().subscribe((data: IEntrancePage) => {
			this.entrances = data.content;
		});
	}
}
