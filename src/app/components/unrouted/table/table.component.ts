import { Component, Input, OnInit } from '@angular/core';
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
	@Input() public tableData: TableData;

	constructor() {}

	ngOnInit(): void {}
}
