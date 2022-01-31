import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IAccountPage } from 'src/app/models/accounts.interface';
import { TableData } from 'src/app/models/table.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { TableService } from 'src/app/services/table/table.service';
import { ComponentFactoryService } from '../../../services/componentFactory/component-factory.service';
import { RegisterAccountComponent } from '../../unrouted/register-account/register-account.component';

@Component({
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;

	public tableData: TableData;

	constructor(
		private tableService: TableService,
		private accountsService: AccountsService,
		private componentFactory: ComponentFactoryService
	) {}

	ngOnInit(): void {
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
}
