import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'date',
})
export class DatePipe implements PipeTransform {
	transform(value: string): string {
		const date = value.split(' ')[0];
		const time = value.split(' ')[1];

		const year = parseInt(date.split('-')[0]);
		const month = parseInt(date.split('-')[1]);
		const day = parseInt(date.split('-')[2]);

		const hour = parseInt(time.split(':')[0]);
		const min = parseInt(time.split(':')[1]);

		const today = new Date();

		if (today.getFullYear() !== year) {
			return `${today.getFullYear() - year} años`;
		}

		if (today.getMonth() + 1 !== month) {
			// requires fix it
			return `${today.getMonth() + 1 - month} meses`;
		}

		if (today.getDate() !== day) {
			// requires fix it
			return `${today.getDate() - day} dias`;
		}

		if (today.getHours() !== hour) {
			// requires fix it
			return `${today.getHours() - hour} horas`;
		}

		if (today.getMinutes() !== min) {
			// requires fix it
			return `${today.getMinutes() - min} minutos`;
		}

		return 'menos de 1 minuto';
	}
}
