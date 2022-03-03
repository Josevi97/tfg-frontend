import { Injectable } from '@angular/core';
import { IAccount } from 'src/app/models/accounts.interface';
import { ICommunity } from 'src/app/models/communities.interface';
import { TableData } from 'src/app/models/table.interface';

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
					sort: true,
					relevant: true,
				},
				{
					text: 'login',
					key: 'login',
					sort: true,
					relevant: true,
				},
				{
					text: 'email',
					key: 'email',
					sort: true,
					relevant: false,
				},
				{
					text: 'admin',
					key: 'isAdmin',
					sort: true,
					relevant: true,
				},
				{
					text: 'entradas',
					key: 'entrances',
					sort: false,
					relevant: false,
				},
				{
					text: 'comentarios',
					key: 'comments',
					sort: false,
					relevant: false,
				},
				{
					text: 'votos a entradas',
					key: 'entranceVotes',
					sort: false,
					relevant: false,
				},
				{
					text: 'votos a comentarios',
					key: 'commentVotes',
					sort: false,
					relevant: false,
				},
				{
					text: 'ultima conexion',
					key: 'lastSessionAt',
					sort: true,
					relevant: true,
				},
				{
					text: 'fecha de creacion',
					key: 'createdAt',
					sort: true,
					relevant: true,
				},
			],
			data: accounts.map((account: IAccount) => {
				return {
					body: [
						{
							text: `${account.id}`,
							relevant: true,
						},
						{
							text: account.login,
							relevant: true,
						},
						{
							text: account.email,
							relevant: false,
						},
						{
							text: `${account.admin ? 'SI' : 'NO'}`,
							relevant: true,
						},
						{
							text: `${account.entrances}`,
							relevant: false,
						},
						{
							text: `${account.comments}`,
							relevant: false,
						},
						{
							text: `${account.entranceVotes}`,
							relevant: false,
						},
						{
							text: `${account.commentVotes}`,
							relevant: false,
						},
						{
							text: account.lastSessionAt,
							relevant: true,
						},
						{
							text: account.createdAt,
							relevant: true,
						},
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
					sort: true,
					relevant: true,
				},
				{
					text: 'name',
					key: 'name',
					sort: true,
					relevant: true,
				},
				{
					text: 'entradas',
					key: 'entrances',
					sort: false,
					relevant: false,
				},
				{
					text: 'Numero de seguidores',
					key: 'accounts',
					sort: false,
					relevant: false,
				},
				{
					text: 'fecha de creacion',
					key: 'createdAt',
					sort: true,
					relevant: true,
				},
			],
			data: communities.map((community: ICommunity) => {
				return {
					body: [
						{
							text: `${community.id}`,
							relevant: true,
						},
						{
							text: community.name,
							relevant: true,
						},
						{
							text: `${community.entrances}`,
							relevant: false,
						},
						{
							text: `${community.communityList}`,
							relevant: false,
						},
						{
							text: community.createdAt,
							relevant: true,
						},
					],
				};
			}),
		};
	}
}
