import { Injectable } from '@angular/core';
import { IAccount } from 'src/app/models/accounts.interface';
import { ICommunity } from 'src/app/models/communities.interface';
import { TableData } from 'src/app/models/table.interface';

@Injectable({
	providedIn: 'root',
})
export class TableService {
	public ACCOUNT_SORT_KEYS: string[] = ['id', 'login', 'email'];
	public COMMUNITY_SORT_KEYS: string[] = ['id', 'name'];

	constructor() {}

	fromAccounts(accounts: IAccount[]): TableData {
		return {
			headers: [
				{
					text: 'id',
					key: this.ACCOUNT_SORT_KEYS[0],
				},
				{
					text: 'login',
					key: this.ACCOUNT_SORT_KEYS[1],
				},
				{
					text: 'email',
					key: this.ACCOUNT_SORT_KEYS[2],
				},
				{
					text: 'entradas',
					key: 'entrances',
				},
				{
					text: 'comentarios',
					key: 'comments',
				},
				{
					text: 'lista de comunidades',
					key: 'communities',
				},
				{
					text: 'votos a entradas',
					key: 'entranceVotes',
				},
				{
					text: 'votos a comentarios',
					key: 'commentVotes',
				},
				{
					text: 'fecha de creacion',
					key: 'created_at',
				},
			],
			data: accounts.map((account: IAccount) => {
				return {
					body: [
						`${account.id}`,
						account.login,
						account.email,
						`${account.entrances}`,
						`${account.comments}`,
						`${account.communityList}`,
						`${account.entranceVotes}`,
						`${account.commentVotes}`,
						account.createdAt,
					],
				};
			}),
		};
	}

	fromCommunities(communities: ICommunity[]): TableData {
		return {
			headers: [
				{
					text: 'id',
					key: 'id',
				},
				{
					text: 'name',
					key: 'name',
				},
				{
					text: 'entradas',
					key: 'entrances',
				},
				{
					text: 'Numero de seguidores',
					key: 'accounts',
				},
				{
					text: 'fecha de creacion',
					key: 'created_at',
				},
			],
			data: communities.map((community: ICommunity) => {
				return {
					body: [
						`${community.id}`,
						community.name,
						`${community.entrances}`,
						`${community.communityList}`,
						community.createdAt,
					],
				};
			}),
		};
	}
}
