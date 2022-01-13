export interface IAccount {
	id: number;
	login: string;
	email: string;
	password: string;
	username: string;
	avatar: string;
	admin: boolean;
	createdAt: string;
	lastUpdatedAt: string;
	followers: number;
	following: number;
	entrances: number;
	comments: number;
	communityList: number;
	entranceVotes: number;
	commentVotes: number;
}
