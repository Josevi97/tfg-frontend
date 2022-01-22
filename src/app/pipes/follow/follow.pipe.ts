import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'follow',
})
export class FollowPipe implements PipeTransform {
	transform(value: number, type: boolean): string {
		if (!type) {
			switch (value) {
				case 0:
					return 'Dejar de seguir';
				case 1:
					return 'Seguir tambien';
				default:
					return 'Seguir';
			}
		}

		if (value === -1) {
			return '';
		}

		if (value === 0) {
			return 'outline-';
		}

		return '';
	}
}
