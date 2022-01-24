import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ICommunity } from 'src/app/models/communities.interface';
import { IEntrancePage } from 'src/app/models/entrances.interface';
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

	getEntrancesByCommunity(id: number): Observable<IEntrancePage> {
		return this.http
			.get<IEntrancePage>(`${this.COMMUNITY_URI}/${id}/entrances`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}
}
