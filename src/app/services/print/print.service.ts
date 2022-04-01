import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { TEXT_BODY, TEXT_HEADER } from 'src/app/constants/text.constants';
import { IEntity } from 'src/app/models/entities.interface';

@Injectable({
	providedIn: 'root',
})
export class PrintService {
	private LEFT_MARGIN: number = 20;
	private START_LINE: number = 30;
	private TEXT_WRAP: number = 80;

	private doc: jsPDF;
	private currentLine: number;

	public sessionAccount: IEntity;

	printReportFromEntity(entity: IEntity, message: string): void {
		this.currentLine = this.START_LINE;

		this.doc = new jsPDF();
		this.addHeader(
			this.processText('Tipo de entidad:', this.processType(entity.type))
		)
			.addHeader(
				this.processText('Fecha de impresion:', this.processDate(new Date()))
			)
			.jump()
			.addHeader('*Informacion de la entidad');

		switch (entity.type) {
			case 'account':
				this.printReportFromAccount(entity);
				break;
			case 'community':
				this.printReportFromCommunity(entity);
				break;
		}

		this.jump(10)
			.addHeader('*Informacion del administrador')
			.printReportFromAccount(this.sessionAccount);

		this.jump().addHeader('*Razones de impresion').addDescription(message);

		this.doc.save('document');
	}

	private processText(message: string, data: string = ''): string {
		return `${message} ${data}`;
	}

	private processType(type: string): string {
		return type === 'account' ? 'CUENTA' : 'COMUNIDAD';
	}

	private processDate(date: Date): string {
		const year: string = this.processNumber(date.getFullYear());
		const month: string = this.processNumber(date.getMonth());
		const day: string = this.processNumber(date.getDate());

		const hour: string = this.processNumber(date.getHours());
		const min: string = this.processNumber(date.getMinutes());

		return `${year}-${month}-${day} ${hour}:${min}`;
	}

	private processNumber(num: number): string {
		return `${num < 10 ? `0${num}` : num}`;
	}

	private printReportFromAccount(entity: IEntity): void {
		this.addBody(this.processText('id:', `${entity.id}`))
			.addBody(this.processText('username:', `${entity.title}`))
			.addBody(this.processText('login:', `${entity.subtitle}`))
			.addBody(this.processText('email:', `${entity.email}`))
			.addBody(this.processText('siguiendo:', `${entity.following}`))
			.addBody(this.processText('seguidores:', `${entity.followers}`))
			.addBody(this.processText('comunidades:', `${entity.communities}`))
			.addBody(this.processText('entradas:', `${entity.entrances}`))
			.addBody(this.processText('comentarios:', `${entity.comments}`))
			.addBody(this.processText('ultima conexion:', `${entity.lastConnection}`))
			.addBody(this.processText('fecha de creacion:', `${entity.createdAt}`));
	}

	private printReportFromCommunity(entity: IEntity): void {
		this.addBody(this.processText('id:', `${entity.id}`))
			.addBody(this.processText('nombre:', `${entity.title}`))
			.addBody(this.processText('seguidores:', `${entity.followers}`))
			.addBody(this.processText('entradas:', `${entity.entrances}`))
			.addBody(this.processText('fecha de creacion:', `${entity.createdAt}`));
	}

	private addHeader(message: string): any {
		if (!message) return;

		this.doc.setFontSize(TEXT_HEADER.size);
		this.doc.text(message, this.LEFT_MARGIN, this.currentLine);
		this.jump(TEXT_HEADER.jumpLine);

		return this;
	}

	private addBody(message: string): any {
		if (!message) return;

		this.doc.setFontSize(TEXT_BODY.size);
		this.doc.text(message, this.LEFT_MARGIN, this.currentLine);
		this.jump(TEXT_BODY.jumpLine);

		return this;
	}

	private addDescription(
		text: string = 'No hay ninguna razon de descripcion'
	): any {
		if (!text) return;

		while (text.length > this.TEXT_WRAP) {
			const array: string[] = text.split(' ');
			let count: number = 0;
			let b: boolean = false;

			for (let i: number = 0; i < array.length && !b; i++) {
				count += array[i].length + 1;
				b = !(
					i + 1 < array.length && count + array[i + 1].length < this.TEXT_WRAP
				);
			}

			const textToPrint: string = text.slice(0, count);
			this.addBody(textToPrint);
			text = text.slice(count, text.length);
		}

		this.addBody(text);
		return this;
	}

	private jump(distance: number = 15): any {
		this.currentLine += distance;
		return this;
	}
}
