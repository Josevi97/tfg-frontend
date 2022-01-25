import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEntity } from 'src/app/models/entities.interface';

@Component({
	selector: 'app-entity',
	templateUrl: './entity.component.html',
	styleUrls: ['./entity.component.css'],
})
export class EntityComponent implements OnInit {
	@Input() public show: boolean;
	@Input() public entity: IEntity;
	@Input() public active: boolean;
	@Input() public showFollowButton: boolean;
	@Input() public onLinksClick: Function;

	constructor(private router: Router) {}

	ngOnInit(): void {}

	navigateToAccount(): void {
		this.router.navigate([`/${this.entity.type}/${this.entity.id}`]);
	}
}
