import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: ['./background.component.css'],
})
export class BackgroundComponent implements OnInit {
	@Input() public onClick: Function;

	constructor() {}

	ngOnInit(): void {}
}
