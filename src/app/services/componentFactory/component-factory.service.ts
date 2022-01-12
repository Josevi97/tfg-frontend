import {
	ComponentFactoryResolver,
	ComponentRef,
	Injectable,
	ViewContainerRef,
} from '@angular/core';

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
}
