import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-list-end',
	templateUrl: './list-end.component.html',
	styleUrls: ['./list-end.component.css'],
})
export class ListEndComponent implements OnInit {
	@Input() public hasContent: boolean;

	constructor() {}

	ngOnInit(): void {}
}
