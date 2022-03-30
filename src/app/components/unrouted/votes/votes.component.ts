import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-votes',
	templateUrl: './votes.component.html',
	styleUrls: ['./votes.component.css'],
})
export class VotesComponent implements OnInit {
	@Input() public onClick: Function;
	@Input() public vote: number;
	@Input() public votes: number;
	@Input() public offset: boolean;

	constructor() {}

	ngOnInit(): void {}
}
