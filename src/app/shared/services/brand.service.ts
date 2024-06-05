import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../intelact/oneblog-web/src/environments/environment';
import { IResponse, Brand, Promotion } from '@intelact/bright';

@Injectable({ providedIn: 'root' })
export class BrandService {
	constructor(private http: HttpClient) {}

	init() {
		const url = environment.apiUrl + '/init';
		return <Observable<IResponse<Brand>>>this.http.post(url, {});
	}

	healthcheck() {
		const url = environment.apiUrl + '/healthcheck';
		return <Observable<IResponse<Brand>>>this.http.get(url);
	}

	contact(name: string, email: string, message: string) {
		const url = environment.apiUrl + '/contact';
		return <Observable<IResponse<boolean>>>this.http.post(url, { name, email, message });
	}

	getPromotions() {
		const url = environment.apiUrl + '/promotions';
		return <Observable<IResponse<Promotion[]>>>this.http.get(url);
	}
}
