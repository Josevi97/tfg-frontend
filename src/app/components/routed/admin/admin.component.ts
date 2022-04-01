import {
	Component,
	ComponentRef,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INVALID_DATA, NO_DATA } from 'src/app/constants/form.constants';
import { IAccount, IAccountPage } from 'src/app/models/accounts.interface';
import { ICommunityPage } from 'src/app/models/communities.interface';
import { IDataSort } from 'src/app/models/sort.interface';
import { TableData } from 'src/app/models/table.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { CommunitiesService } from 'src/app/services/communities/communities.service';
import { LocationService } from 'src/app/services/location/location.service';
import { TableService } from 'src/app/services/table/table.service';
import { ComponentFactoryService } from '../../../services/componentFactory/component-factory.service';
import { PopupComponent } from '../../unrouted/popup/popup.component';
import { RegisterAccountComponent } from '../../unrouted/register-account/register-account.component';
import { RegisterCommunityComponent } from '../../unrouted/register-community/register-community.component';
import { TableComponent } from '../../unrouted/table/table.component';

@Component({
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;
	@ViewChild('popup', { read: ViewContainerRef }) popupRef: ViewContainerRef;
	@ViewChild(TableComponent) private tableRef: TableComponent;

	public sessionAccount: IAccount;
	public tableData: TableData;
	public state: string;
	public sortData: IDataSort;
	public popup: ComponentRef<PopupComponent>;

	constructor(
		private locationService: LocationService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private tableService: TableService,
		private accountsService: AccountsService,
		private communitiesService: CommunitiesService,
		private componentFactory: ComponentFactoryService
	) {}

	ngOnInit(): void {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];

		if (this.sessionAccount === null || !this.sessionAccount.admin) {
			this.router.navigate(['/home']);
		}

		this.sortData = {
			page: 1,
			sort: 'id',
			size: 8,
			direction: true,
		};
		this.state = 'accounts';
		this.initData(1);
	}

	initData(page: number, filter: string = null): void {
		const auxData: IDataSort = this.sortData;
		auxData.page = page;

		switch (this.state) {
			case 'accounts':
				this.accountsService
					.getAllAccounts(auxData, filter)
					.subscribe((data: IAccountPage) => {
						this.sortData = auxData;
						this.tableData = this.tableService.fromAccounts(data.content);
						this.tableRef.pagiantionRef.initValues(page, data.totalPages);
					});
				break;
			case 'communities':
				this.communitiesService
					.getAllCommunities(auxData, filter)
					.subscribe((data: ICommunityPage) => {
						this.sortData = auxData;
						this.tableData = this.tableService.fromCommunities(data.content);
						this.tableRef.pagiantionRef.initValues(page, data.totalPages);
					});
				break;
		}
	}

	createAdmin(): void {
		const a = this.componentFactory.createAlert(this.alertRef);
		a.instance.onAfterViewInit = () => {
			const componentRef = this.componentFactory.generateComponent(
				RegisterAccountComponent,
				a.instance.componentRef
			);

			componentRef.instance.onSuccess = () => {
				this.componentFactory.destroyComponent(a);

				if (this.state === 'accounts') {
					this.initData(this.sortData.page);
				}
			};

			this.createPopup(componentRef, 'register-admin');
		};
	}

	createCommunity(): void {
		const a = this.componentFactory.createAlert(this.alertRef);
		a.instance.onAfterViewInit = () => {
			const componentRef = this.componentFactory.generateComponent(
				RegisterCommunityComponent,
				a.instance.componentRef
			);

			componentRef.instance.onSuccess = () => {
				this.componentFactory.destroyComponent(a);

				if (this.state === 'communities') {
					this.initData(this.sortData.page);
				}
			};

			this.createPopup(componentRef, 'create-community');
		};
	}

	onRowClick(id: number): void {
		switch (this.state) {
			case 'accounts':
				this.locationService.navigateToAccount(id);
				break;
			case 'communities':
				this.locationService.navigateToCommunity(id);
				break;
		}
	}

	onInputChange(value: number): void {
		this.initData(value);
	}

	onHeaderClick(key: string, direction: boolean): void {
		if (true) {
			this.sortData.sort = key;
			this.sortData.direction = direction;
			this.initData(this.sortData.page);
		}
	}

	onInputEnter(value: string): void {
		console.log(value);
		this.initData(1, value);
	}

	changeState(key: string): void {
		this.sortData = {
			page: 1,
			sort: 'id',
			size: 8,
			direction: true,
		};
		this.state = key;
		this.initData(1);
	}

	createPopup(component: ComponentRef<any>, id: string): void {
		component.instance.onFail = (key: string) => {
			this.popup = this.componentFactory.createPopup(
				this.popupRef,
				key === 'void' ? NO_DATA : INVALID_DATA,
				`${id}_${key}`,
				this.popup,
				() => {
					this.popup = null;
				}
			);
		};
	}
}
