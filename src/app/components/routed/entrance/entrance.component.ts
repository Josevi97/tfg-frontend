import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEntrance } from 'src/app/models/entrances.interface';

@Component({
	templateUrl: './entrance.component.html',
	styleUrls: ['./entrance.component.css'],
})
export class EntranceComponent implements OnInit {
	public entrance: IEntrance;

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.entrance = this.activatedRoute.snapshot.params['entrance'];
	}
}
