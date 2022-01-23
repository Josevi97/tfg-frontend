import { Injectable } from '@angular/core';
import { IComment } from 'src/app/models/comments.interface';
import { IEntrance } from 'src/app/models/entrances.interface';
import { IPost } from 'src/app/models/posts.interface';

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	constructor() {}

	fromEntrance(entrance: IEntrance): IPost {
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
			type: 'entrance',
		};
	}

	fromEntrances(entrances: IEntrance[]): IPost[] {
		return entrances.map((entrance) => this.fromEntrance(entrance));
	}

	fromComment(comment: IComment): IPost {
		return {
			id: comment.id,
			title: null,
			account: comment.account,
			community: null,
			createdAt: comment.createdAt,
			body: comment.body,
			votes: comment.calculatedVotes,
			comments: comment.responses,
			sessionVoted: comment.sessionVoted,
			type: 'comment',
		};
	}

	fromComments(comments: IComment[]): IPost[] {
		return comments.map((comment) => this.fromComment(comment));
	}
}
