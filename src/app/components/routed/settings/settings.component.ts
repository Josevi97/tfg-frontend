import {
	Component,
	ComponentRef,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INVALID_DATA, NO_DATA } from 'src/app/constants/form.constants';
import { IAccount, IUpdateAccount } from 'src/app/models/accounts.interface';
import { ISettingsMenu } from 'src/app/models/settings-menu.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { ComponentFactoryService } from 'src/app/services/componentFactory/component-factory.service';
import { FormsService } from 'src/app/services/forms/forms.service';
import { LocationService } from 'src/app/services/location/location.service';
import { SessionService } from 'src/app/services/session/session.service';
import { ConfirmComponent } from '../../unrouted/confirm/confirm.component';
import { PopupComponent } from '../../unrouted/popup/popup.component';

@Component({
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;
	@ViewChild('popup', { read: ViewContainerRef }) popupRef: ViewContainerRef;

	public menuData: ISettingsMenu[];
	public state: string;
	public sessionAccount: IAccount;
	public formGroup: FormGroup;
	public file: File;
	public filePath: any;
	public fileReader: FileReader;
	public popup: ComponentRef<PopupComponent>;
	public fileRoute: any;

	constructor(
		private router: Router,
		private sessionService: SessionService,
		private accountsService: AccountsService,
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private componentFactoryService: ComponentFactoryService,
		private locationService: LocationService,
		public formsService: FormsService
	) {
		this.fileReader = new FileReader();
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
		this.fileRoute = this.sessionAccount.avatar;

		if (this.sessionAccount === null) {
			this.router.navigate(['']);
		}

		this.menuData = [
			{
				text: 'Cuenta',
				icon: 'person',
				key: 'account',
			},
			{
				text: 'Seguridad',
				icon: 'lock',
				key: 'security',
			},
		];

		this.changeState('account');
	}

	ngOnInit(): void {}

	setFormForAccount(): void {
		this.formGroup = this.formBuilder.group({
			username: [
				this.sessionAccount.username,
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(15),
				],
			],
			description: [this.sessionAccount.description, Validators.maxLength(200)],
			login: [
				this.sessionAccount.login,
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(15),
				],
			],
			email: [
				this.sessionAccount.email,
				[
					Validators.required,
					Validators.pattern(
						'^[a-zA-Z0-9\\-_.]{3,}@[a-zA-Z]{3,}\\.[a-zA-Z]{2,}$'
					),
					Validators.maxLength(50),
				],
			],
		});
	}

	setFormForSecurity(): void {
		this.formGroup = this.formBuilder.group({
			originalPassword: [
				'',
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(20),
				],
			],
			repeatedPassword: [
				'',
				[
					Validators.required,
					Validators.minLength(4),
					Validators.maxLength(20),
				],
			],
		});
	}

	changeState(key: string): void {
		this.state = key;

		switch (key) {
			case 'account':
				this.setFormForAccount();
				break;
			case 'security':
				this.setFormForSecurity();
				break;
		}
	}

	detectChanges(): boolean {
		return (
			this.sessionAccount.username === this.formGroup.get('username').value &&
			this.sessionAccount.description ===
				this.formGroup.get('description').value &&
			this.sessionAccount.login === this.formGroup.get('login').value &&
			this.sessionAccount.email === this.formGroup.get('email').value &&
			this.sessionAccount.avatar === this.fileRoute
		);
	}

	onSubmit(): void {
		if (this.detectChanges()) {
			return;
		}

		if (!this.formGroup.valid) {
			this.onFail('edit-account', 'void');
			return;
		}

		const data: IUpdateAccount = {
			username: this.formGroup.get('username').value,
			description: this.formGroup.get('description').value,
			login: this.formGroup.get('login').value,
			email: this.formGroup.get('email').value,
			admin: this.sessionAccount.admin,
			changeImage: this.fileRoute === null,
		};

		this.accountsService
			.update(this.sessionAccount.id, data, this.file)
			.subscribe(
				() => {
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
						component.instance.setButtonOnClick(() => {
							this.componentFactoryService.destroyComponent(a);
							this.locationService.navigateToSettings();
						});
					};
				},
				() => this.onFail('edit-account', 'invalid')
			);
	}

	onCancel(): void {
		this.formGroup.get('username').setValue(this.sessionAccount.username);
		this.formGroup.get('description').setValue(this.sessionAccount.description);
		this.formGroup.get('login').setValue(this.sessionAccount.login);
		this.formGroup.get('email').setValue(this.sessionAccount.email);
		this.fileRoute = this.sessionAccount.avatar;
	}

	onDelete(): void {
		const a = this.componentFactoryService.createAlert(this.alertRef);
		a.instance.onAfterViewInit = () => {
			const component = this.componentFactoryService.generateComponent(
				ConfirmComponent,
				a.instance.componentRef
			);

			component.instance.setMessage(
				'Usted esta apunto de eliminar su cuenta. ¿Esta seguro de seguir con esta operacion? no podra recuperar sus datos.'
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

	onChangePassword(): void {
		this.formsService.checkInvalid(this.formGroup);

		if (!this.formGroup.valid) {
			this.onFail('reset-password', 'void');
			return;
		}

		const data = {
			originalPassword: this.formGroup.get('originalPassword')!.value,
			repeatedPassword: this.formGroup.get('repeatedPassword')!.value,
		};

		this.accountsService.updatePassword(this.sessionAccount.id, data).subscribe(
			() => {
				const a = this.componentFactoryService.createAlert(this.alertRef);
				a.instance.onAfterViewInit = () => {
					const component = this.componentFactoryService.generateComponent(
						ConfirmComponent,
						a.instance.componentRef
					);

					component.instance.setMessage(
						'La contraseña se ha cambiado correctamente.'
					);
					component.instance.setButtonContent('Continuar');
					component.instance.setButtonOnClick(() => {
						this.formGroup.reset();
						this.componentFactoryService.destroyComponent(a);
						this.router.navigate(['/home']);
					});
				};
			},
			() => this.onFail('reset-password', 'invalid')
		);
	}

	onFileChange(e: any): void {
		this.file = e.target.files[0];

		if (this.file) {
			this.fileReader.readAsDataURL(this.file);
			this.fileReader.onload = () => {
				this.fileRoute = this.fileReader.result;
				e.target.value = '';
				console.log(this.file);
			};
		}
	}

	onFail(id: string, key: string): void {
		this.popup = this.componentFactoryService.createPopup(
			this.popupRef,
			key === 'void' ? NO_DATA : INVALID_DATA,
			`${id}_${key}`,
			this.popup,
			() => {
				this.popup = null;
			}
		);
	}

	onImageButtonClick(): boolean {
		const img = this.sessionAccount?.avatar;

		if (!this.fileRoute || this.fileRoute !== img) {
			this.fileRoute = img;
			this.file = null;
		} else {
			this.fileRoute = null;
		}

		return false;
	}
}
