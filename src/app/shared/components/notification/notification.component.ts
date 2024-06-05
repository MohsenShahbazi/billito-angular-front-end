import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Notification } from '@intelact/bright';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {
	@Input()
	notification: Notification;

	@Output()
	onClose: EventEmitter<Notification> = new EventEmitter<Notification>();

	constructor(private host: ElementRef<HTMLElement>) {}

	ngOnInit(): void {
		if (this.notification?.autoClose) {
			setTimeout(() => this.close(), this.notification.autoClose);
		}
	}

	close() {
		this.onClose.emit(this.notification);
		this.host.nativeElement.remove();
	}
}
