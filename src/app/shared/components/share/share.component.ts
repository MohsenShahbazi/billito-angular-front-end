import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'share-content',
	templateUrl: './share.component.html'
})
export class ShareContentComponent {
	@Input() title: string;

	@Input() description: string;

	@Input() url: string;

	@Input() image: string;

	/**
	 * Emit shared provider
	 */
	@Output() onShare: EventEmitter<string> = new EventEmitter<string>();

	/**
	 * Emit shared provider
	 */
	@Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

	/**
	 * Active opened modal
	 */
	activeModal = inject(NgbActiveModal);

	opened(provider: string) {
		this.onShare.next(provider);
	}

	closed() {
		this.onClose.next(true);
	}
}
