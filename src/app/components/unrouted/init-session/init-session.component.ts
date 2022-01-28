import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormData } from 'src/app/models/forms.interface';
import { ILogin } from 'src/app/models/session.interface';
import { FormsService } from 'src/app/services/forms/forms.service';
import { IconsService } from 'src/app/services/icons/icons.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
	selector: 'app-init-session',
	templateUrl: './init-session.component.html',
	styleUrls: ['./init-session.component.css'],
})
export class InitSessionComponent implements OnInit {
	public formGroup: FormGroup;
	public formData: IFormData[];

	constructor(
		private sessionService: SessionService,
		private router: Router,
		private formBuilder: FormBuilder,
		private ref: ChangeDetectorRef,
		public formsService: FormsService,
		public iconsService: IconsService
	) {
		this.formData = [
			{
				label: 'Login',
				placeholder: 'josevi97',
				type: 'text',
				key: 'login',
			},
			{
				label: 'Contraseña',
				placeholder: '********',
				type: 'password',
				key: 'password',
			},
		];

		this.formGroup = this.formBuilder.group({
			login: ['', [Validators.required, Validators.minLength(4)]],
			password: ['', [Validators.required, Validators.minLength(4)]],
		});
	}

	ngOnInit(): void {}

	onSubmit(): void {
		const data: ILogin = {
			login: this.formGroup.get('login')!.value,
			password: this.formGroup.get('password')!.value,
		};

		this.sessionService.login(data).subscribe(
			() => this.router.navigate(['']),
			() => this.formsService.checkInvalid(this.formGroup, this.ref)
		);
	}
}
