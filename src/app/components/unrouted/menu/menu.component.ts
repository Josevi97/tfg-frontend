import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount } from 'src/app/models/accounts.interface';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
	@ViewChild('popup', { read: ViewContainerRef }) popupRef: ViewContainerRef;

	public sessionAccount: IAccount;

	constructor(
		private activatedRoute: ActivatedRoute,
		private sessionService: SessionService,
		public router: Router
	) {}

	ngOnInit(): void {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
	}

	checkSession(): void {}

	logout(): void {
		this.sessionService.logout().subscribe(() => {
			this.sessionAccount = this.activatedRoute.snapshot.data['data'];
			this.router.navigate(['/auth']);
		});
	}
}
