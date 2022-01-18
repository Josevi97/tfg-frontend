import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEntrance, IEntrancePage } from 'src/app/models/entrances.interface';
import { ISort } from 'src/app/models/sort.interface';
import { ComponentFactoryService } from 'src/app/services/componentFactory/component-factory.service';
import { EntranceService } from 'src/app/services/entrance/entrance.service';
import { IAccount } from '../../../models/accounts.interface';
import { AlertComponent } from '../../unrouted/alert/alert.component';
import { EntranceComponent } from '../../unrouted/entrance/entrance.component';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;

	public sessionAccount: IAccount;
	public entrances: IEntrance[];

	public state: string;
	public sortData: ISort[];

	constructor(
		private activatedRoute: ActivatedRoute,
		private entranceService: EntranceService,
		private componentFactoryService: ComponentFactoryService
	) {
		this.state = 'all';
		this.sortData = [
			{
				icon: 'apps',
				text: 'Todos',
				key: 'all',
			},
			{
				icon: 'shuffle',
				text: 'Siguiendo',
				key: 'own',
			},
		];
	}

	ngOnInit(): void {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
		this.entranceService.getAllEntrances().subscribe((data: IEntrancePage) => {
			this.entrances = data.content;
		});
	}

	createAlert(): any {
		const a = this.componentFactoryService.generateComponent(
			AlertComponent,
			this.alertRef
		);

		a.instance.close = () => this.componentFactoryService.destroyComponent(a);
		return a;
	}

	sendComment(data: IEntrance): void {
		const a = this.createAlert();
		a.instance.onAfterViewInit = () => {
			const e = this.componentFactoryService.generateComponent(
				EntranceComponent,
				a.instance.componentRef
			);
			e.instance.entrance = data;
		};

		console.log(data);
	}

	changeState(key: string): void {
		this.state = key;
	}
}
