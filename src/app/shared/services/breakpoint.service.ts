import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { startWith, map, distinctUntilChanged, shareReplay } from 'rxjs/operators';

const BOOTSTRAP_BREAKPOINTS: Map<string, string> = new Map([
	['xxl', '(min-width: 1400px)'],
	['xl', '(min-width: 1200px)'],
	['lg', '(min-width: 992px)'],
	['md', '(min-width: 768px)'],
	['sm', '(min-width: 576px)'],
	['xs', '(max-width: 575px)']
]);

const BREAKPOINTS_SMALL_SCREENS: string[] = ['xs', 'sm', 'md'];

@Injectable({ providedIn: 'root' })
export class BreakpointService {
	private _size$: Observable<string>;

	isDownLG$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	isUpLG$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	current$ = new BehaviorSubject<string>(null);

	down$ = {
		sm: new BehaviorSubject<boolean>(false),
		md: new BehaviorSubject<boolean>(false),
		lg: new BehaviorSubject<boolean>(false),
		xl: new BehaviorSubject<boolean>(false)
	};

	up$ = {
		xs: new BehaviorSubject<boolean>(false),
		sm: new BehaviorSubject<boolean>(false),
		md: new BehaviorSubject<boolean>(false),
		lg: new BehaviorSubject<boolean>(false),
		xl: new BehaviorSubject<boolean>(false)
	};

	constructor() {
		this._size$ = fromEvent(window, 'resize').pipe(
			startWith(this._getScreenSize()),
			map(() => this._getScreenSize()),
			distinctUntilChanged(),
			shareReplay(1)
		);

		this.isDownLG$ = new BehaviorSubject<boolean>(false);
		this.isUpLG$ = new BehaviorSubject<boolean>(false);

		// detect small screen
		this.size$.subscribe(bp => {
			this.current$.next(bp);

			// down indicators
			this.down$.sm.next(bp === 'xs');
			this.down$.md.next(['xs', 'sm'].includes(bp));
			this.down$.lg.next(['xs', 'sm', 'md'].includes(bp));
			this.down$.xl.next(['xs', 'sm', 'md', 'lg'].includes(bp));

			// up indicators
			this.up$.xs.next(['sm', 'md', 'lg', 'xl', 'xxl'].includes(bp));
			this.up$.sm.next(['md', 'lg', 'xl', 'xxl'].includes(bp));
			this.up$.md.next(['lg', 'xl', 'xxl'].includes(bp));
			this.up$.lg.next(['xl', 'xxl'].includes(bp));
			this.up$.xl.next(bp === 'xxl');

			if (BREAKPOINTS_SMALL_SCREENS.includes(bp)) {
				this.isDownLG$.next(true);
				this.isUpLG$.next(false);
			} else {
				this.isDownLG$.next(false);
				this.isUpLG$.next(true);
			}
		});
	}

	public get size$(): Observable<string> {
		return this._size$;
	}

	private _getScreenSize(): string {
		const [[newSize = 'never']] = Array.from(BOOTSTRAP_BREAKPOINTS.entries()).filter(
			([, mediaQuery]) => {
				return window.matchMedia(mediaQuery).matches;
			}
		);
		return newSize;
	}
}
