import { Injectable } from '@angular/core';
import { Notification, NotificationType } from '@intelact/bright';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
	private subject$ = new Subject<Notification>();

	// data: Notification[] = [];

	add(notification: Notification) {
		this.subject$.next(notification);
	}

	get get$() {
		return this.subject$.asObservable();
	}

	info(message: string, options?: Partial<Notification>) {
		this.add(
			new Notification({
				...options,
				type: NotificationType.Info,
				message
			})
		);
	}

	success(message: string, options?: Partial<Notification>) {
		this.add(
			new Notification({
				...options,
				type: NotificationType.Success,
				message
			})
		);
	}

	warning(message: string, options?: Partial<Notification>) {
		this.add(
			new Notification({
				...options,
				type: NotificationType.Warning,
				message
			})
		);
	}

	error(message: string, options?: Partial<Notification>) {
		this.add(
			new Notification({
				...options,
				type: NotificationType.Error,
				message
			})
		);
	}
}
