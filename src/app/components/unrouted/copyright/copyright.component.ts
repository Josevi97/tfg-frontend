import { Component, OnInit } from '@angular/core';
import { IconsService } from 'src/app/services/icons/icons.service';

@Component({
	selector: 'app-copyright',
	templateUrl: './copyright.component.html',
	styleUrls: ['./copyright.component.css'],
})
export class CopyrightComponent implements OnInit {
	constructor(public iconsService: IconsService) {}

	ngOnInit(): void {}
}
