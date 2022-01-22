import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/models/posts.interface';
import { EntrancesService } from 'src/app/services/entrances/entrances.service';
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

	constructor(
		public iconsService: IconsService,
		public router: Router,
		private entranceService: EntrancesService
	) {}

	ngOnInit(): void {}

	onVotesClick(key: string): void {
		this.entranceService.unvoteEntrance(this.post.id).subscribe(
			() => {
				if (
					(key === 'up' && this.post.sessionVoted !== 1) ||
					(key === 'down' && this.post.sessionVoted !== 0)
				) {
					this.createVote(key);
				}
			},
			() => this.createVote(key)
		);
	}

	createVote(key: string): void {
		this.entranceService
			.voteEntrance(this.post.id, key === 'up')
			.subscribe(() => {});
	}

	navigateToAccount(): void {
		this.router.navigate([`/account/${this.post.account.id}`]);
	}

	navigateToCommunity(): void {
		this.router.navigate([`/community/${this.post.community.id}`]);
	}
}
