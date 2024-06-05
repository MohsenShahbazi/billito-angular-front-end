import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '@intelact/bright';

@Component({
	selector: 'card-question',
	templateUrl: './card-question.component.html'
})
export class CardQuestionComponent {
	@Input()
	image: string;

	@Input()
	author: string;

	@Input()
	title: string;

	@Input()
	content: string;

	@Input()
	tags: string[];

	@Input()
	private: boolean;

	@Input()
	isHtml: boolean;

	@Input()
	date: Date;

	@Input()
	bookmark: Item<number>;

	@Input()
	like: Item<number>;

	@Input()
	share: Item<number>;

	@Input()
	hit: Item<number>;

	@Input()
	reactions: Item<number>;

	@Input()
	badge: Item<string>;

	@Output()
	onBookmark: EventEmitter<Item> = new EventEmitter<Item>();

	@Output()
	onShare: EventEmitter<Item> = new EventEmitter<Item>();

	@Output()
	onLike: EventEmitter<Item> = new EventEmitter<Item>();

	doBookmark() {
		this.bookmark.active = !this.bookmark.active;
		this.bookmark.value = this.bookmark.active
			? this.bookmark.value + 1
			: this.bookmark.value - 1;
		this.onBookmark.emit(this.bookmark);
	}

	doLike() {
		this.like.active = !this.like.active;
		this.like.value = this.like.active ? this.like.value + 1 : this.like.value - 1;
		this.onLike.emit(this.like);
	}

	doShare() {
		this.share.active = true;
		this.share.value = this.share.value ? this.share.value + 1 : 1;
		this.onShare.emit(this.share);
	}
}
