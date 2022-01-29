import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IAccount } from 'src/app/models/accounts.interface';
import { ICommentPage } from 'src/app/models/comments.interface';
import { IPost } from 'src/app/models/posts.interface';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { EntrancesService } from 'src/app/services/entrances/entrances.service';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
	selector: 'app-pinspect',
	templateUrl: './pinspect.component.html',
	styleUrls: ['./pinspect.component.css'],
})
export class PinspectComponent implements OnInit {
	public sessionAccount: IAccount;
	public post: IPost;
	public posts: IPost[];
	public commenting: boolean;

	constructor(
		private entrancesService: EntrancesService,
		private commentsService: CommentsService,
		private postsService: PostsService,
		private ref: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		switch (this.post.type) {
			case 'entrance':
				this.entrancesService
					.getResponses(this.post.id)
					.subscribe((data: ICommentPage) => {
						this.posts = this.postsService.fromComments(data.content);
						this.ref.detectChanges();
					});
				break;
			case 'comment':
				this.commentsService
					.getResponses(this.post.id)
					.subscribe((data: ICommentPage) => {
						this.posts = this.postsService.fromComments(data.content);
						this.ref.detectChanges();
					});
				break;
		}
	}

	setCommenting(bshould: boolean): void {
		this.commenting = bshould;
		this.ref.detectChanges();
	}

	shouldShowActionButtons(post: IPost): boolean {
		return (
			post.account.id === this.sessionAccount.id || this.sessionAccount.admin
		);
	}

	onCommentClick(): void {
		this.commenting = true;
	}
}
