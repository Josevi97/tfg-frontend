import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IAccount } from 'src/app/models/accounts.interface';
import { ILogin } from 'src/app/models/session.interface';
import { API_URI, httpOptions } from 'src/environments/environment';
import { ErrorService } from '../error/error.service';

@Injectable({
	providedIn: 'root',
})
export class SessionService {
	private SESSION_URI = `${API_URI}/session`;

	constructor(private http: HttpClient, private errorService: ErrorService) {}

	check(): Observable<IAccount> {
		return this.http
			.get<IAccount>(this.SESSION_URI, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	login(data: ILogin): Observable<String> {
		return this.http
			.post<String>(this.SESSION_URI, data, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}
}
