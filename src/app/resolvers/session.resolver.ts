import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { IAccount } from '../models/accounts.interface';
import { SessionService } from '../services/session/session.service';

@Injectable({
	providedIn: 'root',
})
export class SessionResolver implements Resolve<Observable<IAccount>> {
	constructor(private sessionService: SessionService) {}

	resolve(): Observable<IAccount> {
		return this.sessionService.check().pipe(catchError((err) => of(err)));
	}
}
