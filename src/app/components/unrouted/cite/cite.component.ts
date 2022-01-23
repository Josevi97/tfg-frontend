import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/models/posts.interface';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
	selector: 'app-cite',
	templateUrl: './cite.component.html',
	styleUrls: ['./cite.component.css'],
})
export class CiteComponent implements OnInit {
	@Input() public post: IPost;

	constructor(private location: LocationService) {}

	ngOnInit(): void {}

	navigateToAccount(): void {
		this.location.navigateToAccount(this.post.post.account.id);
	}
}
