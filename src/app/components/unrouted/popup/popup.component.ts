import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	OnInit,
} from '@angular/core';

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

	constructor(private ref: ChangeDetectorRef) {
		this.index = 0;
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
		this.ref.detectChanges();
	}
}
