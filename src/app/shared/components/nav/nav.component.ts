import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Link } from '@intelact/bright';

@Component({
	selector: 'app-nav',
	templateUrl: 'nav.component.html'
})
export class NavComponent {
	@Input()
	data: Link[];

	@Input()
	name: string;

	@Input()
	className: string;

	@Input()
	showIcon: boolean = true;

	@Input()
	showTitle: boolean = true;

	@Output()
	onClick: EventEmitter<Link> = new EventEmitter<Link>();

	click(item: Link) {
		this.onClick.emit(item);
	}
}
