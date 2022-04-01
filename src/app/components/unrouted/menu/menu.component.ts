import {
	Component,
	Input,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount, IAccountPage } from 'src/app/models/accounts.interface';
import { ICommunityPage } from 'src/app/models/communities.interface';
import { IEntity } from 'src/app/models/entities.interface';
import { IDataSort } from 'src/app/models/sort.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { CommunitiesService } from 'src/app/services/communities/communities.service';
import { ComponentFactoryService } from 'src/app/services/componentFactory/component-factory.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { InteractivityService } from 'src/app/services/interactivity/interactivity.service';
import { LocationService } from 'src/app/services/location/location.service';
import { SessionService } from 'src/app/services/session/session.service';
import { ElistComponent } from '../elist/elist.component';
import { InfiniteService } from '../../../services/infinite/infinite.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;

	@Input() public onFollowClick: Function;
	@Input() public onHomeReset: Function;

	public formGroup: FormGroup;
	public sessionAccount: IAccount;
	public showDeploy: boolean;
	public showAccountsButton: boolean;
	public showCommunitiesButton: boolean;
	public accounts: IEntity[];
	public communities: IEntity[];
	public inputFocus: boolean;

	constructor(
		private componentFactoryService: ComponentFactoryService,
		private locationService: LocationService,
		private interactivityService: InteractivityService,
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private sessionService: SessionService,
		private accountsService: AccountsService,
		private communitiesService: CommunitiesService,
		private entitiesService: EntitiesService,
		private InfiniteService: InfiniteService,
		public router: Router
	) {
		this.formGroup = this.formBuilder.group({
			search: [''],
		});
	}

	ngOnInit(): void {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];
	}

	checkSession(): void {}

	logout(): void {
		this.sessionService.logout().subscribe(() => {
			this.sessionAccount = this.activatedRoute.snapshot.data['data'];
			this.router.navigate(['/auth']);
		});
	}

	hideDeploy(): void {
		this.showDeploy = false;
		this.showAccountsButton = false;
		this.showCommunitiesButton = true;
		this.accounts = [];
		this.communities = [];
	}

	onSubmit(): void {
		const value = this.formGroup.get('search')!.value;

		if (!value) {
			this.hideDeploy();
			return;
		}

		const sortData: IDataSort = {
			page: 1,
			sort: 'id',
			size: 3,
			direction: true,
		};

		this.accountsService.getAccountsByLogin(value, sortData).subscribe(
			(data: IAccountPage) => {
				this.showDeploy = true;
				this.showAccountsButton = data.totalElements > 3;
				this.accounts = this.entitiesService.fromAccounts(data.content);
			},
			() => (this.accounts = [])
		);

		this.communitiesService.getCommunitiesByName(value, sortData).subscribe(
			(data: ICommunityPage) => {
				this.showDeploy = true;
				this.showCommunitiesButton = data.totalElements > 3;
				this.communities = this.entitiesService.fromCommunities(data.content);
			},
			() => (this.communities = [])
		);
	}

	onDeployClickOut(): void {
		if (!this.inputFocus) {
			this.showDeploy = false;
		}
	}

	onViewMoreClick(key: string): void {
		this.hideDeploy();

		const a = this.componentFactoryService.createAlert(this.alertRef);

		a.instance.onAfterViewInit = () => {
			const component = this.componentFactoryService.generateComponent(
				ElistComponent,
				a.instance.componentRef
			);

			const value = this.formGroup.get('search')!.value;
			const sortData: IDataSort = {
				page: 1,
				sort: 'id',
				size: 20,
				direction: true,
			};

			component.instance.sessionAccount = this.sessionAccount;
			component.instance.onScroll = () =>
				this.addEntities(key, component, value, sortData);

			if (this.onFollowClick) {
				component.instance.onFollowClick = (e: IEntity) => {
					this.onFollowClick((_e: IEntity) => {
						component.instance.updateEntity(_e);
					}, e);
				};
			} else {
				component.instance.onFollowClick = (e: IEntity) => {
					this.followClick(e, (_e: IEntity) =>
						component.instance.updateEntity(_e)
					);
				};
			}

			this.addEntities(key, component, value, sortData);
		};
	}

	addEntities(
		key: string,
		component: any,
		value: string,
		sortData: IDataSort
	): void {
		switch (key) {
			case 'accounts':
				component.instance.header = 'Cuentas';
				this.accountsService
					.getAccountsByLogin(value, sortData)
					.subscribe((data: IAccountPage) => {
						component.instance.addEntities(
							this.entitiesService.fromAccounts(data.content)
						);
					});
				break;
			case 'communities':
				component.instance.header = 'Comunidades';
				this.communitiesService
					.getCommunitiesByName(value, sortData)
					.subscribe((data: ICommunityPage) => {
						component.instance.addEntities(
							this.entitiesService.fromCommunities(data.content)
						);
					});
				break;
		}

		sortData.page++;
	}

	followClick(entity: IEntity, callback: Function): boolean {
		if (!this.sessionAccount) {
			this.locationService.navigateToAuth();
		}

		this.interactivityService.calculateFollow(entity, (_e: IEntity) => {
			if (callback) {
				callback(_e);
			}
		});

		return true;
	}

	goToHome(): void {
		if (this.router.url === '/home') {
			if (this.onHomeReset) {
				this.onHomeReset();
				window.scrollTo(0, 0);
			}
		} else this.router.navigate(['home']);
	}
}
