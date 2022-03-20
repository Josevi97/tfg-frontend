import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IAccount } from 'src/app/models/accounts.interface';
import { IEntity } from 'src/app/models/entities.interface';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
	selector: 'app-elist',
	templateUrl: './elist.component.html',
	styleUrls: ['./elist.component.css'],
})
export class ElistComponent implements OnInit {
	@Input() public onFollowClick: Function;
	@Input() public entities: IEntity[];
	@Input() public header: string;
	@Input() public sessionAccount: IAccount;
	@Input() public hide: boolean;
	@Input() public show: boolean;
	@Input() public blackList: number[];
	@Input() public onScroll: Function;

	constructor(
		private location: LocationService,
		private ref: ChangeDetectorRef
	) {
		this.show = true;
		this.blackList = [];
	}

	ngOnInit(): void {}

	navigateToEntity(entity: IEntity): void {
		if (entity.type === 'account') {
			this.location.navigateToAccount(entity.id);
		} else this.location.navigateToCommunity(entity.id);
	}

	setEntities(entities: IEntity[]): void {
		this.entities = entities;
		this.ref.detectChanges();
	}

	updateEntity(entity: IEntity) {
		this.entities.filter((_e) => _e.id === entity.id)[0] = entity;
		this.ref.detectChanges();
	}

	isNotInBlackList(entity: IEntity): boolean {
		return this.blackList.findIndex((id: number) => id === entity.id) === -1;
	}
}
