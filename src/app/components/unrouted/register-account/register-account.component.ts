import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccount, IRegisterAccount } from 'src/app/models/accounts.interface';
import { IFormData } from 'src/app/models/forms.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { FormsService } from 'src/app/services/forms/forms.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
	selector: 'app-register-account',
	templateUrl: './register-account.component.html',
	styleUrls: ['./register-account.component.css'],
})
export class RegisterAccountComponent implements OnInit {
	public onSuccess: Function;
	public onError: Function;
	public formGroup: FormGroup;
	public formData: IFormData[];

	constructor(
		private sessionService: SessionService,
		private accountsService: AccountsService,
		private formBuilder: FormBuilder,
		private ref: ChangeDetectorRef,
		public formsService: FormsService
	) {
		this.formData = [
			{
				label: 'Login',
				placeholder: 'josevi97',
				type: 'text',
				key: 'login',
			},
			{
				label: 'Email',
				placeholder: 'ejemplo@hotmail.com',
				type: 'email',
				key: 'email',
			},
			{
				label: 'Username',
				placeholder: 'jose peña',
				type: 'text',
				key: 'username',
			},
			{
				label: 'Contraseña',
				placeholder: '********',
				type: 'password',
				key: 'password',
			},
			{
				label: 'Repetir contraseña',
				placeholder: '********',
				type: 'password',
				key: 'repeat_password',
			},
		];

		this.formGroup = this.formBuilder.group({
			login: ['', [Validators.required, Validators.minLength(4)]],
			email: ['', [Validators.required, Validators.minLength(4)]],
			username: ['', [Validators.required, Validators.minLength(4)]],
			password: ['', [Validators.required, Validators.minLength(4)]],
			repeat_password: ['', [Validators.required, Validators.minLength(4)]],
		});
	}

	ngOnInit(): void {}

	onSubmit(): void {
		this.sessionService.check().subscribe(
			(session: IAccount) => this.createAccount(session.admin),
			() => this.createAccount(false)
		);
	}

	createAccount(admin: boolean) {
		this.formsService.checkInvalid(this.formGroup, this.ref);

		if (!this.formGroup.valid) {
			return;
		}

		const data: IRegisterAccount = {
			login: this.formGroup.get('login')!.value,
			email: this.formGroup.get('email')!.value,
			username: this.formGroup.get('username')!.value,
			originalPassword: this.formGroup.get('password')!.value,
			repeatedPassword: this.formGroup.get('repeat_password')!.value,
			admin: admin,
		};

		this.accountsService.register(data).subscribe(
			() => (this.onSuccess ? this.onSuccess() : null),
			() => (this.onError ? this.onError(this.formGroup.valid) : null)
		);
	}
}
