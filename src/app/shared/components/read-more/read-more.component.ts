import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'read-more',
	templateUrl: './read-more.component.html'
})
export class ReadMoreComponent implements OnInit {
	@Input() content: string;

	@Input() limit: number = 160;

	@Input()
	completeWords: boolean = true;

	@Input() className: string;

	/**
	 * Toggled content indicator
	 */
	isContentToggled: boolean;

	/**
	 * Don't show read more button when origin content is sorter as trucated content
	 */
	showButtons: boolean;

	private originContent: string;

	ngOnInit() {
		if (this.content.length <= this.limit) {
			this.showButtons = false;
			return;
		} else {
			this.showButtons = true;
		}

		this.originContent = this.content;
		this.content = this.formatContent(this.content);
	}

	toggleContent() {
		this.isContentToggled = !this.isContentToggled;
		this.content = this.isContentToggled
			? this.originContent
			: this.formatContent(this.content);
	}

	formatContent(content: string) {
		if (this.completeWords) {
			this.limit = content.slice(0, this.limit).lastIndexOf(' ');
		}
		return `${content.slice(0, this.limit)}...`;
	}
}
