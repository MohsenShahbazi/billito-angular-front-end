import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IShareData, IFeedbackData, User, Item } from '@intelact/bright';
import { ShareContentComponent } from '../../../../../intelact/oneblog-web/src/app/shared/components/share/share.component';
import { FeedbackComponent } from '../../../../../intelact/oneblog-web/src/app/shared/components/feedback/feedback.component';
import { AskQuestionComponent } from '../../../../../intelact/oneblog-web/src/app/modules/question/ask-question.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
	constructor(
		private readonly modal$: NgbModal,
		private readonly meta$: Meta,
		private readonly title$: Title
	) {}

	share(data: Partial<IShareData>): NgbModalRef {
		// add page meta tags (social proiders)

		this.meta$.updateTag({ property: 'og:url', content: data.url || window.location.href });

		if (data.title) {
			this.meta$.updateTag({ property: 'og:title', content: data.title });
			this.meta$.updateTag({ name: 'twitter:title', content: data.title });
			this.meta$.updateTag({ name: 'twitter:text:title', content: data.title });
		}
		if (data.description) {
			this.meta$.updateTag({ property: 'og:description', content: data.description });
			this.meta$.updateTag({ name: 'twitter:description', content: data.description });
		}
		if (data.image) {
			this.meta$.updateTag({ property: 'og:image', content: data.image });
			this.meta$.updateTag({ name: 'twitter:image', content: data.image });
		}

		const modal = this.modal$.open(ShareContentComponent, {
			backdrop: 'static',
			scrollable: true,
			centered: true,
			size: 'lg',
			modalDialogClass: 'modal-share-content'
		});

		const comRef = modal.componentInstance as ShareContentComponent;
		comRef.title = data.title;
		comRef.description = data.description;
		comRef.image = data.image;
		comRef.url = data.url;

		// update meta to default
		comRef.onClose.subscribe(() => {
			this.meta$.updateTag({ property: 'og:url', content: window.location.href });
			this.meta$.updateTag({ property: 'og:description', content: '' });
			this.meta$.updateTag({ name: 'twitter:description', content: '' });
		});

		return modal;
	}

	feedback(data: IFeedbackData): NgbModalRef {
		const modal = this.modal$.open(FeedbackComponent, {
			backdrop: 'static',
			scrollable: true,
			centered: true,
			size: 'lg',
			modalDialogClass: 'modal-share-content'
		});

		const comRef = modal.componentInstance as FeedbackComponent;
		comRef.title = data.title;
		comRef.closable = data.closable;
		comRef.feedback = data.feedback;

		return modal;
	}

	askQuestion(user: User, categories: Item<string>[]): NgbModalRef {
		const modalRef = this.modal$.open(AskQuestionComponent, {
			backdrop: 'static',
			scrollable: true,
			fullscreen: true,
			modalDialogClass: 'modal-question-ask'
		});

		const comRef = modalRef.componentInstance as AskQuestionComponent;
		comRef.user = user;
		comRef.categories = categories;

		return;
	}
}
