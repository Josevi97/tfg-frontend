import { IAccount } from './accounts.interface';
import { IEntrance } from './entrances.interface';

export interface IComment {
	id: number;
	body: string;
	createdAt: string;
	account: IAccount;
	entrance: IEntrance;
	comment: IComment;
	responses: number;
	votes: number;
	sessionVoted: number;
	calculatedVotes: number;
}

export interface ICommentPage {
	content: IComment[];
	totalElements: number;
}
