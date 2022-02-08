import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
	@Input() public onInputChange: Function;
	@Input() public maxValue: number;

	public formGroup: FormGroup;
	public currentValue: number;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			value: [1],
		});
	}

	initValues(first: number, last: number): void {
		this.currentValue = first;
		this.maxValue = last;
		this.formGroup.get('value').setValue(first);
		this.formGroup
			.get('value')
			.setValidators([
				Validators.required,
				Validators.pattern('^[1-9][0-9]*$'),
				Validators.max(this.maxValue),
			]);
	}

	onButtonsClick(key: string): void {
		let aux = this.currentValue;

		switch (key) {
			case 'first':
				aux = 1;
				break;
			case 'back':
				aux--;
				break;
			case 'next':
				aux++;
				break;
			case 'last':
				aux = this.maxValue;
				break;
		}

		this.formGroup.get('value').setValue(aux);

		if (!this.formGroup.valid) {
			this.formGroup.get('value').setValue(this.currentValue);
			return;
		}

		this.currentValue = aux;

		if (this.onInputChange) {
			this.onInputChange(this.currentValue);
		}
	}

	change(): void {
		if (!this.formGroup.valid) {
			this.formGroup.get('value').setValue(this.currentValue);
			return;
		}

		this.currentValue = this.formGroup.get('value').value;

		if (this.onInputChange) {
			this.onInputChange(this.currentValue);
		}
	}
}
