import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'app-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
	private clicksCount: number;
	public outClick: Function;

	constructor(private elementRef: ElementRef) {
		this.clicksCount = 0;
	}

	ngOnInit(): void {}

	@HostListener('document:click', ['$event'])
	clickout(event: any) {
		if (
			this.clicksCount != 0 &&
			!this.elementRef.nativeElement.contains(event.target)
		) {
			this.outClick();
		}

		this.clicksCount++;
	}
}
