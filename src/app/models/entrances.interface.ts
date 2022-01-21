import { IAccount } from './accounts.interface';
import { ICommunity } from './communities.interface';

export interface IEntrance {
	id: number;
	title: string;
	body: string;
	createdAt: string;
	account: IAccount;
	community: ICommunity;
	comments: number;
	votes: number;
	sessionVoted: number;
	calculatedVotes: number;
}

export interface IEntrancePage {
	content: IEntrance[];
	totalElements: number;
}
