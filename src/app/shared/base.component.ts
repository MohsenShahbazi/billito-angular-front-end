import { Directive, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { BreakpointService } from '../../../../../billito-angular-front-end/src/app/core/services';
import { NotificationService } from '../../../../../billito-angular-front-end/src/app/core/services';
import { Brand, User } from '@intelact/bright';
import { AppState } from '@store/store.state';
import { getBrand } from '@store/brand/brand.selectors';
import { getUser, isUserAuthenticated } from '@store/user/user.selectors';
import { TranslatePipe } from '../../../../../billito-angular-front-end/src/app/core/pipes/translate.pipe';
import { BRAND } from '@app/app.config';

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
	/**
	 * State management
	 */
	protected readonly title$ = inject(Title);

	/**
	 * State management
	 */
	protected readonly meta$ = inject(Meta);

	/**
	 * State management
	 */
	// prettier-ignore
	protected readonly store$ = inject(Store<AppState>);

	/**
	 * Routing
	 */
	protected readonly router$ = inject(Router);

	/**
	 * Notification
	 */
	protected readonly notify$ = inject(NotificationService);

	/**
	 * Breakpoint services
	 * !!IMPORTANT: this property must be public
	 */
	public readonly bp$ = inject(BreakpointService);

	/**
	 * Component ready state
	 */
	ready$ = new BehaviorSubject<boolean>(false);

	/**
	 * Base component ready
	 */
	brandReady$ = new BehaviorSubject<Brand>(undefined);

	/**
	 * Component subscribers
	 */
	protected readonly sub$: Subscription[] = [];

	/**
	 * Brand
	 */
	public brand: Brand;

	/**
	 * User
	 */
	public user: User;

	/**
	 * Auth state
	 */
	public auth$: Observable<boolean>;

	/**
	 * Translator
	 */
	protected translate = new TranslatePipe();

	ngOnInit(pageTitle?: string): void {
		// auth state
		this.auth$ = this.store$.select(isUserAuthenticated);

		// auth user
		this.store$.select(getUser).subscribe(user => this.user = plainToClass(User, user));

		// get brand
		this.store$.select(getBrand).subscribe(brand => {
			if (!brand) return;
			this.brand = plainToClass(Brand, brand);
			this.setPageTitle(pageTitle);
			this.setPageMeta();
			this.brandReady$.next(this.brand);
		});
	}

	ngOnDestroy(): void {
		this.setPageTitle();
		this.ready$.complete();
		for (const s of this.sub$) s.unsubscribe();
	}

	protected setPageTitle(pageTitle?: string) {
		let title = this?.brand ? this.brand.title + ' - ' + this.brand.slogan : BRAND;

		if (pageTitle) {
			title += ' - ' + this.translate.transform(pageTitle);
		}

		this.title$.setTitle(title);
	}

	protected setPageMeta() {
		this.meta$.updateTag({ property: 'og:title', content: this?.brand?.title + ' - ' + this?.brand?.slogan });
		this.meta$.updateTag({ property: 'og:description', content: '' });
		this.meta$.updateTag({ property: 'og:image', content: this?.brand?.logo });
		this.meta$.updateTag({ property: 'og:url', content: window.location.href });
		this.meta$.updateTag({ name: 'twitter:title', content: this?.brand?.title });
		this.meta$.updateTag({ name: 'twitter:text:title', content: this?.brand?.title });
		this.meta$.updateTag({ name: 'twitter:description', content: this?.brand?.description });
		this.meta$.updateTag({ name: 'twitter:image', content: this?.brand?.logo });
	}
}
