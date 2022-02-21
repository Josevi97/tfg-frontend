import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ICommentPage } from 'src/app/models/comments.interface';
import {
	IEntrance,
	IEntranceForm,
	IEntrancePage,
} from 'src/app/models/entrances.interface';
import { IDataSort } from 'src/app/models/sort.interface';
import { API_URI, httpOptions } from 'src/environments/environment';
import { ErrorService } from '../error/error.service';
import { SortService } from '../sort/sort.service';

@Injectable({
	providedIn: 'root',
})
export class EntrancesService {
	private ENTRANCE_URI = `${API_URI}/entrances`;

	constructor(
		private http: HttpClient,
		private errorService: ErrorService,
		private sortService: SortService
	) {}

	update(id: number, data: IEntranceForm): Observable<String> {
		return this.http
			.put<String>(`${this.ENTRANCE_URI}/${id}`, data, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	getEntrance(id: number): Observable<IEntrance> {
		return this.http
			.get<IEntrance>(`${this.ENTRANCE_URI}/${id}`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	getAllEntrances(sortData: IDataSort): Observable<IEntrancePage> {
		return this.http
			.get<IEntrancePage>(
				`${this.ENTRANCE_URI}?${this.sortService.handleSort(sortData)}`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	getResponses(id: number, sortData: IDataSort): Observable<ICommentPage> {
		return this.http
			.get<ICommentPage>(
				`${this.ENTRANCE_URI}/${id}/comments?${this.sortService.handleSort(
					sortData
				)}`,
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	comment(id: number, comment: string): Observable<String> {
		const data = {
			body: comment,
		};

		return this.http
			.post<String>(
				`${this.ENTRANCE_URI}/${id}/comments`,
				JSON.stringify(data),
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	delete(id: number): Observable<String> {
		return this.http
			.delete<String>(`${this.ENTRANCE_URI}/${id}`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	vote(id: number, vote: boolean): Observable<String> {
		return this.http
			.post<String>(
				`${this.ENTRANCE_URI}/${id}/vote`,
				JSON.stringify({ vote: vote }),
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}
}
