import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEntrance } from 'src/app/models/entrances.interface';
import { IconsService } from 'src/app/services/icons/icons.service';

@Component({
	selector: 'app-entrance',
	templateUrl: './entrance.component.html',
	styleUrls: ['./entrance.component.css'],
})
export class EntranceComponent implements OnInit {
	@Input() public onCommentsClick: Function;
	@Input() public entrance: IEntrance;

	constructor(public iconsService: IconsService, public router: Router) {}

	ngOnInit(): void {}

	navigateToEntrance(): void {
		this.router.navigate([`/entrance/${this.entrance.id}`]);
	}
}
