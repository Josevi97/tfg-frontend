import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEntrance, IEntrancePage } from 'src/app/models/entrances.interface';
import { ISort } from 'src/app/models/sort.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { CommunitiesService } from 'src/app/services/communities/communities.service';
import { ComponentFactoryService } from 'src/app/services/componentFactory/component-factory.service';
import { EntrancesService } from 'src/app/services/entrances/entrances.service';
import { IAccount } from '../../../models/accounts.interface';
import { AlertComponent } from '../../unrouted/alert/alert.component';
import { EntranceComponent } from '../../unrouted/entrance/entrance.component';

@Component({
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;

	public sessionAccount: IAccount;
	public currentAccount: IAccount;
	public entrances: IEntrance[];
	public account: number;
	public community: number;

	public state: string;
	public sortData: ISort[];

	constructor(
		private activatedRoute: ActivatedRoute,
		private accountsService: AccountsService,
		private entrancesService: EntrancesService,
		private communitiesService: CommunitiesService,
		private componentFactoryService: ComponentFactoryService
	) {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
		this.account = this.activatedRoute.snapshot.params['account'];
		this.community = this.activatedRoute.snapshot.params['community'];
		this.currentAccount = this.sessionAccount;

		this.initSortData();
	}

	ngOnInit(): void {
		this.initEntrances();
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

	initSortData(): void {
		if (
			this.sessionAccount &&
			this.account === undefined &&
			this.community === undefined
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
		} else if (this.account !== undefined) {
			this.state = 'entrances';
			this.sortData = [
				{
					icon: 'article',
					text: 'Entradas',
					key: 'entrances',
				},
				{
					icon: 'comment',
					text: 'Comentarios',
					key: 'comment',
				},
			];
		}
	}

	initEntrances(): void {
		if (this.account === undefined && this.community === undefined) {
			this.entrancesService
				.getAllEntrances()
				.subscribe((data: IEntrancePage) => (this.entrances = data.content));
		} else if (this.community !== undefined) {
			this.communitiesService
				.getEntrancesByCommunity(this.community)
				.subscribe((data: IEntrancePage) => (this.entrances = data.content));
		} else {
			this.accountsService
				.findOne(this.account)
				.subscribe((data: IAccount) => (this.currentAccount = data));
			this.accountsService
				.getEntrancesByAccount(this.account)
				.subscribe((data: IEntrancePage) => (this.entrances = data.content));
		}
	}

	shouldShowSubtitle(key: string): boolean {
		switch (key) {
			case 'account':
				return !this.account;
			case 'community':
				return !this.community;
		}

		return false;
	}
}
