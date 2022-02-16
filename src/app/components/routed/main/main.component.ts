import {
	Component,
	ComponentRef,
	HostListener,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment, ICommentPage } from 'src/app/models/comments.interface';
import {
	ICommunity,
	ICommunityListPage,
} from 'src/app/models/communities.interface';
import { IEntity } from 'src/app/models/entities.interface';
import { IEntrance, IEntrancePage } from 'src/app/models/entrances.interface';
import { IPost } from 'src/app/models/posts.interface';
import { IDataSort, ISort } from 'src/app/models/sort.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { CommunitiesService } from 'src/app/services/communities/communities.service';
import { ComponentFactoryService } from 'src/app/services/componentFactory/component-factory.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { EntrancesService } from 'src/app/services/entrances/entrances.service';
import { FormsService } from 'src/app/services/forms/forms.service';
import { InfiniteService } from 'src/app/services/infinite/infinite.service';
import { InteractivityService } from 'src/app/services/interactivity/interactivity.service';
import { LocationService } from 'src/app/services/location/location.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import {
	IAccount,
	IAccountFollowPage,
} from '../../../models/accounts.interface';
import { ConfirmComponent } from '../../unrouted/confirm/confirm.component';
import { ElistComponent } from '../../unrouted/elist/elist.component';
import { EntranceFormComponent } from '../../unrouted/entrance-form/entrance-form.component';
import { PinspectComponent } from '../../unrouted/pinspect/pinspect.component';

