import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEntrance, IEntrancePage } from 'src/app/models/entrances.interface';
import { IPost } from 'src/app/models/posts.interface';
import { ISort } from 'src/app/models/sort.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { CommunitiesService } from 'src/app/services/communities/communities.service';
import { ComponentFactoryService } from 'src/app/services/componentFactory/component-factory.service';
import { EntrancesService } from 'src/app/services/entrances/entrances.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { IAccount } from '../../../models/accounts.interface';
import { AlertComponent } from '../../unrouted/alert/alert.component';
import { PostComponent } from '../../unrouted/post/post.component';

@Component({
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;

	public sessionAccount: IAccount;
	public currentAccount: IAccount;
	public posts: IPost[];
	public account: number;
	public community: number;

	public state: string;
	public sortData: ISort[];

	constructor(
		private activatedRoute: ActivatedRoute,
		private accountsService: AccountsService,
		private entrancesService: EntrancesService,
		private communitiesService: CommunitiesService,
		private componentFactoryService: ComponentFactoryService,
		private postsService: PostsService
	) {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
		this.account = this.activatedRoute.snapshot.params['account'];
		this.community = this.activatedRoute.snapshot.params['community'];
		this.currentAccount = this.sessionAccount;

		this.initSortData();
	}

	ngOnInit(): void {
		this.initPosts();
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
				PostComponent,
				a.instance.componentRef
			);
			e.instance.entrance = data;
		};
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

	initPosts(): void {
		if (this.account === undefined && this.community === undefined) {
			this.entrancesService
				.getAllEntrances()
				.subscribe(
					(data: IEntrancePage) =>
						(this.posts = data.content.map((entrance) =>
							this.postsService.toPost(entrance)
						))
				);
		} else if (this.community !== undefined) {
			this.communitiesService
				.getEntrancesByCommunity(this.community)
				.subscribe(
					(data: IEntrancePage) =>
						(this.posts = data.content.map((entrance) =>
							this.postsService.toPost(entrance)
						))
				);
		} else {
			this.accountsService
				.findOne(this.account)
				.subscribe((data: IAccount) => (this.currentAccount = data));
			this.accountsService
				.getEntrancesByAccount(this.account)
				.subscribe(
					(data: IEntrancePage) =>
						(this.posts = data.content.map((entrance) =>
							this.postsService.toPost(entrance)
						))
				);
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
