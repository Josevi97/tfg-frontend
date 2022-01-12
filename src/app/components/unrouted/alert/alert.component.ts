import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
	public onBackgroundClick: Function;

	constructor() {}

	ngOnInit(): void {}
}
