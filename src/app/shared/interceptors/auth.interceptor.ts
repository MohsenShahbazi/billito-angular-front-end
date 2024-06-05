import { Observable } from 'rxjs';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../intelact/oneblog-web/src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../intelact/oneblog-web/src/app/store/store.state';
import { User } from '@intelact/bright';
import { getUser } from '../../../../../intelact/oneblog-web/src/app/store/user/user.selectors';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
	user: User;

	constructor(private store$: Store<AppState>) {
		this.store$.select(getUser).subscribe(user => (this.user = user));
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this?.user?.uid && request.url.startsWith(environment.apiUrl)) {
			let headers: HttpHeaders = request.headers;
			headers = headers.set('x-app-uid', this.user?.uid || '');
			request = request.clone({ headers });
		}
		return next.handle(request);
	}
}
