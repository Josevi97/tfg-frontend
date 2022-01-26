import { IAccount } from './accounts.interface';

export interface ICommunity {
	id: number;
	name: string;
	description: string;
	image: string;
	createdAt: string;
	entrances: number;
	communityList: number;
	sessionFollow: number;
}

export interface ICommunityPage {
	content: ICommunity[];
	totalElements: number;
}

export interface ICommunityList {
	account: IAccount;
	community: ICommunity;
}

export interface ICommunityListPage {
	content: ICommunityList[];
	totalElements: number;
}
