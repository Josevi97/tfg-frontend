import { Component, OnInit } from '@angular/core';
import { IRegisterAccount } from 'src/app/models/accounts.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';

@Component({
	selector: 'app-register-account',
	templateUrl: './register-account.component.html',
	styleUrls: ['./register-account.component.css'],
})
export class RegisterAccountComponent implements OnInit {
	public onSuccess: Function;

	constructor(private accountsService: AccountsService) {}

	ngOnInit(): void {}

	onSubmit(): void {
		const data: IRegisterAccount = {
			login: 'bueno',
			email: 'bueno@hotmail.com',
			username: 'prueba',
			originalPassword: 'prueba',
			repeatedPassword: 'prueba',
		};

		this.accountsService.register(data).subscribe(
			() => this.onSuccess(),
			() => console.log('error')
		);
	}
}
