import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAccount } from 'src/app/models/accounts.interface';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
	@ViewChild('popup', { read: ViewContainerRef }) popupRef: ViewContainerRef;

	public sessionAccount: IAccount;

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
	}
}
