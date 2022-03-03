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
	lastSessionAt: string;
	followers: number;
	following: number;
	entrances: number;
	comments: number;
	communityList: number;
	entranceVotes: number;
	commentVotes: number;
	sessionFollow: number;
}

export interface IAccountPage {
	content: IAccount[];
	totalElements: number;
	totalPages: number;
}

export interface IRegisterAccount {
	login: string;
	email: string;
	username: string;
	originalPassword: string;
	repeatedPassword: string;
	admin: boolean;
}

export interface IUpdateAccount {
	username: string;
	description: string;
	login: string;
	email: string;
	admin: boolean;
}

export interface IResetPassword {
	originalPassword: string;
	repeatedPassword: string;
}

export interface IAccountFollow {
	from: IAccount;
	to: IAccount;
}

export interface IAccountFollowPage {
	content: IAccountFollow[];
	totalElements: number;
}
