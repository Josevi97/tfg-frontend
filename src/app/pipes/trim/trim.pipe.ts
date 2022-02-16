import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'trim',
})
export class TrimPipe implements PipeTransform {
	transform(content: string, value: number, b: boolean): unknown {
		if (!b) {
			return content;
		}

		return content.length > value
			? `${content.substring(0, value)}...`
			: content;
	}
}
