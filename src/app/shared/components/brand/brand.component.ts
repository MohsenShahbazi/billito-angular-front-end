import { Component, Input } from '@angular/core';

@Component({
	selector: 'brand',
	templateUrl: 'brand.component.html'
})
export class BrandComponent {
	@Input()
	slogan: string;
}
