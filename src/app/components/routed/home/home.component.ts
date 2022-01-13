import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAccount } from '../../../models/accounts.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	public sessionAccount: IAccount;

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
		console.log('home.component: ngOnInit');
		console.log(this.sessionAccount);
	}
}
