import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'vote',
})
export class VotePipe implements PipeTransform {
	transform(value: number, arrow: boolean): String {
		const pressed = 'pressed';

		if (arrow) {
			return value === 1 ? pressed : '';
		}

		return value === 0 ? pressed : '';
	}
}
