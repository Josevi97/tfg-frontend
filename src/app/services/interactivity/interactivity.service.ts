import { Injectable } from '@angular/core';
import { IEntity } from 'src/app/models/entities.interface';
import { IPost } from 'src/app/models/posts.interface';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { CommentsService } from '../comments/comments.service';
import { CommunitiesService } from '../communities/communities.service';
import { EntrancesService } from '../entrances/entrances.service';

@Injectable({
	providedIn: 'root',
})
export class InteractivityService {
	constructor(
		private accountsService: AccountsService,
		private communitiesService: CommunitiesService,
		private entrancesService: EntrancesService,
		private commentsService: CommentsService
	) {}

	calculateFollow(entity: IEntity, callback: Function): void {
		switch (entity.type) {
			case 'account':
				switch (entity.sessionFollow) {
					case -1:
					case 1:
						this.accountsService.followAccount(entity.id).subscribe(() => {
							entity.sessionFollow = 0;
							entity.followers++;
							callback(entity);
						});
						break;
					case 0:
						this.accountsService.unfollowAccount(entity.id).subscribe(() => {
							entity.sessionFollow--;
							entity.followers--;
							callback(entity);
						});
						break;
				}
				break;
			case 'community':
				switch (entity.sessionFollow) {
					case -1:
					case 1:
						this.communitiesService.followAccount(entity.id).subscribe(() => {
							entity.sessionFollow = 0;
							entity.followers++;
							callback(entity);
						});
						break;
					case 0:
						this.communitiesService.unfollowAccount(entity.id).subscribe(() => {
							entity.sessionFollow--;
							entity.followers--;
							callback(entity);
						});
						break;
				}
				break;
		}
	}

	calculateVotes(post: IPost, key: string, callback: Function = null): void {
		if (post.sessionVoted === -1) {
			if (key === 'up') {
				this.positiveVote(post);
			} else {
				this.negativeVote(post);
			}
		} else if (post.sessionVoted === 1) {
			if (key === 'up') {
				this.unvote(post);
			} else {
				this.unvote(post, () => this.negativeVote(post));
			}
		} else {
			if (key === 'up') {
				this.unvote(post, () => this.positiveVote(post));
			} else {
				this.unvote(post);
			}
		}
	}

	positiveVote(post: IPost): void {
		switch (post.type) {
			case 'entrance':
				this.entrancesService.vote(post.id, true).subscribe(() => {
					post.sessionVoted = 1;
					post.votes++;
				});
				break;
			case 'comment':
				this.commentsService.vote(post.id, true).subscribe(() => {
					post.sessionVoted = 1;
					post.votes++;
				});
				break;
		}
	}

	negativeVote(post: IPost): void {
		switch (post.type) {
			case 'entrance':
				this.entrancesService.vote(post.id, false).subscribe(() => {
					post.sessionVoted = 0;
					post.votes--;
				});
				break;
			case 'comment':
				this.commentsService.vote(post.id, false).subscribe(() => {
					post.sessionVoted = 0;
					post.votes--;
				});
				break;
		}
	}

	unvote(post: IPost, callback: Function = null): void {
		switch (post.type) {
			case 'entrance':
				this.entrancesService.unvote(post.id).subscribe(() => {
					post.votes += post.sessionVoted === 1 ? -1 : 1;
					post.sessionVoted = -1;

					if (callback) {
						callback();
					}
				});
				break;
			case 'comment':
				this.commentsService.unvote(post.id).subscribe(() => {
					post.votes += post.sessionVoted === 1 ? -1 : 1;
					post.sessionVoted = -1;

					if (callback) {
						callback();
					}
				});
				break;
		}
	}
}
