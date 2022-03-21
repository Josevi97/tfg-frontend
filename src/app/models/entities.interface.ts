export interface IEntity {
	id: number;
	title: string;
	subtitle: string;
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
