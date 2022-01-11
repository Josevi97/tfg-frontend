import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-background',
	templateUrl: './background.component.html',
	styleUrls: ['./background.component.css'],
})
export class BackgroundComponent implements OnInit {
	@Input() onClick: Function;

	constructor() {
		if (!this.onClick) {
			const info = 'background.component: onclick: null';
			console.log(info);

			this.onClick = () => {
				console.log(info);
			};
		}
	}

	ngOnInit(): void {}
}
