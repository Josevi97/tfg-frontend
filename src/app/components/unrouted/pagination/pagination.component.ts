import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
	@Input() public onArrowsClick: Function;
	@Input() public onInputChange: Function;

	public formGroup: FormGroup;
	private currentValue: string;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.currentValue = '1';
		this.formGroup = this.formBuilder.group({
			value: [
				this.currentValue,
				[Validators.required, Validators.pattern('^[1-9][0-9]*$')],
			],
		});
	}

	change(): void {
		if (!this.formGroup.valid) {
			this.formGroup.get('value').setValue(this.currentValue);
			return;
		}

		if (this.onInputChange) {
			this.currentValue = this.formGroup.get('value').value;
			this.onInputChange(this.currentValue);
		}
	}
}
