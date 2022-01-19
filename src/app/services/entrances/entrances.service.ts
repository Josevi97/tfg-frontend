import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IEntrancePage } from 'src/app/models/entrances.interface';
import { API_URI, httpOptions } from 'src/environments/environment';
import { ErrorService } from '../error/error.service';

@Injectable({
	providedIn: 'root',
})
export class EntrancesService {
	private ENTRANCE_URI = `${API_URI}/entrances`;

	constructor(private http: HttpClient, private errorService: ErrorService) {}

	getAllEntrances(): Observable<IEntrancePage> {
		return this.http
			.get<IEntrancePage>(this.ENTRANCE_URI, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}
}
