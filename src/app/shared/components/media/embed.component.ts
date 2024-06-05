import { Component, Input } from '@angular/core';

@Component({
	selector: 'media-embed',
	templateUrl: './embed.component.html'
})
export class MediaEmbedComponent {
	@Input()
	url: string;

	@Input()
	thumbUrl: string;

	@Input()
	title: string;
}
