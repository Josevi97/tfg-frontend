import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFactoryService } from '../../../services/componentFactory/component-factory.service';
import { RegisterAccountComponent } from '../../unrouted/register-account/register-account.component';

@Component({
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;

	constructor(private componentFactory: ComponentFactoryService) {}

	ngOnInit(): void {}

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
