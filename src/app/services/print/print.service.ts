import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { IEntity } from 'src/app/models/entities.interface';

@Injectable({
	providedIn: 'root',
})
export class PrintService {
	private doc: jsPDF;
	private fontSize: number = 15;
	private leftMargin: number = 20;
	private lineDistante: number = this.fontSize / 2;
	private currentLine: number = 30;

	constructor() {}

	printReportFromEntity(entity: IEntity, message: string): void {
		this.doc = new jsPDF();
		this.doc.setFontSize(this.fontSize);
		this.addText('Informe de entidad');
		this.addText(`Fecha de impresion: ${new Date().toLocaleString()}`);
		this.addText(
			'*Este informe se ha generado automaticamente por parte del administrador',
			12
		);

		switch (entity.type) {
			case 'account':
				this.printReportFromAccount(entity);
				break;
			case 'community':
				this.printReportFromCommunity(entity);
				break;
		}

		this.doc.save('document');
	}

	private printReportFromAccount(entity: IEntity): void {}

	private printReportFromCommunity(entity: IEntity): void {}

	private addText(
		message: string,
		fontSize: number = 0,
		leftMarging: number = 0
	) {
		this.doc.setFontSize(fontSize ? fontSize : this.fontSize);
		this.doc.text(message, this.leftMargin + leftMarging, this.currentLine);
		this.currentLine += this.lineDistante;
		this.doc.setFontSize(this.fontSize);
	}

	private jump(): any {
		this.lineDistante += 20;
		return this;
	}
}
