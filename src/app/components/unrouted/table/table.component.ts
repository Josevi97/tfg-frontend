import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableData } from 'src/app/models/table.interface';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
	@Input() public onRowClick: Function;
	@Input() public onArrowsClick: Function;
	@Input() public onInputChange: Function;
	@Input() public onFilterEnter: Function;
	@Input() public tableData: TableData;

	public formGroup: FormGroup;
	private currentValue: string;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			input: ['', Validators.required],
		});
	}

	onSubmit(): void {
		if (
			!this.onFilterEnter ||
			this.formGroup.get('input').value === this.currentValue
		) {
			return;
		}

		this.currentValue = this.formGroup.get('input').value;
		this.onFilterEnter(this.currentValue);
	}
}
