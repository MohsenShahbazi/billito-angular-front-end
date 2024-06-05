import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from './icon.module';

// third-party libs
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

// pipes
import { ContainsPipe } from '../../../../../billito-angular-front-end/src/app/core/pipes/contains';
import { DateAgoPipe } from '../../../../../billito-angular-front-end/src/app/core/pipes/date-ago.pipe';
import { DurationPipe } from '../../../../../billito-angular-front-end/src/app/core/pipes/duration';
import { FillPipe } from '../../../../../billito-angular-front-end/src/app/core/pipes/fill';
import { MarkerPipe } from '../../../../../billito-angular-front-end/src/app/core/pipes/marker';
import { Nl2BrPipe } from '../../../../../billito-angular-front-end/src/app/core/pipes/nl2br';
import { SafePipe } from '../../../../../billito-angular-front-end/src/app/core/pipes/safe';
import { ShortNumberPipe } from '../../../../../billito-angular-front-end/src/app/core/pipes/short-number.pipe';
import { TranslatePipe } from '../../../../../billito-angular-front-end/src/app/core/pipes/translate.pipe';
import { TruncatePipe } from '../../../../../billito-angular-front-end/src/app/core/pipes/truncate';
import { StripHtmlPipe } from '../../../../../billito-angular-front-end/src/app/core/pipes/striphtml.pipe';

// components
import { BrandComponent } from './components/brand/brand.component';
import { NotificationComponent } from './components/notification/notification.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { AuthorCardComponent } from './components/author/card.component';
import { CardPostComponent } from './components/card/card-post.component';
import { CardQuestionComponent } from './components/card/card-question.component';
import { CardProfileComponent } from './components/card/card-profile.component';
import { DropdownComponent } from './components/controls/dropdown/dropdown.component';
import { SearchComponent } from './components/controls/search/search.component';
import { CheckControlComponent } from './components/controls/check/check.component';
import { NavComponent } from './components/nav/nav.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ShareContentComponent } from './components/share/share.component';
import { MediaEmbedComponent } from './components/media/embed.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';

// layouts
import { AuthLayoutComponent } from '../../../../../billito-angular-front-end/src/app/core/layouts/auth/auth-layout.component';
import { MainLayoutComponent } from '../../../../../billito-angular-front-end/src/app/core/layouts/main/main-layout.component';

@NgModule({
	declarations: [
		// pipes
		ContainsPipe,
		DateAgoPipe,
		DurationPipe,
		FillPipe,
		MarkerPipe,
		Nl2BrPipe,
		SafePipe,
		ShortNumberPipe,
		TranslatePipe,
		TruncatePipe,
		StripHtmlPipe,
		// components
		BrandComponent,
		PreloaderComponent,
		NotificationComponent,
		EmptyStateComponent,
		AuthorCardComponent,
		CardPostComponent,
		CardQuestionComponent,
		CardProfileComponent,
		SearchComponent,
		CheckControlComponent,
		DropdownComponent,
		NavComponent,
		PaginationComponent,
		ShareContentComponent,
		MediaEmbedComponent,
		FeedbackComponent,
		ReadMoreComponent,
		// layouts
		AuthLayoutComponent,
		MainLayoutComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		// third-parties
		IconModule,
		NgbModule,
		NgScrollbarModule,
		ShareButtonsModule.withConfig({
			debug: true,
			prop: {
				twitter: {
					icon: ['fab', 'x-twitter'],
					color: '#1E3050'
				}
			},
			autoSetMeta: false
		}),
		ShareIconsModule
	],
	exports: [
		// modules
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		// third-paries
		IconModule,
		NgbModule,
		NgScrollbarModule,
		ShareButtonsModule,
		ShareIconsModule,
		// pipes
		ContainsPipe,
		DateAgoPipe,
		DurationPipe,
		FillPipe,
		MarkerPipe,
		Nl2BrPipe,
		SafePipe,
		ShortNumberPipe,
		TranslatePipe,
		TruncatePipe,
		StripHtmlPipe,
		// components
		BrandComponent,
		PreloaderComponent,
		NotificationComponent,
		EmptyStateComponent,
		AuthorCardComponent,
		CardPostComponent,
		CardQuestionComponent,
		CardProfileComponent,
		SearchComponent,
		CheckControlComponent,
		DropdownComponent,
		NavComponent,
		PaginationComponent,
		ShareContentComponent,
		MediaEmbedComponent,
		FeedbackComponent,
		ReadMoreComponent,
		// layouts
		AuthLayoutComponent,
		MainLayoutComponent
	]
})
export class SharedModule {}
