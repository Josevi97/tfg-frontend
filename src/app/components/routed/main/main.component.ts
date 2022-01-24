import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommentPage } from 'src/app/models/comments.interface';
import {
	ICommunity,
	ICommunityPage,
} from 'src/app/models/communities.interface';
import { IEntity } from 'src/app/models/entities.interface';
import { IEntrance, IEntrancePage } from 'src/app/models/entrances.interface';
import { IPost } from 'src/app/models/posts.interface';
import { ISort } from 'src/app/models/sort.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { CommunitiesService } from 'src/app/services/communities/communities.service';
import { ComponentFactoryService } from 'src/app/services/componentFactory/component-factory.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
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
	public currentEntity: IEntity;
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
		private postsService: PostsService,
		private entitiesService: EntitiesService
	) {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
		this.account = this.activatedRoute.snapshot.params['account'];
		this.community = this.activatedRoute.snapshot.params['community'];
		this.currentEntity = this.entitiesService.fromAccount(this.sessionAccount);

		this.initSortData();
	}

	ngOnInit(): void {
		this.initPosts();
	}

	changeState(key: string): void {
		if (key === this.state) {
			return;
		}

		switch (key) {
			case 'entrances':
				this.accountsService
					.getEntrancesByAccount(this.account)
					.subscribe(
						(data: IEntrancePage) =>
							(this.posts = this.postsService.fromEntrances(data.content))
					);
				break;
			case 'comments':
				this.accountsService
					.getCommentsByAccount(this.currentEntity.id)
					.subscribe(
						(data: ICommentPage) =>
							(this.posts = this.postsService.fromComments(data.content))
					);
				break;
		}

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
					key: 'comments',
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
						(this.posts = this.postsService.fromEntrances(data.content))
				);
		} else if (this.community !== undefined) {
			this.communitiesService
				.findOne(this.community)
				.subscribe((data: ICommunity) => {
					console.log(data);
					this.currentEntity = this.entitiesService.fromCommunity(data);
				});
			this.communitiesService
				.getEntrancesByCommunity(this.community)
				.subscribe(
					(data: IEntrancePage) =>
						(this.posts = this.postsService.fromEntrances(data.content))
				);
		} else {
			this.accountsService
				.findOne(this.account)
				.subscribe(
					(data: IAccount) =>
						(this.currentEntity = this.entitiesService.fromAccount(data))
				);
			this.accountsService
				.getEntrancesByAccount(this.account)
				.subscribe(
					(data: IEntrancePage) =>
						(this.posts = this.postsService.fromEntrances(data.content))
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
