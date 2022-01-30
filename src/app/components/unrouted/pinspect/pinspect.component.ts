import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/posts.interface';

@Component({
	selector: 'app-pinspect',
	templateUrl: './pinspect.component.html',
	styleUrls: ['./pinspect.component.css'],
})
export class PinspectComponent implements OnInit {
	@Input() public post: IPost;

	constructor() {}

	ngOnInit(): void {}
}
