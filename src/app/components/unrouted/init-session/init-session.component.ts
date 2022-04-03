import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IFormData } from 'src/app/models/forms.interface';
import { ILogin } from 'src/app/models/session.interface';
import { ComponentFactoryService } from 'src/app/services/componentFactory/component-factory.service';
import { FormsService } from 'src/app/services/forms/forms.service';
import { IconsService } from 'src/app/services/icons/icons.service';
import { SessionService } from 'src/app/services/session/session.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
	selector: 'app-init-session',
	templateUrl: './init-session.component.html',
	styleUrls: ['./init-session.component.css'],
})
export class InitSessionComponent implements OnInit {
	public formGroup: FormGroup;
	public formData: IFormData[];
	public onFail: Function;

	constructor(
		private sessionService: SessionService,
		private router: Router,
		private formBuilder: FormBuilder,
		private ref: ChangeDetectorRef,
		public formsService: FormsService,
		public iconsService: IconsService,
		public componentFactoryService: ComponentFactoryService
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
			login: [
				'',
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(15),
				],
			],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(20),
				],
			],
		});
	}

	ngOnInit(): void {}

	onSubmit(): void {
		this.formsService.checkInvalid(this.formGroup, this.ref);

		if (!this.formGroup.valid) {
			if (this.onFail) {
				this.onFail('void');
			}

			return;
		}

		const data: ILogin = {
			login: this.formGroup.get('login')!.value,
			password: this.formGroup.get('password')!.value,
		};

		this.sessionService.login(data).subscribe(
			() => this.router.navigate(['']),
			() => (this.onFail ? this.onFail('invalid') : null)
		);
	}
}
