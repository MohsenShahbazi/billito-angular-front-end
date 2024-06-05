import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { download, Download, SAVER, Saver } from '../../share/helpers/file.helper';

@Injectable({ providedIn: 'root' })
export class DownloadService {
	progress$: Observable<Download>;

	constructor(private http: HttpClient, @Inject(SAVER) private save: Saver) {}

	download(url: string, filename?: string, autoReset: boolean = true): Observable<Download> {
		return (this.progress$ = this.http
			.get(url, {
				reportProgress: true,
				observe: 'events',
				responseType: 'blob'
			})
			.pipe(
				download(blob => this.save(blob, filename)),
				tap(res => {
					if (autoReset && res?.state === 'DONE') {
						setTimeout(() => this.reset(), 1000);
					}
				})
			));
	}

	blob(url: string): Observable<Blob> {
		return this.http.get(url, { responseType: 'blob' });
	}

	reset() {
		this.progress$ = of();
	}
}
