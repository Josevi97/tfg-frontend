export interface IEntity {
	id: number;
	title: string;
	subtitle: string;
	email: string;
	image: string;
	following: number;
	followers: number;
	communities: number;
	entrances: number;
	body: string;
	tag: string;
	type: string;
	createdAt: string;
	lastConnection: string;
	sessionFollow: number;
}

export interface IFormEntityDetails {
	name: string;
	key: string;
}

export interface IEntityDetails {
	name: string;
	value: string;
}
