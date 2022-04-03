import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'entityImgButton',
})
export class EntityImgButtonPipe implements PipeTransform {
	transform(image: string, newFile: string): string {
		if (!newFile && newFile !== image) {
			return 'undo';
		} else if (newFile !== image) {
			return 'close';
		}

		return 'delete';
	}
}
