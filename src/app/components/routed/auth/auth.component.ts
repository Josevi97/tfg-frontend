import {
	Component,
	ComponentFactoryResolver,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';
import { ComponentFactoryService } from 'src/app/services/componentFactory/component-factory.service';
import { AlertComponent } from '../../unrouted/alert/alert.component';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
	@ViewChild('alert', { read: ViewContainerRef }) alertRef: ViewContainerRef;

	constructor(
		private resolver: ComponentFactoryResolver,
		private componentFactory: ComponentFactoryService
	) {}

	ngOnInit(): void {}

	generateComponent() {
		const a = this.componentFactory.generateComponent(
			AlertComponent,
			this.alertRef
		);

		a.instance.onBackgroundClick = () =>
			this.componentFactory.destroyComponent(a);
	}
}
