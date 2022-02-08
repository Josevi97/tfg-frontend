import { Injectable } from '@angular/core';
import { IDataSort } from 'src/app/models/sort.interface';

@Injectable({
	providedIn: 'root',
})
export class SortService {
	constructor() {}

	handleSort(sortData: IDataSort): string {
		return `page=${sortData.page - 1}&size=${sortData.size}&sort=${
			sortData.sort
		},${sortData.direction ? 'asc' : 'desc'}`;
	}
}
