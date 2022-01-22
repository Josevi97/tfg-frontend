import { Injectable } from '@angular/core';
import { IEntrance } from 'src/app/models/entrances.interface';
import { IPost } from 'src/app/models/posts.interface';

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	constructor() {}

	toPost(entrance: IEntrance): IPost {
		return {
			id: entrance.id,
			title: entrance.title,
			account: entrance.account,
			community: entrance.community,
			createdAt: entrance.createdAt,
			body: entrance.body,
			votes: entrance.calculatedVotes,
			comments: entrance.comments,
			sessionVoted: entrance.sessionVoted,
		};
	}
}
