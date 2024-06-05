import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Messages } from '@app/app.messages';

@Component({
	selector: 'search',
	templateUrl: './search.component.html'
})
export class SearchComponent {
	@Input()
	placeholder: string = Messages.searchPlacehoder;

	@Input()
	term: string;

	@Input()
	history: string[] = [];

	@Output()
	onChange: EventEmitter<string> = new EventEmitter<string>();

	@Output()
	onSubmit: EventEmitter<string> = new EventEmitter<string>();

	@Output()
	onReset: EventEmitter<boolean> = new EventEmitter<boolean>();

	onKeyUp(e: any) {
		// set search keyword
		this.term = e.target.value;

		// this.term = e.target.value
		this.onChange.emit(e.target.value);

		switch (e.key) {
			case 'Escape':
				this.reset();
				e.preventDefault();
				break;
			case 'Enter':
				this.search();
				e.preventDefault();
				break;
		}
	}

	search(): void {
		this.onSubmit.emit(this.term);
	}

	reset() {
		this.term = null;
		this.onReset.emit(true);
	}
}
