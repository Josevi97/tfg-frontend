import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUpdateAccount } from 'src/app/models/accounts.interface';
import { IRegisterCommunity } from 'src/app/models/communities.interface';
import {
	IEntity,
	IEntityDetails,
	IFormEntityDetails,
} from 'src/app/models/entities.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { CommunitiesService } from 'src/app/services/communities/communities.service';
import { FormsService } from 'src/app/services/forms/forms.service';
import { PrintService } from 'src/app/services/print/print.service';

@Component({
	selector: 'app-entity-details',
	templateUrl: './entity-details.component.html',
	styleUrls: ['./entity-details.component.css'],
})
export class EntityDetailsComponent implements OnInit {
	@Input() onEdit: Function;
	@Input() onDelete: Function;

	public entity: IEntity;
	public entityFormData: IFormEntityDetails[];
	public entityData: IEntityDetails[];
	public formGroup: FormGroup;

	constructor(
		private ref: ChangeDetectorRef,
		private formBuilder: FormBuilder,
		private accountsService: AccountsService,
		private communitiesService: CommunitiesService,
		private printService: PrintService,
		public formsService: FormsService
	) {}

	ngOnInit(): void {}

	setEntity(entity: IEntity): void {
		this.entity = entity;
		this.initData();

		this.ref.detectChanges();
	}

	initData(): void {
		switch (this.entity.type) {
			case 'account':
				this.initAsAccount();
				break;
			case 'community':
				this.initAsCommunity();
				break;
		}
	}

	initAsAccount(): void {
		this.formGroup = this.formBuilder.group({
			login: [
				this.entity?.subtitle,
				[Validators.required, Validators.minLength(4)],
			],
			username: [
				this.entity?.title,
				[Validators.required, Validators.minLength(4)],
			],
			email: [
				this.entity?.email,
				[
					Validators.required,
					Validators.pattern(
						'^[a-zA-Z0-9\\-_.]{3,}@[a-zA-Z]{3,}\\.[a-zA-Z]{2,}$'
					),
				],
			],
			description: [this.entity?.body],
			admin: [this.entity.tag === 'admin'],
		});

		this.entityFormData = [
			{
				name: 'Login',
				key: 'login',
			},
			{
				name: 'Username',
				key: 'username',
			},
			{
				name: 'Email',
				key: 'email',
			},
		];

		this.entityData = [
			{
				name: 'Tipo de usuario',
				value: this.entity?.tag === 'admin' ? 'Administrador' : 'Normal',
			},
			{
				name: 'Ultima conexion',
				value: this.entity?.lastConnection,
			},
			{
				name: 'Fecha de creacion',
				value: this.entity?.createdAt,
			},
			{
				name: 'Numero de usuarios seguidos',
				value: this.entity?.following + '',
			},
			{
				name: 'Numero de seguidores',
				value: this.entity?.followers + '',
			},
			{
				name: 'Numero de comunidades seguidas',
				value: this.entity?.communities + '',
			},
			{
				name: 'Numero de entradas',
				value: this.entity?.entrances + '',
			},
		];
	}

	initAsCommunity(): void {
		this.formGroup = this.formBuilder.group({
			name: [
				this.entity?.title,
				[Validators.required, Validators.minLength(4)],
			],
			description: [this.entity?.body],
		});

		this.entityFormData = [
			{
				name: 'Nombre',
				key: 'name',
			},
		];

		this.entityData = [
			{
				name: 'Fecha de creacion',
				value: this.entity?.createdAt,
			},
			{
				name: 'Numero de seguidores',
				value: this.entity?.followers + '',
			},
			{
				name: 'Numero de entradas',
				value: this.entity?.entrances + '',
			},
		];
	}

	editEntity(): void {
		this.formsService.checkInvalid(this.formGroup, this.ref);

		if (!this.formGroup.valid) {
			return;
		}

		switch (this.entity.type) {
			case 'account':
				const accountData: IUpdateAccount = {
					username: this.formGroup.get('username')!.value,
					description: this.formGroup.get('description')!.value,
					login: this.formGroup.get('login')!.value,
					email: this.formGroup.get('email')!.value,
					admin: this.formGroup.get('admin')!.value,
				};

				this.accountsService
					.update(this.entity.id, accountData, null)
					.subscribe(() => {
						if (this.onEdit) {
							this.onEdit(this.entity);
						}
					});
				break;
			case 'community':
				const communityData: IRegisterCommunity = {
					name: this.formGroup.get('name')!.value,
					description: this.formGroup.get('description')!.value,
				};

				this.communitiesService
					.update(this.entity.id, communityData)
					.subscribe(() => {
						if (this.onEdit) {
							this.onEdit(this.entity);
						}
					});
				break;
		}
	}

	printEntity(): void {
		const message = 'Esto es una prueba de informe';
		this.printService.printReportFromEntity(this.entity, message);
	}

	deleteEntity(): void {
		switch (this.entity.type) {
			case 'account':
				this.accountsService.delete(this.entity.id).subscribe(() => {
					if (this.onDelete) {
						this.onDelete();
					}
				});
				break;
			case 'community':
				this.communitiesService.delete(this.entity.id).subscribe(() => {
					if (this.onDelete) {
						this.onDelete();
					}
				});
				break;
		}
	}
}
