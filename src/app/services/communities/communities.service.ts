import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IAccount } from 'src/app/models/accounts.interface';
import {
	ICommunity,
	ICommunityList,
	ICommunityListPage,
	IRegisterCommunity,
} from 'src/app/models/communities.interface';
import {
	IEntranceForm,
	IEntrancePage,
} from 'src/app/models/entrances.interface';
import { API_URI, httpOptions } from 'src/environments/environment';
import { ErrorService } from '../error/error.service';

@Injectable({
	providedIn: 'root',
})
export class CommunitiesService {
	private COMMUNITY_URI = `${API_URI}/communities`;

	constructor(private http: HttpClient, private errorService: ErrorService) {}

	findOne(id: number): Observable<ICommunity> {
		return this.http
			.get<ICommunity>(`${this.COMMUNITY_URI}/${id}`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	register(data: IRegisterCommunity): Observable<String> {
		return this.http
			.post<String>(this.COMMUNITY_URI, data, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	createEntrance(id: number, data: IEntranceForm): Observable<String> {
		return this.http
			.post<String>(`${this.COMMUNITY_URI}/${id}/entrances`, data, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	getEntrancesByCommunity(id: number): Observable<IEntrancePage> {
		return this.http
			.get<IEntrancePage>(`${this.COMMUNITY_URI}/${id}/entrances`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	getFollowersByAccount(id: number): Observable<ICommunityListPage> {
		return this.http
			.get<ICommunityListPage>(
				`${this.COMMUNITY_URI}/${id}/followers`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	followAccount(id: number): Observable<String> {
		return this.http
			.post<String>(`${this.COMMUNITY_URI}/${id}/follow`, null, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	unfollowAccount(id: number): Observable<String> {
		return this.http
			.delete<String>(`${this.COMMUNITY_URI}/${id}/follow`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	getFollowers(data: ICommunityListPage): IAccount[] {
		return data.content.map(
			(communityList: ICommunityList) => communityList.account
		);
	}
}
