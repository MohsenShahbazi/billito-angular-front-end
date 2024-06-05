import {
	Component,
	ElementRef,
	Renderer2,
	ViewChild,
	Input,
	Output,
	EventEmitter,
	OnInit,
	inject
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Feedback, FeedbackItem, FeedbackOption } from '@intelact/bright';

@Component({
	selector: 'feedback',
	templateUrl: 'feedback.component.html'
})
export class FeedbackComponent implements OnInit {
	/**
	 * Submit emitter
	 */
	@Output() onSelect: EventEmitter<FeedbackOption>;

	/**
	 * Complete emitter
	 */
	@Output() onComplete: EventEmitter<number>;

	/**
	 * Feedback
	 */
	@Input() feedback: Feedback;

	/**
	 * Feedback question step number
	 */
	@Input() step: number = 0;

	/**
	 * Feedback title
	 */
	@Input() title: string;

	/**
	 * Feedback title
	 */
	@Input() closable: boolean = true;

	/**
	 * Total steps
	 */
	totalSteps: number;

	/**
	 * Selected question
	 */
	question: FeedbackItem;

	/**
	 * Indicate completed state
	 */
	completed: boolean;

	/**
	 * When user has no selection
	 * Show no selections alert
	 */
	noSelections: boolean;

	// init time to calculate seen duration
	initTime: Date = new Date();

	@ViewChild('target', { read: ElementRef })
	target: ElementRef;

	activeModal = inject(NgbActiveModal);

	constructor(private renderer: Renderer2) {
		this.onSelect = new EventEmitter<FeedbackOption>();
		this.onComplete = new EventEmitter<number>();
	}

	ngOnInit(): void {
		if (this.feedback?.items?.length) {
			this.question = this.feedback.items[this.step];
			this.totalSteps = this.feedback?.items?.length;
		}
	}

	prev() {
		const index = this.step - 1;
		if (index < 0) return;
		this.step = index;
		this.question = this.feedback.items[index];
		this.toggleAnimation(false);
	}

	next() {
		const index = this.step + 1;
		if (index > this.totalSteps) return;
		this.step = index;
		this.question = this.feedback.items[index];
		this.toggleAnimation(true);
	}

	select(option: FeedbackOption) {
		option.isSelected = !option.isSelected;

		if (!this.question.multiple) {
			this.question.options = this.question.options.map(i => {
				if (i.id !== option.id) {
					i.isSelected = false;
				}
				return i;
			});
		}

		this.onSelect.emit(option);
	}

	complete() {
		let hasSelections: boolean;

		for (const item of this.feedback.items) {
			const selections = item.options.filter(i => i.isSelected).length;
			if (selections > 0) {
				hasSelections = true;
				break;
			}
		}

		if (!hasSelections) {
			this.noSelections = true;
			return;
		}

		this.completed = true;
		this.noSelections = false;
		const duration = new Date().getTime() - this.initTime.getTime();
		this.onComplete.emit(duration);
	}

	private toggleAnimation(next: boolean) {
		this.renderer.removeClass(this.target.nativeElement, 'animate__bounceInRight');
		this.renderer.removeClass(this.target.nativeElement, 'animate__bounceOutLeft');
		setTimeout(() => {
			const animate = next ? 'animate__bounceInRight' : 'animate__bounceOutLeft';
			this.renderer.addClass(this.target.nativeElement, animate);
		}, 100);
	}
}
