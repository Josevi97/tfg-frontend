import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEntity } from 'src/app/models/entities.interface';
import { InteractivityService } from 'src/app/services/interactivity/interactivity.service';

@Component({
	selector: 'app-entity',
	templateUrl: './entity.component.html',
	styleUrls: ['./entity.component.css'],
})
export class EntityComponent implements OnInit {
	@Input() public show: boolean;
	@Input() public entity: IEntity;
	@Input() public active: boolean;
	@Input() public onLinksClick: Function;
	@Input() public showFollowButton: boolean;

	constructor(
		private router: Router,
		private interactivityService: InteractivityService
	) {}

	ngOnInit(): void {}

	navigateToAccount(): void {
		this.router.navigate([`/${this.entity.type}/${this.entity.id}`]);
	}

	onFollowClick() {
		this.interactivityService.calculateFollow(
			this.entity,
			(e: IEntity) => (this.entity = e)
		);
	}
}