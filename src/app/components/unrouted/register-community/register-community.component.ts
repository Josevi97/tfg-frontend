import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccount } from 'src/app/models/accounts.interface';
import { IRegisterCommunity } from 'src/app/models/communities.interface';
import { IFormData } from 'src/app/models/forms.interface';
import { CommunitiesService } from 'src/app/services/communities/communities.service';
import { FormsService } from 'src/app/services/forms/forms.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
	selector: 'app-register-community',
	templateUrl: './register-community.component.html',
	styleUrls: ['./register-community.component.css'],
})
export class RegisterCommunityComponent implements OnInit {
	public onSuccess: Function;
	public onError: Function;
	public formGroup: FormGroup;
	public formData: IFormData[];
	public onFail: Function;

	constructor(
		private ref: ChangeDetectorRef,
		private sessionService: SessionService,
		private communitiesService: CommunitiesService,
		private formBuilder: FormBuilder,
		public formsService: FormsService
	) {
		this.formData = [
			{
				label: 'Nombre',
				placeholder: 'linux',
				type: 'text',
				key: 'name',
			},
		];

		this.formGroup = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(4)]],
			description: [''],
		});
	}

	ngOnInit(): void {}

	onSubmit(): void {
		this.sessionService
			.check()
			.subscribe((session: IAccount) =>
				session?.admin ? this.createCommunity() : null
			);
	}

	createCommunity(): void {
		this.formsService.checkInvalid(this.formGroup, this.ref);

		if (!this.formGroup.valid) {
			if (this.onFail) {
				this.onFail('void');
			}
			return;
		}

		const data: IRegisterCommunity = {
			name: this.formGroup.get('name')!.value,
			description: this.formGroup.get('description')!.value,
		};

		this.communitiesService.register(data).subscribe(
			() => (this.onSuccess ? this.onSuccess() : null),
			() => {
				this.onError ? this.onError(this.formGroup.valid) : null;
				this.onFail ? this.onFail('invalid') : null;
			}
		);
	}
}
