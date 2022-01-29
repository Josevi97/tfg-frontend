import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount, IUpdateAccount } from 'src/app/models/accounts.interface';
import { ISettingsMenu } from 'src/app/models/settings-menu.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { ComponentFactoryService } from 'src/app/services/componentFactory/component-factory.service';
import { FormsService } from 'src/app/services/forms/forms.service';
import { SessionService } from 'src/app/services/session/session.service';
import { ConfirmComponent } from '../../unrouted/confirm/confirm.component';

@Component({
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;

	public menuData: ISettingsMenu[];
	public state: string;
	public sessionAccount: IAccount;
	public formGroup: FormGroup;

	constructor(
		private router: Router,
		private sessionService: SessionService,
		private accountsService: AccountsService,
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private componentFactoryService: ComponentFactoryService,
		public formsService: FormsService
	) {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
		this.state = 'account';
		this.menuData = [
			{
				text: 'Cuenta',
				icon: 'person',
				key: 'account',
			},
			{
				text: 'Redes sociales',
				icon: 'share',
				key: 'social',
			},
			{
				text: 'Notificaciones',
				icon: 'notifications',
				key: 'notifications',
			},
			{
				text: 'Apariencia',
				icon: 'brush',
				key: 'apparence',
			},
			{
				text: 'Seguridad',
				icon: 'lock',
				key: 'security',
			},
			{
				text: 'Metodos de pago',
				icon: 'credit_card',
				key: 'payment',
			},
		];

		this.formGroup = this.formBuilder.group({
			username: [
				this.sessionAccount.username,
				[Validators.required, Validators.minLength(4)],
			],
			description: [this.sessionAccount.description],
			login: [
				this.sessionAccount.login,
				[Validators.required, Validators.minLength(4)],
			],
			email: [
				this.sessionAccount.email,
				[Validators.required, Validators.minLength(4)],
			],
		});
	}

	ngOnInit(): void {}

	changeState(key: string): void {
		this.state = key;
	}

	detectChanges(): boolean {
		return (
			this.sessionAccount.username === this.formGroup.get('username').value &&
			this.sessionAccount.description ===
				this.formGroup.get('description').value &&
			this.sessionAccount.login === this.formGroup.get('login').value &&
			this.sessionAccount.email === this.formGroup.get('email').value
		);
	}

	onSubmit(): void {
		if (this.detectChanges()) {
			return;
		}

		const data: IUpdateAccount = {
			username: this.formGroup.get('username').value,
			description: this.formGroup.get('description').value,
			login: this.formGroup.get('login').value,
			email: this.formGroup.get('email').value,
			admin: this.sessionAccount.admin,
		};

		this.accountsService.update(this.sessionAccount.id, data).subscribe(() => {
			this.sessionAccount.username = data.username;
			this.sessionAccount.description = data.description;
			this.sessionAccount.login = data.login;
			this.sessionAccount.admin = data.admin;

			const a = this.componentFactoryService.createAlert(this.alertRef);
			a.instance.onAfterViewInit = () => {
				const component = this.componentFactoryService.generateComponent(
					ConfirmComponent,
					a.instance.componentRef
				);

				component.instance.setMessage(
					'Su cuenta ha sido actualizada correctamente'
				);
				component.instance.setButtonContent('Continuar');
				component.instance.setButtonOnClick(() =>
					this.componentFactoryService.destroyComponent(a)
				);
			};
		});
	}

	onCancel(): void {
		this.formGroup.get('username').setValue(this.sessionAccount.username);
		this.formGroup.get('description').setValue(this.sessionAccount.description);
		this.formGroup.get('login').setValue(this.sessionAccount.login);
		this.formGroup.get('email').setValue(this.sessionAccount.email);
	}

	onDelete(): void {
		const a = this.componentFactoryService.createAlert(this.alertRef);
		a.instance.onAfterViewInit = () => {
			const component = this.componentFactoryService.generateComponent(
				ConfirmComponent,
				a.instance.componentRef
			);

			component.instance.setMessage(
				'Usted esta apunto de eliminar su cuenta, ¿esta seguro de seguir con esta operacion? no podra recuperar sus datos.'
			);
			component.instance.setButtonContent('Eliminar cuenta');
			component.instance.setButtonType('error');
			component.instance.setButtonOnClick(() => {
				this.componentFactoryService.destroyComponent(a);
				this.accountsService.delete(this.sessionAccount.id).subscribe(() => {
					this.sessionService.logout().subscribe(() => {
						this.router.navigate(['/auth']);
					});
				});
			});
		};
	}

	onChangePassword(): void {}
}
