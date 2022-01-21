import { IAccount } from './accounts.interface';
import { ICommunity } from './communities.interface';

export interface IPost {
	title: string;
	account: IAccount;
	community: ICommunity;
	createdAt: string;
	body: string;
	votes: number;
	comments: number;
	sessionVoted: number;
}
