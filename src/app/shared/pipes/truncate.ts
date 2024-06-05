import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
	transform(value: string, end: number = 20): string {
		if (!value || value.length === 0) {
			return '';
		}
		const trail = value.length > end ? '..' : '';
		return value.substring(0, end) + trail;
	}
}
