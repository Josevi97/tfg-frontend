import { Component, Input, OnInit } from '@angular/core';
import { ISort } from 'src/app/models/sort.interface';

@Component({
	selector: 'app-sort',
	templateUrl: './sort.component.html',
	styleUrls: ['./sort.component.css'],
})
export class SortComponent implements OnInit {
	@Input() public extraState: string;
	@Input() public extraElements: ISort[];
	@Input() public onExtraClick: Function;

	public state: string;
	public data: ISort[];

	constructor() {
		this.state = 'new';
		this.data = [
			{
				icon: 'calendar_today',
				text: 'Nuevo',
				key: 'new',
			},
			{
				icon: 'whatshot',
				text: 'Activos',
				key: 'hot',
			},
			{
				icon: 'comment',
				text: 'Comentarios',
				key: 'comments',
			},
			{
				icon: 'star_outline',
				text: 'Votos',
				key: 'votes',
			},
		];
	}

	ngOnInit(): void {}

	onClick(identifier: string): void {
		this.state = identifier;
	}
}
