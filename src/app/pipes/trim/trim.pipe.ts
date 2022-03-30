import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'trim',
})
export class TrimPipe implements PipeTransform {
	transform(content: string, value: number, b: boolean): unknown {
		if (!b) {
			return content;
		}

		const suffix = '...';

		if (content.indexOf('\n') !== -1) {
			if (content.indexOf('\n') > value) {
				return `${content.substring(0, value)}${suffix}`;
			}

			return `${content.substring(0, content.indexOf('\n'))}${suffix}`;
		}

		return content.length > value
			? `${content.substring(0, value)}${suffix}`
			: content;
	}
}
