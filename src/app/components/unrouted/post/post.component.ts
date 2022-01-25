import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/posts.interface';
import { IconsService } from 'src/app/services/icons/icons.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
	@Input() public onPostClick: Function;
	@Input() public onCiteClick: Function;
	@Input() public onCommentsClick: Function;
	@Input() public onVotesClick: Function;
	@Input() public post: IPost;
	@Input() public showAccount: boolean;
	@Input() public showCommunity: boolean;
	@Input() public showActionButtons: boolean;
	@Input() public showCite: boolean;

	constructor(
		public iconsService: IconsService,
		private location: LocationService
	) {}

	ngOnInit(): void {}

	navigateToAccount(): void {
		this.location.navigateToAccount(this.post.account.id);
	}

	navigateToCommunity(): void {
		this.location.navigateToCommunity(this.post.community.id);
	}
}
