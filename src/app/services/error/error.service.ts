import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ErrorService {
	constructor() {}

	handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			return throwError(`error: ${error.error.message}`);
		} else {
			return throwError(`error: ${error.status}\nmessage:${error.message}`);
		}
	}
}
