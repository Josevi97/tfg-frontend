import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewContainerRef,
} from '@angular/core';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit, AfterViewInit, OnDestroy {
	@ViewChild('component', { read: ViewContainerRef })
	public componentRef: ViewContainerRef;

	public close: Function;
	public onAfterViewInit: Function;

	constructor(private ref: ChangeDetectorRef) {
		document.getElementById('body').style.overflow = 'hidden';
	}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		if (this.onAfterViewInit) {
			this.onAfterViewInit();
			this.ref.detectChanges();
		}
	}

	ngOnDestroy(): void {
		document.getElementById('body').style.overflow = 'auto';
	}
}
