import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Item } from '@intelact/bright';

@Component({
	selector: 'card-post',
	templateUrl: './card-post.component.html'
})
export class CardPostComponent {
	@Input()
	image: string;

	@Input()
	icon: IconProp;

	@Input()
	svgIcon: string;

	@Input()
	title: string;

	@Input()
	description: string;

	@Input()
	author: string;

	@Input()
	tags: string[];

	@Input()
	duration: number;

	@Input()
	date: Date;

	@Input()
	bookmark: Item;

	@Input()
	like: Item;

	@Input()
	share: Item;

	@Input()
	hit: Item;

	@Input()
	showAction: boolean = true;

	@Input()
	loading: boolean;

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
