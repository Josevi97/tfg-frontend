import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'entityImgButton',
})
export class EntityImgButtonPipe implements PipeTransform {
	transform(value: string): string {
		if (!value) {
			return 'undo';
		} else if (value === 'new') {
			return 'close';
		}

		return 'delete';
	}
}
