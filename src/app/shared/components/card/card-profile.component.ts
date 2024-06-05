import { Component, Input } from '@angular/core';

@Component({
	selector: 'card-profile',
	templateUrl: './card-profile.component.html'
})
export class CardProfileComponent {
	@Input()
	image: string;

	@Input()
	title: string;

	@Input()
	description: string;
}
