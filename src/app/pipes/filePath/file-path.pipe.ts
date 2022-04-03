import { Pipe, PipeTransform } from '@angular/core';
import { RESOURCES_URI } from 'src/environments/environment';

@Pipe({
	name: 'filePath',
})
export class FilePathPipe implements PipeTransform {
	transform(
		image: string,
		type: string,
		newFile: any = '1'
	): string | ArrayBuffer {
		if (newFile && newFile !== '1' && newFile !== image) {
			return newFile;
		} else if (!newFile || !image) {
			if (type === 'account') {
				return `${RESOURCES_URI}/default-account.png`;
			} else {
				return `${RESOURCES_URI}/default-community.png`;
			}
		} else return `${RESOURCES_URI}/${image}`;
	}
}
