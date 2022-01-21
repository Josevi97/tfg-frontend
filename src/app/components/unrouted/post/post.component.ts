import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/models/posts.interface';
import { IconsService } from 'src/app/services/icons/icons.service';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
	@Input() public onCommentsClick: Function;
	@Input() public post: IPost;
	@Input() public showAccount: boolean;
	@Input() public showCommunity: boolean;

	constructor(public iconsService: IconsService, public router: Router) {}

	ngOnInit(): void {}

	onVotesClick(key: string): void {}

	navigateToAccount(): void {
		this.router.navigate([`/account/${this.post.account.id}`]);
	}

	navigateToCommunity(): void {
		this.router.navigate([`/community/${this.post.community.id}`]);
	}
}
