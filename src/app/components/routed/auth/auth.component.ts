import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFactoryService } from 'src/app/services/componentFactory/component-factory.service';
import { AlertComponent } from '../../unrouted/alert/alert.component';
import { InitSessionComponent } from '../../unrouted/init-session/init-session.component';
import { RegisterAccountComponent } from '../../unrouted/register-account/register-account.component';

@Component({
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;

	constructor(private componentFactory: ComponentFactoryService) {}

	ngOnInit(): void {}

	generateComponent(type: string) {
		const a = this.componentFactory.createAlert(this.alertRef);

		a.instance.onAfterViewInit = () => {
			switch (type) {
				case 'init':
					this.componentFactory.generateComponent(
						InitSessionComponent,
						a.instance.componentRef
					);
					break;
				case 'register':
					const componentRef = this.componentFactory.generateComponent(
						RegisterAccountComponent,
						a.instance.componentRef
					);

					componentRef.instance.onSuccess = () =>
						this.componentFactory.destroyComponent(a);
					break;
			}
		};
	}
}
