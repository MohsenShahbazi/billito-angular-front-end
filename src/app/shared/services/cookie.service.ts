import { Injectable } from '@angular/core';
import { BRAND } from '../../../../../intelact/oneblog-web/src/app/app.config';
import { environment } from '../../../../../intelact/oneblog-web/src/environments/environment';
import { CookieService as CookieProvider } from 'ngx-cookie-service';

/**
 * Cookie boot agreement
 */
export const COOKIE_BOOT = 'cookie-boot-' + BRAND + '-' + environment.name;

@Injectable({ providedIn: 'root' })
export class CookieService {
	constructor(private provider: CookieProvider) {}

	public get(key?: string) {
		const val = this.provider.get(key);

		if (val) {
			try {
				const json = JSON.parse(val);
				return typeof json === 'object' ? json : val;
			} catch (e) {
				return val;
			}
		}
	}

	public set(key: string, val: any) {
		val = Array.isArray(val) ? JSON.stringify(val) : val;
		this.provider.set(key, val, 10000, '/');
	}

	public remove(key: string): boolean {
		if (!this.get(key)) return;
		this.provider.delete(key);
		return true;
	}
}
