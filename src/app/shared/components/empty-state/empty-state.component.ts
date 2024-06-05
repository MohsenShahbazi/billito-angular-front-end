import { Component, Input } from '@angular/core';

@Component({
	selector: 'empty-state',
	templateUrl: 'empty-state.component.html'
})
export class EmptyStateComponent {
	@Input()
	title: string = 'noData';

	@Input()
	message: string;

	@Input()
	className: string;

	@Input()
	label: string;

	@Input()
	url: string;

	@Input()
	fragment: string;

	@Input()
	image: string = '/assets/images/no-data.svg';
}
