import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/models/session.interface';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
	selector: 'app-init-session',
	templateUrl: './init-session.component.html',
	styleUrls: ['./init-session.component.css'],
})
export class InitSessionComponent implements OnInit {
	constructor(private sessionService: SessionService, private router: Router) {}

	ngOnInit(): void {
		const data: ILogin = {
			login: 'user123',
			password: 'user123',
		};

		this.sessionService.login(data).subscribe(
			() => this.router.navigate(['']),
			() => console.log('error')
		);
	}
}
