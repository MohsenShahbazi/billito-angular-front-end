import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpHeaders,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../../../intelact/oneblog-web/src/environments/environment';
import { IUserAgent } from '@intelact/bright';
import { BRAND } from '../../../../../intelact/oneblog-web/src/app/app.config';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../intelact/oneblog-web/src/app/store/store.state';
import { Preloader } from '../../../../../intelact/oneblog-web/src/app/store/brand/brand.actions';

@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {
	constructor(private store$: Store<AppState>) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.url.startsWith(environment.apiUrl)) {
			this.store$.dispatch(Preloader({ show: true }));

			let headers: HttpHeaders = req.headers;

			const device: Partial<IUserAgent> = {
				origin: window.location.host,
				model: window.navigator.userAgent,
				language: window.navigator.language,
				brand: BRAND,
				os: 'WEB'
			};

			headers = headers
				.set('Access-Control-Allow-Origin', '*')
				.set(
					'Access-Control-Allow-Headers',
					'Origin, Content-Type, Accept, Access-Control-Allow-Origin'
				)
				.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
				.set('Access-Control-Allow-Credentials', 'true')
				.set('Content-Type', 'application/json')
				.set('Cache-Control', 'no-cache')
				.set('x-app-key', environment.apyKey)
				.set('x-user-agent', JSON.stringify(device))
				.set('x-app-language', environment.language)
				.delete('x-app-uid');

			req = req.clone({ headers });
		}

		return next.handle(req).pipe(
			map((e: HttpEvent<any>) => {
				this.store$.dispatch(Preloader({ show: false }));
				return e;
			}),
			catchError((e: HttpErrorResponse) => {
				this.store$.dispatch(Preloader({ show: false }));
				return throwError(() => e);
			})
		);
	}
}
