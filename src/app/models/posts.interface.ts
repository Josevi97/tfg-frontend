import { IAccount } from './accounts.interface';
import { IComment } from './comments.interface';
import { ICommunity } from './communities.interface';
import { IEntrance } from './entrances.interface';

export interface IPost {
	id: number;
	title: string;
	account: IAccount;
	community: ICommunity;
	entrance: IEntrance;
	comment: IComment;
	createdAt: string;
	body: string;
	votes: number;
	comments: number;
	sessionVoted: number;
	post: IPost;
	type: string;
	responseType: string;
}
