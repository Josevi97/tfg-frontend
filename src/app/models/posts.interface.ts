import { IAccount } from './accounts.interface';
import { ICommunity } from './communities.interface';

export interface IPost {
	id: number;
	title: string;
	account: IAccount;
	community: ICommunity;
	post: IPost;
	body: string;
	createdAt: string;
	votes: number;
	comments: number;
	sessionVoted: number;
	type: string;
	responseType: string;
}
