import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount, IAccountPage } from 'src/app/models/accounts.interface';
import { TableData } from 'src/app/models/table.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { LocationService } from 'src/app/services/location/location.service';
import { TableService } from 'src/app/services/table/table.service';
import { ComponentFactoryService } from '../../../services/componentFactory/component-factory.service';
import { RegisterAccountComponent } from '../../unrouted/register-account/register-account.component';

@Component({
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;

	public sessionAccount: IAccount;
	public tableData: TableData;

	constructor(
		private locationService: LocationService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private tableService: TableService,
		private accountsService: AccountsService,
		private componentFactory: ComponentFactoryService
	) {}

	ngOnInit(): void {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];

		if (this.sessionAccount === null || !this.sessionAccount.admin) {
			this.router.navigate(['/home']);
		}

		this.accountsService
			.getAllAccounts()
			.subscribe(
				(data: IAccountPage) =>
					(this.tableData = this.tableService.fromAccounts(data.content))
			);
	}

	createAdmin(): void {
		const a = this.componentFactory.createAlert(this.alertRef);
		a.instance.onAfterViewInit = () => {
			const componentRef = this.componentFactory.generateComponent(
				RegisterAccountComponent,
				a.instance.componentRef
			);

			componentRef.instance.onSuccess = () =>
				this.componentFactory.destroyComponent(a);
		};
	}

	onRowClick(id: number): void {
		this.locationService.navigateToAccount(id);
	}

	onArrowsClick(key: string): void {
		console.log(key);
	}

	onInputChange(value: number): void {
		console.log(value);
	}

	onInputEnter(value: string): void {
		console.log(value);
	}
}
