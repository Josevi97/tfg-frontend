import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/models/session.interface';
import { IconsService } from 'src/app/services/icons/icons.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
	selector: 'app-init-session',
	templateUrl: './init-session.component.html',
	styleUrls: ['./init-session.component.css'],
})
export class InitSessionComponent implements OnInit {
	constructor(
		private sessionService: SessionService,
		private router: Router,
		public iconsService: IconsService
	) {}

	ngOnInit(): void {}

	onSubmit(): void {
		const data: ILogin = {
			login: 'admin',
			password: 'admin',
		};

		this.sessionService.login(data).subscribe(
			() => this.router.navigate(['']),
			() => console.log('error')
		);
	}
}
