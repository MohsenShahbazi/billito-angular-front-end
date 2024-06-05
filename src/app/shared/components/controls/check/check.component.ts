import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'check-control',
	templateUrl: './check.component.html'
})
export class CheckControlComponent {
	@Output()
	onChange = new EventEmitter<boolean>();

	@Input()
	name: string = 'control';

	@Input()
	label: string;

	@Input()
	selected: boolean;

	@Input()
	disabled: boolean = false;

	@Input()
	type: 'checkbox' | 'radio' = 'checkbox';

	change() {
		if (this.disabled) return;

		this.selected = !this.selected;
		this.onChange.emit(this.selected);
	}
}
