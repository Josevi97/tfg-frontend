import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
	IEntity,
	IEntityDetails,
	IFormEntityDetails,
} from 'src/app/models/entities.interface';

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
		private formBuilder: FormBuilder
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
			login: [this.entity?.title],
			username: [this.entity?.subtitle],
			email: [this.entity?.email],
			description: [this.entity?.body],
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
			name: [this.entity?.title],
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
		// ...
		//

		if (this.onEdit) {
			this.onEdit(this.entity);
		}
	}

	printEntity(): void {}

	deleteEntity(): void {
		// ...
		//

		if (this.onDelete) {
			this.onDelete();
		}
	}
}
