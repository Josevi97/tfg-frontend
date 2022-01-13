import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IRegisterAccount } from 'src/app/models/accounts.interface';
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
}
