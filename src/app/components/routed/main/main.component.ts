import {
	Component,
	ComponentRef,
	HostListener,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment, ICommentPage } from 'src/app/models/comments.interface';
import {
	ICommunity,
	ICommunityListPage,
	ICommunityPage,
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
	IAccountPage,
} from '../../../models/accounts.interface';
import { ConfirmComponent } from '../../unrouted/confirm/confirm.component';
import { ElistComponent } from '../../unrouted/elist/elist.component';
import { EntranceFormComponent } from '../../unrouted/entrance-form/entrance-form.component';
import { PinspectComponent } from '../../unrouted/pinspect/pinspect.component';
import { SortComponent } from '../../unrouted/sort/sort.component';
import { EntityDetailsComponent } from '../../unrouted/entity-details/entity-details.component';

@Component({
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;
	@ViewChild(SortComponent) public sortComponent: SortComponent;

	public sessionAccount: IAccount;
	public currentEntity: IEntity;
	public posts: IPost[];
	public post: IPost;
	public account: number;
	public community: number;
	public entrance: number;
	public comment: number;
	public recommendedCommunities: IEntity[];
	public recommendedAccounts: IEntity[];

	public state: string;
	public sortData: ISort[];
	public dataSort: IDataSort;

	@HostListener('window:scroll', ['$event'])
	onScroll(): void {
		this.infiniteService.onScroll(window, () => {
			this.dataSort.page++;

			if (this.community) {
				this.showEntrancesByCommunity();
			} else if (this.entrance) {
				this.showCommentsByEntrance();
			} else if (this.comment) {
				this.showCommentsByComment();
			} else {
				this.initPostsByKey(null);
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
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
		this.account = this.activatedRoute.snapshot.params['account'];
		this.community = this.activatedRoute.snapshot.params['community'];
		this.entrance = this.activatedRoute.snapshot.params['entrance'];
		this.comment = this.activatedRoute.snapshot.params['comment'];

		this.currentEntity = this.entitiesService.fromAccount(this.sessionAccount);
	}

	ngOnInit(): void {
		this.loadRecommendations();
		this.initialize();
	}

	reset(): void {
		this.loadRecommendations();
		this.sortComponent.reset();
		this.changeState('all', 'id');
	}

	loadRecommendations(): void {
		const registers = !this.currentEntity || !this.sessionAccount ? 5 : 3;
		const accountBlackList = this.sessionAccount
			? [
					this.sessionAccount.id,
					this.currentEntity &&
					this.currentEntity.type === 'account' &&
					this.currentEntity.id !== this.sessionAccount.id
						? this.currentEntity.id
						: 0,
			  ]
			: [0];
		const accountSortData = {
			page: 1,
			sort: '',
			size: registers,
			direction: true,
		};
		const communityBlackList = [
			this.currentEntity && this.currentEntity.type === 'community'
				? this.currentEntity.id
				: 0,
		];
		const communitySortData = {
			page: 1,
			sort: '',
			size: registers,
			direction: true,
		};

		this.accountsService
			.getRandom(accountBlackList, accountSortData)
			.subscribe((data: IAccountPage) => {
				this.recommendedAccounts = this.entitiesService.fromAccounts(
					data.content
				);
			});
		this.communitiesService
			.getRandom(communityBlackList, communitySortData)
			.subscribe((data: ICommunityPage) => {
				this.recommendedCommunities = this.entitiesService.fromCommunities(
					data.content
				);
			});
	}

	initialize(): void {
		this.posts = [];
		this.dataSort = {
			page: 1,
			sort: 'id',
			size: 10,
			direction: false,
		};

		if (!this.entrance && !this.comment) {
			this.initSortData();
			this.initPosts();
		} else if (this.entrance) {
			this.showEntrance();
			this.showCommentsByEntrance();
		} else {
			this.showComment();
			this.showCommentsByComment();
		}
	}

	initSortData(): void {
		if (!this.sessionAccount) {
			return;
		}

		if (!this.account && !this.community) {
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
		} else if (this.account) {
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
		if (!this.account && !this.community) {
			this.showAllEntrances();
		} else if (this.community) {
			this.showEntrancesByCommunity();
			this.communitiesService
				.findOne(this.community)
				.subscribe(
					(data: ICommunity) =>
						(this.currentEntity = this.entitiesService.fromCommunity(data))
				);
		} else {
			this.showEntrancesByAccount();
			this.loadAccount(this.account);
		}
	}

	changeState(key: string, orderBy: string = this.dataSort.sort): void {
		if (key === this.state && orderBy === this.dataSort.sort) {
			return;
		}

		this.state = key;
		this.dataSort.page = 1;
		this.dataSort.sort = orderBy;
		this.initPostsByKey(() => {
			this.posts = [];
		});
	}

	initPostsByKey(callback: Function): void {
		switch (this.state) {
			case 'entrances':
				this.showEntrancesByAccount(callback);
				break;
			case 'comments':
				this.showCommentsByAccount(callback);
				break;
			case 'all':
				this.showAllEntrances(callback);
				break;
			case 'communities':
				this.showEntrancesBySessionCommunities(callback);
				break;
			case 'accounts':
				this.showEntrancesBySesssionFollowing(callback);
				break;
		}
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
		if (!this.sessionAccount) {
			this.locationService.navigateToAuth();
		}

		this.interactivityService.calculateVotes(post, key);
	}

	onCommentsClick(post: IPost): void {
		if (!this.sessionAccount) {
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
			component.instance.onCiteClick = (p: IPost) =>
				this.locationService.navigateToComment(p.id);
			component.instance.onSubmit = (comment: string) => {
				switch (post.type) {
					case 'entrance':
						this.entrancesService.comment(post.id, comment).subscribe(() => {
							this.locationService.navigateToEntrance(post.id);
						});
						break;
					case 'comment':
						this.commentsService.comment(post.id, comment).subscribe(() => {
							this.locationService.navigateToComment(post.id);
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
				this.onFollowClick(true, () => component.instance.updateEntity(e), e);
			};

			switch (type) {
				case 'account':
					this.handleAccountFollowList(key, component);
					break;
				case 'community':
					this.handleCommunityFollowList(component);
					break;
			}
		};
	}

	handleAccountFollowList(
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
			case 'communities':
				this.accountsService
					.getCommunitiesByAccount(this.currentEntity.id)
					.subscribe((data: ICommunityListPage) => {
						component.instance.setEntities(
							this.entitiesService.fromCommunities(
								this.accountsService.getCommunities(data)
							)
						);
					});
				break;
		}
	}

	handleCommunityFollowList(component: ComponentRef<ElistComponent>): void {
		this.communitiesService
			.getFollowersByCommunity(this.currentEntity.id)
			.subscribe((data: ICommunityListPage) => {
				component.instance.setEntities(
					this.entitiesService.fromAccounts(
						this.communitiesService.getFollowers(data)
					)
				);
			});
	}

	onProfileButtonClick(entity: IEntity): void {
		const a = this.componentFactoryService.createAlert(this.alertRef);
		a.instance.onAfterViewInit = () => {
			const component = this.componentFactoryService.generateComponent(
				EntityDetailsComponent,
				a.instance.componentRef
			);

			component.instance.setEntity(entity);
			component.instance.onDelete = () => this.locationService.navigateToHome();
			component.instance.onEdit = () => {
				switch (entity.type) {
					case 'account':
						this.locationService.navigateToAccount(entity.id);
						break;
					case 'community':
						this.locationService.navigateToCommunity(entity.id);
						break;
				}
			};
		};
	}

	onFollowClick(
		findIntoRandoms: boolean = false,
		callback: Function,
		entity: IEntity
	): void {
		if (!this.sessionAccount) {
			this.locationService.navigateToAuth();
		}

		this.interactivityService.calculateFollow(entity, (e: IEntity) => {
			if (
				this.sessionAccount.id === this.currentEntity.id &&
				this.currentEntity.type === 'account'
			) {
				const value = entity.sessionFollow === -1 ? -1 : 1;

				if (findIntoRandoms) {
					this.fixIntoRandoms(entity);
				}

				switch (entity.type) {
					case 'community':
						this.currentEntity.communities += value;
						break;
					default:
						this.currentEntity.following += value;
						break;
				}

				if (callback) {
					callback(e);
				}
			}
		});
	}

	fixIntoRandoms(_e: IEntity): void {
		let array: IEntity[];

		switch (_e.type) {
			case 'community':
				array = this.recommendedCommunities;
				break;
			case 'account':
				array = this.recommendedAccounts;
				break;
		}

		const index = array.findIndex((entity: IEntity) => entity.id === _e.id);

		if (array[index]) {
			array[index].sessionFollow = _e.sessionFollow;
		}
	}

	openEntranceForm(entity: IEntity): void {
		if (!this.sessionAccount) {
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
				if (this.post && post.id === this.post.id) {
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

	showAllEntrances(callback: Function = null): void {
		this.entrancesService
			.getAllEntrances(this.dataSort)
			.subscribe((data: IEntrancePage) => {
				if (callback) {
					callback();
				}

				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromEntrances(data.content)
				);
			});
	}

	showEntrancesBySessionCommunities(callback: Function = null): void {
		this.accountsService
			.getEntrancesBySessionCommunities(this.dataSort)
			.subscribe((data: IEntrancePage) => {
				if (callback) {
					callback();
				}

				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromEntrances(data.content)
				);
			});
	}

	showEntrancesBySesssionFollowing(callback: Function = null): void {
		this.accountsService
			.getEntrancesBySessionFollowing(this.dataSort)
			.subscribe((data: IEntrancePage) => {
				if (callback) {
					callback();
				}

				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromEntrances(data.content)
				);
			});
	}

	showEntrancesByAccount(callback: Function = null): void {
		this.accountsService
			.getEntrancesByAccount(this.account, this.dataSort)
			.subscribe((data: IEntrancePage) => {
				if (callback) {
					callback();
				}

				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromEntrances(data.content)
				);
			});
	}

	showEntrancesByCommunity(callback: Function = null): void {
		this.communitiesService
			.getEntrancesByCommunity(this.community, this.dataSort)
			.subscribe((data: IEntrancePage) => {
				if (callback) {
					callback();
				}

				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromEntrances(data.content)
				);
			});
	}

	showCommentsByAccount(callback: Function = null): void {
		this.accountsService
			.getCommentsByAccount(this.currentEntity.id, this.dataSort)
			.subscribe((data: ICommentPage) => {
				if (callback) {
					callback();
				}

				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromComments(data.content)
				);
			});
	}

	showCommentsByEntrance(callback: Function = null): void {
		this.entrancesService
			.getResponses(this.entrance, this.dataSort)
			.subscribe((data: ICommentPage) => {
				if (callback) {
					callback();
				}

				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromComments(data.content)
				);
			});
	}

	showCommentsByComment(callback: Function = null): void {
		this.commentsService
			.getResponses(this.comment, this.dataSort)
			.subscribe((data: ICommentPage) => {
				if (callback) {
					callback();
				}

				Array.prototype.push.apply(
					this.posts,
					this.postsService.fromComments(data.content)
				);
			});
	}
}
