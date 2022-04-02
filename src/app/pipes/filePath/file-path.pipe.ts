import { Pipe, PipeTransform } from '@angular/core';
import { RESOURCES_URI } from 'src/environments/environment';

@Pipe({
	name: 'filePath',
})
export class FilePathPipe implements PipeTransform {
	transform(image: string, type: string): string {
		if (image) {
			return `${RESOURCES_URI}/${image}`;
		} else if (type === 'account') {
			return `${RESOURCES_URI}/default-account.png`;
		} else {
			return `${RESOURCES_URI}/default-community.png`;
		}
	}
}
