import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
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
export class AlertComponent implements OnInit, AfterViewInit {
	@ViewChild('component', { read: ViewContainerRef })
	public componentRef: ViewContainerRef;

	public close: Function;
	public onAfterViewInit: Function;

	constructor(private ref: ChangeDetectorRef) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		if (this.onAfterViewInit) {
			this.onAfterViewInit();
			this.ref.detectChanges();
		}
	}
}
