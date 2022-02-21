import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { IEntranceForm } from 'src/app/models/entrances.interface';
import { IPost } from 'src/app/models/posts.interface';

@Injectable({
	providedIn: 'root',
})
export class FormsService {
	constructor() {}

	inputValid(key: string, formGroup: FormGroup): string {
		return !formGroup.get(key)!.valid && formGroup.get(key)!.touched
			? 'input-error'
			: 'input-secondary';
	}

	checkInvalid(formGroup: FormGroup, ref: ChangeDetectorRef = null): void {
		formGroup.markAllAsTouched();

		if (ref) {
			ref.detectChanges();
		}
	}

	updatePost(post: IPost, form: FormGroup): IPost {
		post.title = form.get('title')!.value;
		post.body = form.get('body')!.value;

		return post;
	}

	toEntranceForm(form: FormGroup): IEntranceForm {
		return {
			title: form.get('title')!.value,
			body: form.get('body')!.value,
		};
	}

	fromPost(post: IPost): IEntranceForm {
		if (post === undefined) {
			return null;
		}

		return {
			title: post?.title,
			body: post?.body,
		};
	}
}
