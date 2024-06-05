import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../../intelact/oneblog-web/src/environments/environment';
import * as moment from 'moment';

const intervalMap = {
	en: {
		now: 'Now',
		expression: '{counter} {interval} ago',
		singular: {
			year: 'year',
			month: 'month',
			week: 'week',
			day: 'day',
			hour: 'hour',
			minute: 'minute',
			second: 'second'
		},
		plural: {
			year: 'years',
			month: 'months',
			week: 'weeks',
			day: 'days',
			hour: 'hours',
			minute: 'minutes',
			second: 'seconds'
		}
	},
	sq: {
		now: 'Tani',
		expression: 'para {counter} {interval}',
		singular: {
			year: 'viti',
			month: 'muaji',
			week: 'jave',
			day: 'dite',
			hour: 'ore',
			minute: 'minute',
			second: 'sekonde'
		},
		plural: {
			year: 'vitesh',
			month: 'muajsh',
			week: 'javësh',
			day: 'ditësh',
			hour: 'orësh',
			minute: 'minutash',
			second: 'sekondash'
		}
	}
};

@Pipe({
	name: 'dateAgo',
	pure: true
})
export class DateAgoPipe implements PipeTransform {
	transform(value: any, lang: string = environment.language): any {
		if (value) {
			const map = intervalMap[lang] || intervalMap['en'];
			const now = moment(new Date());
			const end = moment(value);
			const duration = moment.duration(now.diff(end));
			const seconds = duration.asSeconds();

			if (seconds < 29) {
				// less than 30 seconds ago will show as 'Just now'
				return map.now;
			}

			const intervals = {
				year: 31536000,
				month: 2592000,
				week: 604800,
				day: 86400,
				hour: 3600,
				minute: 60,
				second: 1
			};

			let counter: number;

			for (const i in intervals) {
				counter = Math.floor(seconds / intervals[i]);

				if (counter > 0)
					if (counter === 1) {
						return map.expression
							.replace('{counter}', counter)
							.replace('{interval}', map.singular[i]);
						//return counter + ' ' + i + ' ago'; // singular (1 day ago)
					} else {
						return map.expression
							.replace('{counter}', counter)
							.replace('{interval}', map.plural[i]);
						// return counter + ' ' + i + 's ago'; // plural (2 days ago)
					}
			}
		}

		return value;
	}
}
