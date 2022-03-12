import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filePath',
})
export class FilePathPipe implements PipeTransform {
	transform(p: string): string {
		if (p) {
			return p;
		}

		return '../../../../assets/images/not-account-image-found.png';
	}
}
