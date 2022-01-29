import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
	public message: string;
	public buttonContent: string;
	public buttonType: string;
	public onButtonClick: Function;

	constructor(private ref: ChangeDetectorRef) {
		this.buttonType = 'primary';
	}

	ngOnInit(): void {}

	setMessage(message: string): void {
		this.message = message;
		this.ref.detectChanges();
	}

	setButtonContent(buttonContent: string): void {
		this.buttonContent = buttonContent;
		this.ref.detectChanges();
	}

	setButtonType(buttonType: string): void {
		this.buttonType = buttonType;
		this.ref.detectChanges();
	}

	setButtonOnClick(callback: Function): void {
		this.onButtonClick = callback;
		this.ref.detectChanges();
	}
}