@Component({
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;

	public sessionAccount: IAccount;
	public currentEntity: IEntity;
	public posts: IPost[];
	public post: IPost;
	public account: number;
	public community: number;
	public entrance: number;
	public comment: number;

	public state: string;
	public sortData: ISort[];
	public dataSort: IDataSort;

	@HostListener('window:scroll', ['$event'])
	onScroll(): void {
		this.infiniteService.onScroll(window, () => {
			this.dataSort.page++;

			if (this.community !== undefined) {
				this.showEntrancesByCommunity();
			} else if (this.entrance !== undefined) {
				this.showCommentsByEntrance();
			} else if (this.comment !== undefined) {
				this.showCommentsByComment();
			} else {
				this.initPostsByKey();
			}
		});
	}

	constructor(
		private formsService: FormsService,
		private activatedRoute: ActivatedRoute,
		private accountsService: AccountsService,
		private entrancesService: EntrancesService,
		private communitiesService: CommunitiesService,
		private postsService: PostsService,
		private entitiesService: EntitiesService,
		private commentsService: CommentsService,
		private componentFactoryService: ComponentFactoryService,
		private interactivityService: InteractivityService,
		private locationService: LocationService,
		private infiniteService: InfiniteService
	) {
		this.posts = [];

		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
		this.account = this.activatedRoute.snapshot.params['account'];
		this.community = this.activatedRoute.snapshot.params['community'];
		this.entrance = this.activatedRoute.snapshot.params['entrance'];
		this.comment = this.activatedRoute.snapshot.params['comment'];

		this.currentEntity = this.entitiesService.fromAccount(this.sessionAccount);
	}

	ngOnInit(): void {
		this.initialize();
	}

	initialize(): void {
		this.posts = [];
		this.dataSort = {
			page: 1,
			sort: 'id',
			size: 10,
			direction: false,
		};

		if (this.entrance === undefined && this.comment === undefined) {
			this.initSortData();
			this.initPosts(() => this.loadAccount(this.account));
		} else if (this.entrance !== undefined) {
			this.showEntrance();
			this.showCommentsByEntrance();
		} else {
			this.showComment();
			this.showCommentsByComment();
		}
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
					icon: 'forum',
					text: 'Comunidades',
					key: 'communities',
				},
				{
					icon: 'account_box',
					text: 'Cuentas',
					key: 'accounts',
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

	initPosts(callback: Function = null): void {
		if (this.account === undefined && this.community === undefined) {
			this.showAllEntrances();
		} else if (this.community !== undefined) {
			this.communitiesService
				.findOne(this.community)
				.subscribe(
					(data: ICommunity) =>
						(this.currentEntity = this.entitiesService.fromCommunity(data))
				);
			this.showEntrancesByCommunity();
		} else {
			this.showEntrancesByAccount();
			if (callback) {
				callback();
			}
		}
	}

	changeState(key: string): void {
		if (key === this.state) {
			return;
		}

		this.dataSort.page = 1;
		this.posts = [];
		this.state = key;
		this.initPostsByKey();
	}

	initPostsByKey(): void {
		switch (this.state) {
			case 'entrances':
				this.showEntrancesByAccount();
				break;
			case 'comments':
				this.showCommentsByAccount();
				break;
			case 'all':
				this.showAllEntrances();
				break;
			case 'communities':
				this.showEntrancesBySessionCommunities();
				break;
			case 'accounts':
				this.showEntrancesBySesssionFollowing();
				break;
		}
	}

	loadAccount(id: number): void {
		this.accountsService
			.findOne(id)
			.subscribe(
				(data: IAccount) =>
					(this.currentEntity = this.entitiesService.fromAccount(data))
			);
	}

	showEntrance(): void {
		this.entrancesService
			.getEntrance(this.entrance)
			.subscribe((data: IEntrance) => {
				this.post = this.postsService.fromEntrance(data);
				this.loadAccount(this.post.account.id);
			});
	}

	showComment(): void {
		this.commentsService
			.getComment(this.comment)
			.subscribe((data: IComment) => {
				this.post = this.postsService.fromComment(data);
				this.loadAccount(this.post.account.id);
			});
	}

	showAllEntrances(): void {
		this.entrancesService
			.getAllEntrances(this.dataSort)
			.subscribe((data: IEntrancePage) => {
				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromEntrances(data.content)
				);
			});
	}

	showEntrancesBySessionCommunities(): void {
		this.accountsService
			.getEntrancesBySessionCommunities(this.dataSort)
			.subscribe((data: IEntrancePage) => {
				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromEntrances(data.content)
				);
			});
	}

	showEntrancesBySesssionFollowing(): void {
		this.accountsService
			.getEntrancesBySessionFollowing(this.dataSort)
			.subscribe((data: IEntrancePage) => {
				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromEntrances(data.content)
				);
			});
	}

	showEntrancesByAccount(): void {
		this.accountsService
			.getEntrancesByAccount(this.account, this.dataSort)
			.subscribe((data: IEntrancePage) => {
				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromEntrances(data.content)
				);
			});
	}

	showEntrancesByCommunity(): void {
		this.communitiesService
			.getEntrancesByCommunity(this.community, this.dataSort)
			.subscribe((data: IEntrancePage) => {
				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromEntrances(data.content)
				);
			});
	}

	showCommentsByAccount(): void {
		this.accountsService
			.getCommentsByAccount(this.currentEntity.id, this.dataSort)
			.subscribe((data: ICommentPage) => {
				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromComments(data.content)
				);
			});
	}

	showCommentsByEntrance(): void {
		this.entrancesService
			.getResponses(this.entrance, this.dataSort)
			.subscribe((data: ICommentPage) => {
				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromComments(data.content)
				);
			});
	}

	showCommentsByComment(): void {
		this.commentsService
			.getResponses(this.comment, this.dataSort)
			.subscribe((data: ICommentPage) => {
				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromComments(data.content)
				);
			});
	}

	onPostClick(post: IPost): void {
		switch (post.type) {
			case 'entrance':
				this.locationService.navigateToEntrance(post.id);
				break;
			case 'comment':
				this.locationService.navigateToComment(post.id);
				break;
		}
	}

	onVotesClick(post: IPost, key: string): void {
		if (this.sessionAccount === null) {
			this.locationService.navigateToAuth();
		}

		this.interactivityService.calculateVotes(post, key);
	}

	onCommentsClick(post: IPost): void {
		if (this.sessionAccount === null) {
			this.locationService.navigateToAuth();
		}

		const a = this.componentFactoryService.createAlert(this.alertRef);

		a.instance.onAfterViewInit = () => {
			const component = this.componentFactoryService.generateComponent(
				PinspectComponent,
				a.instance.componentRef
			);

			component.instance.sessionAccount = this.sessionAccount;
			component.instance.post = post;
			component.instance.onSubmit = (comment: string) => {
				switch (post.type) {
					case 'entrance':
						this.entrancesService.comment(post.id, comment).subscribe(() => {
							if (this.entrance === undefined && this.comment === undefined) {
								this.locationService.navigateToEntrance(post.id);
							} else {
								post.comments++;
								this.componentFactoryService.destroyComponent(a);
								this.initialize();
							}
						});
						break;
					case 'comment':
						this.commentsService.comment(post.id, comment).subscribe(() => {
							if (this.entrance !== undefined && this.comment !== undefined) {
								this.locationService.navigateToComment(post.id);
							} else {
								post.comments++;
								this.componentFactoryService.destroyComponent(a);
								this.initialize();
							}
						});
						break;
				}
			};
		};
	}

	onLinksClick(key: string, type: string): void {
		const a = this.componentFactoryService.createAlert(this.alertRef);
		a.instance.onAfterViewInit = () => {
			const component = this.componentFactoryService.generateComponent(
				ElistComponent,
				a.instance.componentRef
			);

			component.instance.sessionAccount = this.sessionAccount;
			component.instance.header =
				key === 'following'
					? 'Siguiendo'
					: key === 'followers'
					? 'Seguidores'
					: 'Comunidades';

			component.instance.onFollowClick = (e: IEntity) => {
				if (this.sessionAccount === null) {
					this.locationService.navigateToAuth();
				}

				this.interactivityService.calculateFollow(e, (_e: IEntity) => {
					component.instance.updateEntity(_e);
					this.currentEntity.following += _e.sessionFollow === -1 ? -1 : 1;
				});
			};

			switch (type) {
				case 'account':
					this.handleAccountFollow(key, component);
					break;
				case 'community':
					this.handleCommunityFollow(component);
					break;
			}
		};
	}

	onProfileButtonClick(entity: IEntity): void {
		this.componentFactoryService.createAlert(this.alertRef);
	}

	openEntranceForm(entity: IEntity): void {
		if (this.sessionAccount === null) {
			this.locationService.navigateToAuth();
		}

		const a = this.componentFactoryService.createAlert(this.alertRef);
		a.instance.onAfterViewInit = () => {
			const componentRef = this.componentFactoryService.generateComponent(
				EntranceFormComponent,
				a.instance.componentRef
			);

			componentRef.instance.setEntranceData(
				this.formsService.fromPost(this.post)
			);
			componentRef.instance.onSuccess = () => {
				switch (componentRef.instance.state) {
					case 'post':
						this.communitiesService
							.createEntrance(
								entity.id,
								this.formsService.toEntranceForm(
									componentRef.instance.formGroup
								)
							)
							.subscribe(() => {
								this.componentFactoryService.destroyComponent(a);
								this.initialize();
							});
						break;
					case 'put':
						this.entrancesService
							.update(
								this.post.id,
								this.formsService.updatePost(
									this.post,
									componentRef.instance.formGroup
								)
							)
							.subscribe(() =>
								this.componentFactoryService.destroyComponent(a)
							);
				}
			};
		};
	}

	onDeleteClick(post: IPost): void {
		const a = this.componentFactoryService.createAlert(this.alertRef);

		a.instance.onAfterViewInit = () => {
			const componentRef = this.componentFactoryService.generateComponent(
				ConfirmComponent,
				a.instance.componentRef
			);

			componentRef.instance.message =
				'¿Estas seguro de que quieres eliminar el post?';
			componentRef.instance.buttonContent = 'Continuar';
			componentRef.instance.buttonType = 'error';
			componentRef.instance.onButtonClick = () => {
				if (this.post !== undefined && post.id === this.post.id) {
					switch (post.type) {
						case 'entrance':
							this.entrancesService
								.delete(post.id)
								.subscribe(() => this.locationService.navigateToHome());
							break;
						case 'comment':
							this.commentsService
								.delete(post.id)
								.subscribe(() => this.locationService.navigateToHome());
							break;
					}
				} else {
					this.commentsService.delete(post.id).subscribe(() => {
						this.initialize();
						this.componentFactoryService.destroyComponent(a);
					});
				}
			};
		};
	}

	handleAccountFollow(
		key: string,
		component: ComponentRef<ElistComponent>
	): void {
		switch (key) {
			case 'following':
				this.accountsService
					.getFollowingByAccount(this.currentEntity.id)
					.subscribe((data: IAccountFollowPage) => {
						component.instance.setEntities(
							this.entitiesService.fromAccounts(
								this.accountsService.getFollowing(data)
							)
						);
					});
				break;
			case 'followers':
				this.accountsService
					.getFollowersByAccount(this.currentEntity.id)
					.subscribe((data: IAccountFollowPage) => {
						component.instance.setEntities(
							this.entitiesService.fromAccounts(
								this.accountsService.getFollowers(data)
							)
						);
					});
				break;
		}
	}

	handleCommunityFollow(component: ComponentRef<ElistComponent>): void {
		this.communitiesService
			.getFollowersByAccount(this.currentEntity.id)
			.subscribe((data: ICommunityListPage) => {
				component.instance.setEntities(
					this.entitiesService.fromAccounts(
						this.communitiesService.getFollowers(data)
					)
				);
			});
	}
}
