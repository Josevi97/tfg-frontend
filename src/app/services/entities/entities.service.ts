import { Injectable } from '@angular/core';
import { IAccount } from 'src/app/models/accounts.interface';
import { ICommunity } from 'src/app/models/communities.interface';
import { IEntity } from 'src/app/models/entities.interface';

@Injectable({
	providedIn: 'root',
})
export class EntitiesService {
	constructor() {}

	fromAccount(account: IAccount): IEntity {
		return {
			id: account?.id,
			title: account?.username,
			subtitle: account?.login,
			email: account?.email,
			image: account?.avatar,
			following: account?.following,
			followers: account?.followers,
			communities: account?.communityList,
			entrances: account?.entrances,
			body: account?.description,
			tag: account?.admin ? 'admin' : null,
			type: 'account',
			createdAt: account?.createdAt,
			lastConnection: account?.lastSessionAt,
			sessionFollow: account?.sessionFollow,
		};
	}

	fromAccounts(accounts: IAccount[]): IEntity[] {
		return accounts.map((account) => this.fromAccount(account));
	}

	fromCommunity(community: ICommunity): IEntity {
		return {
			id: community?.id,
			title: community?.name,
			subtitle: null,
			email: null,
			image: community?.image,
			following: null,
			followers: community?.communityList,
			communities: null,
			entrances: community?.entrances,
			body: community?.description,
			tag: null,
			type: 'community',
			createdAt: community?.createdAt,
			lastConnection: null,
			sessionFollow: community?.sessionFollow,
		};
	}

	fromCommunities(communities: ICommunity[]): IEntity[] {
		return communities.map((community) => this.fromCommunity(community));
	}
}
