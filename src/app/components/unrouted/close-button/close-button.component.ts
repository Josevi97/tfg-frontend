import { Component, Input, OnInit } from '@angular/core';
import { IconsService } from 'src/app/services/icons/icons.service';

@Component({
	selector: 'app-close-button',
	templateUrl: './close-button.component.html',
	styleUrls: ['./close-button.component.css'],
})
export class CloseButtonComponent implements OnInit {
	@Input() public onClick: Function;

	constructor(public iconsService: IconsService) {}

	ngOnInit(): void {}
}
