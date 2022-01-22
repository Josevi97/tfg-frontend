export interface IAccount {
	id: number;
	login: string;
	email: string;
	password: string;
	username: string;
	description: string;
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
	sessionFollow: number;
}

export interface IRegisterAccount {
	login: string;
	email: string;
	username: string;
	originalPassword: string;
	repeatedPassword: string;
}
