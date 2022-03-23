import {
	ComponentFactoryResolver,
	ComponentRef,
	Injectable,
	ViewContainerRef,
} from '@angular/core';
import { AlertComponent } from 'src/app/components/unrouted/alert/alert.component';
import { ConfirmComponent } from 'src/app/components/unrouted/confirm/confirm.component';

@Injectable({
	providedIn: 'root',
})
export class ComponentFactoryService {
	constructor(private resolver: ComponentFactoryResolver) {}

	generateComponent(
		component: any,
		componentRef: ViewContainerRef
	): ComponentRef<any> {
		componentRef.clear();

		const factory = this.resolver.resolveComponentFactory(component);
		const alert = componentRef.createComponent(factory);

		return alert;
	}

	destroyComponent(componentRef: ComponentRef<any>) {
		componentRef.destroy();
	}

	createAlert(componentRef: ViewContainerRef): ComponentRef<AlertComponent> {
		const a = this.generateComponent(AlertComponent, componentRef);

		a.instance.close = () => this.destroyComponent(a);
		return a;
	}
}
