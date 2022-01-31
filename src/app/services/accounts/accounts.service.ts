import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import {
	IAccount,
	IAccountFollowPage,
	IAccountPage,
	IRegisterAccount,
	IUpdateAccount,
} from 'src/app/models/accounts.interface';
import { ICommentPage } from 'src/app/models/comments.interface';
import { IEntrancePage } from 'src/app/models/entrances.interface';
import { API_URI, httpOptions } from 'src/environments/environment';
import { ErrorService } from '../error/error.service';

@Injectable({
	providedIn: 'root',
})
export class AccountsService {
	private ACCOUNT_URI = `${API_URI}/accounts`;

	constructor(private http: HttpClient, private errorService: ErrorService) {}

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

	getAllAccounts(): Observable<IAccountPage> {
		return this.http
			.get<IAccountPage>(`${this.ACCOUNT_URI}`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	getEntrancesBySessionCommunities(): Observable<IEntrancePage> {
		return this.http
			.get<IEntrancePage>(
				`${this.ACCOUNT_URI}/communities/entrances`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	getEntrancesBySessionFollowing(): Observable<IEntrancePage> {
		return this.http
			.get<IEntrancePage>(
				`${this.ACCOUNT_URI}/following/entrances`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	getEntrancesByAccount(id: number): Observable<IEntrancePage> {
		return this.http
			.get<IEntrancePage>(`${this.ACCOUNT_URI}/${id}/entrances`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	getCommentsByAccount(id: number): Observable<ICommentPage> {
		return this.http
			.get<ICommentPage>(`${this.ACCOUNT_URI}/${id}/comments`, httpOptions)
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
		console.log(
			data.content
				.map((accountFollow) => accountFollow.from)
				.forEach((entity) => console.log(entity.sessionFollow))
		);
		return data.content.map((accountFollow) => accountFollow.from);
	}
}
