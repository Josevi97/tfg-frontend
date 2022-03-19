import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableData } from 'src/app/models/table.interface';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
	@ViewChild(PaginationComponent) public pagiantionRef: PaginationComponent;

	@Input() public onRowClick: Function;
	@Input() public onInputChange: Function;
	@Input() public onFilterEnter: Function;
	@Input() public onHeadClick: Function;
	@Input() public tableData: TableData;

	public formGroup: FormGroup;
	public currentValue: string;
	public state: string;
	public direction: boolean;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.state = 'id';
		this.direction = true;

		this.formGroup = this.formBuilder.group({
			input: ['', Validators.required],
		});
	}

	onSubmit(): void {
		this.currentValue = this.formGroup.get('input').value;
		this.onFilterEnter(this.currentValue);
	}

	onHeaderClick(key: string): void {
		this.direction = key === this.state ? !this.direction : true;
		this.state = key;

		if (this.onHeadClick) {
			this.onHeadClick(this.state, this.direction);
		}
	}
}
