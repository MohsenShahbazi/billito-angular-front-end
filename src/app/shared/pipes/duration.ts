import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../../../intelact/oneblog-web/src/environments/environment';
import * as moment from 'moment';

const intervalMap = {
	en: {
		expression: '{counter} {interval}',
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
			minute: 'min',
			second: 'sec'
		}
	}
};

@Pipe({
	name: 'duration',
	pure: true
})
export class DurationPipe implements PipeTransform {
	transform(value: any, lang: string = environment.language): any {
		if (value) {
			const map = intervalMap[lang] || intervalMap['en'];
			const now = moment(new Date());
			const end = moment().add(value, 'seconds');
			const duration = moment.duration(end.diff(now));
			const seconds = duration.asSeconds();

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
					} else {
						return map.expression
							.replace('{counter}', counter)
							.replace('{interval}', map.plural[i]);
					}
			}
		}

		return value;
	}
}
