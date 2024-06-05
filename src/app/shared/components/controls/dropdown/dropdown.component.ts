import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Item } from '@intelact/bright';
import { Context } from '@intelact/bright';

@Component({
	selector: 'dropdown',
	templateUrl: './dropdown.component.html'
})
export class DropdownComponent {
	@Output()
	onChange = new EventEmitter<any[]>();

	@Output()
	onReset = new EventEmitter<void>();

	@Input()
	name: string;

	@Input()
	label: string;

	@Input()
	placeholder: string;

	@Input()
	value: any[] = [];

	@Input()
	multiple: boolean;

	@Input()
	showBadge: boolean = true;

	@Input()
	resetAll: boolean = true;

	@Input()
	data: Item[];

	@Input()
	icon: IconProp;

	@Input()
	context: string = Context.Light;

	/**
	 * Placement specifies where the popup should be positioned in the order of preference.
	 * Accepts an array of strings or a string with space separated values.
	 * Possible values are:
	 * - "top", "top-start", "top-left", "top-end", "top-right",
	 * - "bottom", "bottom-start", "bottom-left", "bottom-end", "bottom-right",
	 * - "start", "left", "start-top", "left-top", "start-bottom", "left-bottom",
	 * - "end", "right", "end-top", "right-top", "end-bottom", "right-bottom"
	 */
	@Input()
	placement: string = 'bottom-start';

	/**
	 * Indicates whether the dropdown should be closed when clicking one of dropdown items or pressing ESC.
	 */
	@Input()
	autoClose: boolean | 'inside' | 'outside' = true;

	/**
	 * A custom class that is applied only to the ngbDropdownMenu parent element.
	 */
	@Input()
	dropdownClass: string = 'dropdown-popup-wrapper';

	change(item: Item) {
		const hasValue = this.value?.find(i => i === item.value);
		if (hasValue) {
			this.value = this.multiple ? this.value.filter(i => i !== item.value) : [];
		} else {
			this.value = this.multiple ? [...(this.value || []), item.value] : [item.value];
		}
		this.onChange.emit(this.value);
	}

	reset() {
		this.value = [];
		this.onChange.emit(this.value);
	}
}
