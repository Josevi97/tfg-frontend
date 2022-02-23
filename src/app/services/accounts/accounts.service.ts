import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import {
	IAccount,
	IAccountFollowPage,
	IAccountPage,
	IRegisterAccount,
	IResetPassword,
	IUpdateAccount,
} from 'src/app/models/accounts.interface';
import { ICommentPage } from 'src/app/models/comments.interface';
import {
	ICommunity,
	ICommunityListPage,
} from 'src/app/models/communities.interface';
import { IEntrancePage } from 'src/app/models/entrances.interface';
import { IDataSort } from 'src/app/models/sort.interface';
import { API_URI, httpOptions } from 'src/environments/environment';
import { ErrorService } from '../error/error.service';
import { SortService } from '../sort/sort.service';

@Injectable({
	providedIn: 'root',
})
export class AccountsService {
	private ACCOUNT_URI = `${API_URI}/accounts`;

	constructor(
		private http: HttpClient,
		private errorService: ErrorService,
		private sortService: SortService
	) {}

	register(data: IRegisterAccount): Observable<String> {
		return this.http
			.post<String>(this.ACCOUNT_URI, data, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	update(id: number, data: IUpdateAccount): Observable<String> {
		return this.http
			.put<String>(`${this.ACCOUNT_URI}/${id}`, data, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	updatePassword(id: number, data: IResetPassword): Observable<String> {
		return this.http
			.put<String>(`${this.ACCOUNT_URI}/${id}/password`, data, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	delete(id: number): Observable<String> {
		return this.http
			.delete<String>(`${this.ACCOUNT_URI}/${id}`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	findOne(id: number): Observable<IAccount> {
		return this.http
			.get<IAccount>(`${this.ACCOUNT_URI}/${id}`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	getAllAccounts(sortData: IDataSort): Observable<IAccountPage> {
		return this.http
			.get<IAccountPage>(
				`${this.ACCOUNT_URI}?${this.sortService.handleSort(sortData)}`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	getEntrancesBySessionCommunities(
		sortData: IDataSort
	): Observable<IEntrancePage> {
		return this.http
			.get<IEntrancePage>(
				`${
					this.ACCOUNT_URI
				}/communities/entrances?${this.sortService.handleSort(sortData)}`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	getEntrancesBySessionFollowing(
		sortData: IDataSort
	): Observable<IEntrancePage> {
		return this.http
			.get<IEntrancePage>(
				`${this.ACCOUNT_URI}/following/entrances?${this.sortService.handleSort(
					sortData
				)}`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	getEntrancesByAccount(
		id: number,
		sortData: IDataSort
	): Observable<IEntrancePage> {
		return this.http
			.get<IEntrancePage>(
				`${this.ACCOUNT_URI}/${id}/entrances?${this.sortService.handleSort(
					sortData
				)}`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	getCommentsByAccount(
		id: number,
		sortData: IDataSort
	): Observable<ICommentPage> {
		return this.http
			.get<ICommentPage>(
				`${this.ACCOUNT_URI}/${id}/comments?${this.sortService.handleSort(
					sortData
				)}`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	getFollowingByAccount(id: number): Observable<IAccountFollowPage> {
		return this.http
			.get<IAccountFollowPage>(
				`${this.ACCOUNT_URI}/${id}/following`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	getFollowersByAccount(id: number): Observable<IAccountFollowPage> {
		return this.http
			.get<IAccountFollowPage>(
				`${this.ACCOUNT_URI}/${id}/followers`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	getCommunitiesByAccount(id: number): Observable<ICommunityListPage> {
		return this.http
			.get<ICommunityListPage>(
				`${this.ACCOUNT_URI}/${id}/communities`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	followAccount(id: number): Observable<String> {
		return this.http
			.post<String>(`${this.ACCOUNT_URI}/${id}/follow`, null, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	unfollowAccount(id: number): Observable<String> {
		return this.http
			.delete<String>(`${this.ACCOUNT_URI}/${id}/follow`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	getFollowing(data: IAccountFollowPage): IAccount[] {
		return data.content.map((accountFollow) => accountFollow.to);
	}

	getFollowers(data: IAccountFollowPage): IAccount[] {
		return data.content.map((accountFollow) => accountFollow.from);
	}

	getRandom(
		blackList: number[],
		sortData: IDataSort
	): Observable<IAccountPage> {
		return this.http
			.get<IAccountPage>(
				`${
					this.ACCOUNT_URI
				}/random?blackList=${blackList}&${this.sortService.handleSort(
					sortData
				)}`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	getCommunities(data: ICommunityListPage): ICommunity[] {
		return data.content.map((communityList) => communityList.community);
	}
}
