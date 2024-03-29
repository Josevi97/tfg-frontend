// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from '@angular/common/http';

export const environment = {
	production: true,
};

export const API_URI = 'https://api.josevi.tk';
export const RESOURCES_URI = 'https://static.josevi.tk';

export const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json; charset=UTF-8',
	}),
	withCredentials: true,
};

export const httpOptionsPart = {
	withCredentials: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
