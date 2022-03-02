import {
	Component,
	ElementRef,
	HostListener,
	Input,
	OnInit,
} from '@angular/core';

@Component({
	selector: 'app-deploy',
	templateUrl: './deploy.component.html',
	styleUrls: ['./deploy.component.css'],
})
export class DeployComponent implements OnInit {
	@Input() onClickOut: Function;

	private clicksCount: number;

	constructor(private elementRef: ElementRef) {}

	ngOnInit(): void {}

	@HostListener('document:click', ['$event'])
	clickout(event: any) {
		if (
			this.clicksCount != 0 &&
			!this.elementRef.nativeElement.contains(event.target)
		) {
			this.onClickOut();
		}

		this.clicksCount++;
	}
}
