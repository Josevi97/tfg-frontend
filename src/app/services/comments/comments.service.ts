import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IComment, ICommentPage } from 'src/app/models/comments.interface';
import { IDataSort } from 'src/app/models/sort.interface';
import { API_URI, httpOptions } from 'src/environments/environment';
import { ErrorService } from '../error/error.service';
import { SortService } from '../sort/sort.service';

@Injectable({
	providedIn: 'root',
})
export class CommentsService {
	private COMMENT_URI = `${API_URI}/comments`;

	constructor(
		private http: HttpClient,
		private errorService: ErrorService,
		private sortService: SortService
	) {}

	getComment(id: number): Observable<IComment> {
		return this.http
			.get<IComment>(`${this.COMMENT_URI}/${id}`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	getResponses(id: number, sortData: IDataSort): Observable<ICommentPage> {
		return this.http
			.get<ICommentPage>(
				`${this.COMMENT_URI}/${id}/responses?${this.sortService.handleSort(
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
				`${this.COMMENT_URI}/${id}`,
				JSON.stringify(data),
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}

	delete(id: number): Observable<String> {
		return this.http
			.delete<String>(`${this.COMMENT_URI}/${id}`, httpOptions)
			.pipe(catchError(this.errorService.handleError));
	}

	vote(id: number, vote: boolean): Observable<String> {
		return this.http
			.post<String>(
				`${this.COMMENT_URI}/${id}/vote`,
				JSON.stringify({ vote: vote }),
				httpOptions
			)
			.pipe(catchError(this.errorService.handleError));
	}
}
