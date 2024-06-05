import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'auth-layout',
	templateUrl: 'auth-layout.component.html'
})
export class AuthLayoutComponent implements OnInit {
	ngOnInit() {
		// layout definitions
		this.setLayout();
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
		document.body.classList.add('layout-auth');
	}
}
