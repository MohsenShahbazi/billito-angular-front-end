import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'contains' })
export class ContainsPipe implements PipeTransform {
	transform(value: string[], name: string): boolean {
		return value && value.includes(name);
	}
}
