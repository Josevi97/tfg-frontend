import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IAccount, IRegisterAccount } from 'src/app/models/accounts.interface';
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

	findOne(id: number): Observable<IAccount> {
		return this.http
			.get<IAccount>(`${this.ACCOUNT_URI}/${id}`, httpOptions)
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

	register(data: IRegisterAccount): Observable<String> {
		return this.http
			.post<String>(this.ACCOUNT_URI, data, httpOptions)
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
}
