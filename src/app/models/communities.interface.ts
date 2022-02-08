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

export interface IRegisterCommunity {
	name: string;
	description: string;
}

export interface ICommunityPage {
	content: ICommunity[];
	totalElements: number;
	totalPages: number;
}

export interface ICommunityList {
	account: IAccount;
	community: ICommunity;
}

export interface ICommunityListPage {
	content: ICommunityList[];
	totalElements: number;
}
