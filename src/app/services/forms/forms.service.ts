import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
	providedIn: 'root',
})
export class FormsService {
	constructor() {}

	inputValid(key: string, formGroup: FormGroup): string {
		return !formGroup.get(key)!.valid &&
			formGroup.get(key)!.touched &&
			formGroup.get(key)!.dirty
			? 'input-error'
			: 'input-secondary';
	}

	checkInvalid(formGroup: FormGroup, ref: ChangeDetectorRef): void {
		formGroup.markAllAsTouched();
		ref.detectChanges();
	}
}
