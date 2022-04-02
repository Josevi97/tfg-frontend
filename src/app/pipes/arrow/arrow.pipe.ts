import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'arrow',
})
export class ArrowPipe implements PipeTransform {
	transform(b: boolean): string {
		return `${b ? 'up' : 'down'}-arrow`;
	}
}
