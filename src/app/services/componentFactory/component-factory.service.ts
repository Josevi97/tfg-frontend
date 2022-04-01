import {
	ComponentFactoryResolver,
	ComponentRef,
	Injectable,
	ViewContainerRef,
} from '@angular/core';
import { AlertComponent } from 'src/app/components/unrouted/alert/alert.component';
import { PopupComponent } from 'src/app/components/unrouted/popup/popup.component';

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

	createPopup(
		componentRef: ViewContainerRef,
		texts: string[],
		id: string,
		popup: ComponentRef<PopupComponent> = null,
		onClick: Function = null
	): ComponentRef<PopupComponent> {
		if (!popup || id !== popup.instance.id) {
			const p = this.generateComponent(PopupComponent, componentRef);

			p.instance.init(id, texts);
			p.instance.setOnClick(() => {
				onClick();
				this.destroyComponent(p);
			});

			return p;
		}

		popup.instance.next();
		return popup;
	}
}
