import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { BreakpointService } from '../../../../../../intelact/oneblog-web/src/app/shared/services';
import { Brand, Link, User } from '@intelact/bright';
import { AppState } from '../../../../../../intelact/oneblog-web/src/app/store/store.state';
import { getUser, isUserAuthenticated } from '../../../../../../intelact/oneblog-web/src/app/store/user/user.selectors';
import { getBrand, getBrandMainMenu } from '../../../../../../intelact/oneblog-web/src/app/store/brand/brand.selectors';
import { AboutRoutes } from '../../../../../../intelact/oneblog-web/src/app/modules/about/about.routing';

@Component({
	selector: 'main-layout',
	templateUrl: 'main-layout.component.html'
})
export class MainLayoutComponent implements OnInit, OnDestroy {
	@Input()
	name: string = '';

	@Input()
	data: any;

	/**
	 * Auth state
	 */
	auth$: Observable<boolean>;

	/**
	 * Brand model
	 */
	brand: Brand;

	/**
	 * Auth user
	 */
	user: User;

	/**
	 * Main menu, build from api
	 */
	mainMenu: Link[];

	/**
	 * Main menu, build from api
	 */
	aboutMenu: Link[];

	/**
	 * Brand platform links. Merged store and social links.
	 */
	platformLinks: Link[];

	/**
	 * Brand legal links
	 */
	legalLinks: Link[];

	/**
	 *
	 */
	params: Params;

	/**
	 * Copyright current year
	 */
	copyrightYear: number = new Date().getFullYear();

	modalSearchRef: NgbModalRef;
	modalMobileRef: NgbModalRef;

	private sub$: Subscription[] = [];

	constructor(
		private store$: Store<AppState>,
		private router$: Router,
		private bp$: BreakpointService,
		private modalService: NgbModal
	) {}

	ngOnInit() {
		let s: Subscription;

		// current auth state
		this.auth$ = this.store$.select(isUserAuthenticated);

		// close all modals on matching lg breakpoint
		this.bp$.current$.subscribe(bp => {
			if (bp === 'lg') {
				if (this.modalMobileRef) {
					this.modalMobileRef.close();
				}
				if (this.modalSearchRef) {
					this.modalSearchRef.close();
				}
			}
		});

		if (AboutRoutes) {
			this.aboutMenu = [];
			const routes = AboutRoutes.find(i => i.path === '')?.children || [];

			// build footer about menu based on about module routes
			for (const route of routes) {
				if (route?.data?.title) {
					this.aboutMenu.push(
						new Link({
							id: 'nav-about-' + route?.path.replaceAll('/', '-'),
							title: route.data.title,
							url: '/about/' + route.path
						})
					);
				}
			}
		}

		// layout definitions
		this.setLayout();

		// auth user
		s = this.store$
			.select(getUser)
			.subscribe(user => (this.user = plainToClass(User, user)));
		this.sub$.push(s);

		// brand
		s = this.store$.select(getBrand).subscribe(brand => {
			if (!brand) return;

			// current brand
			this.brand = plainToClass(Brand, brand);

			// footer platform links, combine store and social links
			const mobileLinks = this.brand.getMobileStoreLinks();
			const socialLinks = this.brand.getSocialLinks();
			this.platformLinks = [...mobileLinks, ...socialLinks];

			// brand social platform links
			this.legalLinks = this.brand.getLegalLinks();
		});
		this.sub$.push(s);

		// build main menu based on allowed brand modules
		s = this.store$
			.select(getBrandMainMenu)
			.subscribe(modules => (this.mainMenu = modules));
		this.sub$.push(s);
	}

	openMobileMenu(content: TemplateRef<any>) {
		this.modalMobileRef = this.modalService.open(content, {
			backdropClass: 'backdrop-white',
			modalDialogClass: 'mobile-menu',
			centered: true
		});
	}

	openMobileSearch(content: TemplateRef<any>) {
		this.modalSearchRef = this.modalService.open(content, {
			backdropClass: 'backdrop-search',
			modalDialogClass: 'mobile-search'
		});
	}

	search(term?: string) {
		this.modalSearchRef.close();
		const queryParams: Params = term?.length ? { term } : null;
		this.router$.navigate(['/browse'], { queryParams });
	}

	private setLayout() {
		// remove all layout classes
		for (let i = document.body.classList.length - 1; i >= 0; i--) {
			const className = document.body.classList[i];
			if (className.startsWith('layout-')) {
				document.body.classList.remove(className);
			}
		}

		// add component class name
		document.body.classList.add('layout-main');
	}

	ngOnDestroy(): void {
		for (const s of this.sub$) s.unsubscribe();
	}
}
