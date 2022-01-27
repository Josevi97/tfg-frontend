import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAccount } from 'src/app/models/accounts.interface';
import { ISettingsMenu } from 'src/app/models/settings-menu.interface';

@Component({
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
	public menuData: ISettingsMenu[];
	public state: string;
	public sessionAccount: IAccount;

	constructor(private activatedRoute: ActivatedRoute) {
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
	}

	ngOnInit(): void {}

	changeState(key: string): void {
		this.state = key;
	}
}
