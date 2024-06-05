import { HttpParams } from '@angular/common/http';
import { IPaginationRequest } from '@intelact/common';

export function paginationParams(pagination: IPaginationRequest): HttpParams {
	let params = new HttpParams();

	if (pagination.page) {
		params = params.append('page', pagination.page);
	}

	if (pagination.limit) {
		params = params.append('limit', pagination.limit);
	}

	if (pagination.orderBy) {
		params = params.append('orderBy', pagination.orderBy);
	}

	if (pagination.orderDirection) {
		params = params.append('orderDirection', pagination.orderDirection);
	}

	if (pagination.params) {
		Object.keys(pagination.params).forEach(key => {
			if (Array.isArray(pagination.params[key])) {
				// transform to htpp query array
				const arr = pagination.params[key] as any[];
				for (let val of arr) {
					val = val !== null && val !== undefined ? val : '';
					params = params.append(key, val);
				}
			} else {
				const val =
					pagination.params[key] !== null && pagination.params[key] !== undefined
						? pagination.params[key]
						: '';
				params = params.append(key, val);
			}
		});
	}

	return params;
}
