import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'author-card',
	templateUrl: './card.component.html'
})
export class AuthorCardComponent {
	@Input()
	author: any;

	@Input()
	title: string;

	@Input()
	showTotalArticles: boolean = true;

	@Output()
	onClick: EventEmitter<string> = new EventEmitter<string>();
}
