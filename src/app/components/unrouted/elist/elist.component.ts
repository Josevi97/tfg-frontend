import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IAccount } from 'src/app/models/accounts.interface';
import { IEntity } from 'src/app/models/entities.interface';

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

	constructor(private ref: ChangeDetectorRef) {}

	ngOnInit(): void {}

	setEntities(entities: IEntity[]): void {
		this.entities = entities;
		this.ref.detectChanges();
		console.log(this.entities);
	}

	updateEntity(entity: IEntity) {
		this.entities.filter((_e) => _e.id === entity.id)[0] = entity;
		this.ref.detectChanges();
	}
}
