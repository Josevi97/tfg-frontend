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

	calculateFollow(entity: IEntity, callback: Function = null): void {
		switch (entity.type) {
			case 'account':
				switch (entity.sessionFollow) {
					case -1:
					case 1:
						this.accountsService.followAccount(entity.id).subscribe(() => {
							entity.sessionFollow = 0;
							entity.followers++;

							if (callback) {
								callback();
							}
						});
						break;
					case 0:
						this.accountsService.unfollowAccount(entity.id).subscribe(() => {
							entity.sessionFollow--;
							entity.followers--;

							if (callback) {
								callback();
							}
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

							if (callback) {
								callback(entity);
							}
						});
						break;
					case 0:
						this.communitiesService.unfollowAccount(entity.id).subscribe(() => {
							entity.sessionFollow--;
							entity.followers--;

							if (callback) {
								callback(entity);
							}
						});
						break;
				}
				break;
		}
	}

	calculateVotes(post: IPost, key: string): void {
		switch (post.type) {
			case 'entrance':
				this.entrancesService
					.vote(post.id, key === 'up')
					.subscribe(() => this.updatePost(post, key));
				break;
			case 'comment':
				this.commentsService
					.vote(post.id, key === 'up')
					.subscribe(() => this.updatePost(post, key));
				break;
		}
	}

	updatePost(post: IPost, key: string): void {
		if (post.sessionVoted === -1) {
			switch (key) {
				case 'up':
					post.sessionVoted = 1;
					post.votes++;
					break;
				case 'down':
					post.sessionVoted = 0;
					post.votes--;
					break;
			}
		} else {
			switch (key) {
				case 'up':
					if (post.sessionVoted === 1) {
						post.votes--;
						post.sessionVoted = -1;
					} else {
						post.votes += post.sessionVoted === 0 ? 2 : 1;
						post.sessionVoted = 1;
					}
					break;
				case 'down':
					if (post.sessionVoted === 0) {
						post.votes++;
						post.sessionVoted = -1;
					} else {
						post.votes += post.sessionVoted === 1 ? -2 : -1;
						post.sessionVoted = 0;
					}
					break;
			}
		}
	}
}
