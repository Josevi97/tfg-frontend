import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IEntity } from 'src/app/models/entities.interface';

@Component({
	selector: 'app-entity-details',
	templateUrl: './entity-details.component.html',
	styleUrls: ['./entity-details.component.css'],
})
export class EntityDetailsComponent implements OnInit {
	@Input() onEdit: Function;
	@Input() onDelete: Function;

	public entity: IEntity;

	constructor(private ref: ChangeDetectorRef) {}

	ngOnInit(): void {}

	setEntity(entity: IEntity): void {
		this.entity = entity;
		this.ref.detectChanges();
	}
}
