import { Component, Input, Output, EventEmitter } from '@angular/core';

export enum PaginationApperance {
	Simply = 'simply',
	Paging = 'paging'
}

@Component({
	selector: 'pagination',
	templateUrl: './pagination.component.html'
})
export class PaginationComponent {
	@Input()
	currentPage: number;

	@Input()
	totalPages: number;

	@Input()
	label: string = 'pageOf';

	@Input()
	showAllways: boolean;

	@Input()
	showLabelAllways: boolean;

	@Input()
	apperance: PaginationApperance = PaginationApperance.Simply;

	@Output()
	onPrevious = new EventEmitter<number>();

	@Output()
	onNext = new EventEmitter<number>();

	@Output()
	onPage = new EventEmitter<number>();

	@Output()
	onFirstPage = new EventEmitter<number>();

	@Output()
	onLastPage = new EventEmitter<number>();

	previous() {
		let currentPage = this.currentPage;
		if (currentPage === 1) return;
		this.currentPage = currentPage--;
		this.onPrevious.emit(currentPage);
	}

	next() {
		let currentPage = this.currentPage;
		if (currentPage === this.totalPages) return;
		this.currentPage = currentPage++;
		this.onNext.emit(currentPage);
	}

	page(page: number) {
		if (this.currentPage === page) return;
		this.currentPage = page;
		this.onPage.emit(this.currentPage);
	}

	firstPage() {
		if (this.currentPage === 1) return;
		this.currentPage = 1;
		this.onFirstPage.emit(this.currentPage);
	}

	lastPage() {
		if (this.currentPage === this.totalPages) return;
		this.currentPage = this.totalPages;
		this.onLastPage.emit(this.currentPage);
	}
}
