import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { IEntity } from 'src/app/models/entities.interface';
import { ITextFormat } from 'src/app/models/print.interface';

@Injectable({
	providedIn: 'root',
})
export class PrintService {
	private doc: jsPDF;
	private header: ITextFormat;
	private body: ITextFormat;
	private leftMargin: number = 20;
	private currentLine: number = 30;

	public sessionAccount: IEntity;

	constructor() {
		this.header = {
			size: 16,
			jumLine: 8,
		};
		this.body = {
			size: 13,
			jumLine: 6,
		};
	}

	printReportFromEntity(entity: IEntity, message: string): void {
		this.doc = new jsPDF();
		this.addHeader(
			this.processText('Tipo de entidad', 13, this.processType(entity.type))
		)
			.addHeader(
				this.processText('Fecha de impresion', 6, this.processDate('fecha'))
			)
			.jump()
			.addHeader('Informacion de la entidad:');

		switch (entity.type) {
			case 'account':
				this.printReportFromAccount(entity);
				break;
			case 'community':
				this.printReportFromCommunity(entity);
				break;
		}

		this.jump(10)
			.addHeader('Informacion del administrador:')
			.printReportFromAccount(this.sessionAccount);

		this.jump().addHeader('Razones de impresion:');

		this.doc.save('document');
	}

	private processText(
		message: string,
		tabs: number = 0,
		data: string = ''
	): string {
		let t: string = '';

		for (let i = 0; i < tabs; i++) {
			t += ' ';
		}

		return `${message}${t}${data}`;
	}

	private processType(type: string): string {
		return type === 'account' ? 'CUENTA' : 'COMUNIDAD';
	}

	private processDate(date: string): string {
		return date;
	}

	private printReportFromAccount(entity: IEntity): void {
		this.addBody(this.processText('id', 5, `${entity.id}`))
			.addBody(this.processText('username', 5, `${entity.title}`))
			.addBody(this.processText('login', 5, `${entity.subtitle}`))
			.addBody(this.processText('email', 5, `${entity.email}`))
			.addBody(this.processText('siguiendo', 5, `${entity.following}`))
			.addBody(this.processText('seguidores', 5, `${entity.followers}`))
			.addBody(this.processText('comunidades', 5, `${entity.communities}`))
			.addBody(this.processText('entradas', 5, `${entity.entrances}`))
			.addBody(this.processText('comentarios', 5, `${entity.comments}`))
			.addBody(
				this.processText('ultima conexion', 5, `${entity.lastConnection}`)
			)
			.addBody(this.processText('fecha de creacion', 5, `${entity.createdAt}`));
	}

	private printReportFromCommunity(entity: IEntity): void {
		this.addBody(this.processText('id', 5, `${entity.id}`));
	}

	private addHeader(message: string): any {
		this.doc.setFontSize(this.header.size);
		this.doc.text(message, this.leftMargin, this.currentLine);
		this.jump(this.header.jumLine);
		return this;
	}

	private addBody(message: string): any {
		this.doc.setFontSize(this.body.size);
		this.doc.text(message, this.leftMargin, this.currentLine);
		this.jump(this.body.jumLine);
		return this;
	}

	private addDescription(message: string): void {}

	private jump(distance: number = 15): any {
		this.currentLine += distance;
		return this;
	}
}
