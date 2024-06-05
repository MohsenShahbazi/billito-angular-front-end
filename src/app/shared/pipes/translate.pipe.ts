import { Pipe, PipeTransform } from '@angular/core';
import { Messages } from '../../../../../intelact/oneblog-web/src/app/app.messages';

@Pipe({ name: 'translate' })
export class TranslatePipe implements PipeTransform {
	transform(keyword: string, args?: { [k: string]: any }): string {
		keyword = Messages[keyword] || keyword;

		if (args) {
			for (const [key, value] of Object.entries(args)) {
				keyword = keyword.replaceAll(`{${key}}`, value);
			}
		}

		return keyword;
	}
}
