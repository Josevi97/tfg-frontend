import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPost } from 'src/app/models/posts.interface';

@Component({
	selector: 'app-pinspect',
	templateUrl: './pinspect.component.html',
	styleUrls: ['./pinspect.component.css'],
})
export class PinspectComponent implements OnInit {
	public post: IPost;
	public onSubmit: Function;
	public formGroup: FormGroup;
	public onCiteClick: Function;

	constructor(private formBuilder: FormBuilder) {
		this.formGroup = this.formBuilder.group({
			comment: [
				'',
				[
					Validators.required,
					Validators.minLength(1),
					Validators.maxLength(500),
				],
			],
		});
	}

	ngOnInit(): void {}

	submit(): void {
		if (this.onSubmit && this.formGroup.valid) {
			this.onSubmit(this.formGroup.get('comment').value);
		}
	}
}
