import { Injectable } from '@angular/core';
import { IAccount } from 'src/app/models/accounts.interface';
import { TableBody, TableData } from 'src/app/models/table.interface';

@Injectable({
	providedIn: 'root',
})
export class TableService {
	constructor() {}

	fromAccounts(accounts: IAccount[]): TableData {
		return {
			headers: [
				{
					text: 'id',
					key: 'id',
				},
				{
					text: 'login',
					key: 'login',
				},
				{
					text: 'email',
					key: 'email',
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
}
