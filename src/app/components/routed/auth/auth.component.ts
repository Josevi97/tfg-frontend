import {
	Component,
	ComponentRef,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INVALID_DATA, NO_DATA } from 'src/app/constants/form.constants';
import { IAccount } from 'src/app/models/accounts.interface';
import { ComponentFactoryService } from 'src/app/services/componentFactory/component-factory.service';
import { InitSessionComponent } from '../../unrouted/init-session/init-session.component';
import { PopupComponent } from '../../unrouted/popup/popup.component';
import { RegisterAccountComponent } from '../../unrouted/register-account/register-account.component';

@Component({
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;
	@ViewChild('popup', { read: ViewContainerRef }) popupRef: ViewContainerRef;

	private sessionAccount: IAccount;
	private popup: ComponentRef<PopupComponent>;

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private componentFactory: ComponentFactoryService
	) {}

	ngOnInit(): void {
		this.sessionAccount = this.activatedRoute.snapshot.data['session'];

		if (this.sessionAccount !== null) {
			this.router.navigate(['']);
		}
	}

	generateComponent(type: string) {
		const a = this.componentFactory.createAlert(this.alertRef);
		let component;

		a.instance.onAfterViewInit = () => {
			switch (type) {
				case 'init':
					component = this.componentFactory.generateComponent(
						InitSessionComponent,
						a.instance.componentRef
					);

					this.createPopup(component, 'init-session');
					break;
				case 'register':
					component = this.componentFactory.generateComponent(
						RegisterAccountComponent,
						a.instance.componentRef
					);

					component.instance.onSuccess = () =>
						this.componentFactory.destroyComponent(a);

					this.createPopup(component, 'register-account');
					break;
			}
		};
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
