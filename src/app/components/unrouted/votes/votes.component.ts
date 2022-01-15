import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-votes',
	templateUrl: './votes.component.html',
	styleUrls: ['./votes.component.css'],
})
export class VotesComponent implements OnInit {
	@Input() public onVoteUpClick: Function;
	@Input() public onVoteDownClick: Function;
	@Input() public votes: number;

	constructor() {}

	ngOnInit(): void {}
}
