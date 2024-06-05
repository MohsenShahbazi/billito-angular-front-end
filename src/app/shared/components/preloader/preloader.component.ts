import { Component, Input } from '@angular/core';

export enum PreloaderType {
	Spinner = 'spinner',
	Infinity = 'infinity',
	Content = 'content',
	Card = 'card',
	CardImage = 'card-image',
	BarsSignal = 'bars-signal'
}

@Component({
	selector: 'preloader',
	templateUrl: './preloader.component.html'
})
export class PreloaderComponent {
	@Input()
	type: string = PreloaderType.Spinner;

	@Input()
	size: number = 10;

	@Input()
	list: boolean;

	readonly types = PreloaderType;
}
