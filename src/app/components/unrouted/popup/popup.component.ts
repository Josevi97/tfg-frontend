import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
	public onClick: Function;
	public id: string;
	public texts: string[];
	public index: number;
	public timeout: any;

	constructor(private ref: ChangeDetectorRef) {
		this.index = 0;
		this.startTimeout();
	}

	ngOnInit(): void {}

	setOnClick(onClick: Function): void {
		this.onClick = onClick;
		this.ref.detectChanges();
	}

	init(id: string, texts: string[]): void {
		this.id = id;
		this.texts = texts;
		this.ref.detectChanges();
	}

	next(): void {
		this.index = this.index + 1 >= this.texts.length ? 0 : this.index + 1;
		this.startTimeout();
		this.ref.detectChanges();
	}

	startTimeout(): void {
		this.timeout = setTimeout(() => {
			if (this.onClick) {
				this.onClick();
			}
		}, 3000);
	}

	clearTimeout(): void {
		clearTimeout(this.timeout);
	}
}
