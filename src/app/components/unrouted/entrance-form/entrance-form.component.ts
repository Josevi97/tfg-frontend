import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormData } from 'src/app/models/forms.interface';
import { FormsService } from 'src/app/services/forms/forms.service';

@Component({
	selector: 'app-entrance-form',
	templateUrl: './entrance-form.component.html',
	styleUrls: ['./entrance-form.component.css'],
})
export class EntranceFormComponent implements OnInit {
	public onSuccess: Function;
	public formGroup: FormGroup;
	public formData: IFormData[];

	constructor(
		private ref: ChangeDetectorRef,
		private formBuilder: FormBuilder,
		public formsService: FormsService
	) {
		this.formData = [
			{
				label: 'Titulo',
				placeholder: 'Como puedo arreglar cors?',
				type: 'text',
				key: 'title',
			},
		];

		this.formGroup = this.formBuilder.group({
			title: ['', [Validators.required, Validators.minLength(4)]],
			body: ['', [Validators.required, Validators.minLength(4)]],
		});
	}

	ngOnInit(): void {}

	onSubmit(): void {
		this.formsService.checkInvalid(this.formGroup, this.ref);

		if (this.formGroup.valid && this.onSuccess !== undefined) {
			this.onSuccess();
		}
	}
}
