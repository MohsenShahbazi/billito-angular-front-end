import { PostType, SortType, Item } from '@intelact/bright';
import { TranslatePipe } from '../../../../../intelact/oneblog-web/src/app/shared/pipes/translate.pipe';

/**
 * Transform sort enums to Item
 * @returns : Item[]
 */
export function getBrowsSortItems(): Item[] {
	const translatePipe = new TranslatePipe();

	return [
		SortType.Newest,
		SortType.Popular,
		SortType.Relevant,
		SortType.Liked,
		SortType.Oldest
	].map(
		i =>
			new Item({
				title: translatePipe.transform(i),
				value: i
			})
	);
}

/**
 * Transform sort enums to Item
 * @returns : Item[]
 */
export function getQuestionSortItems(): Item[] {
	const translatePipe = new TranslatePipe();

	return [
		SortType.Newest,
		SortType.Popular,
		SortType.Liked,
		SortType.Oldest
	].map(
		i =>
			new Item({
				title: translatePipe.transform(i),
				value: i
			})
	);
}

/**
 * Transform content types to Item
 * @returns : Item[]
 */
export function getContentTypeItems(types: PostType[]): Item[] {
	if (!types || types.length === 0) {
		return;
	}

	const translatePipe = new TranslatePipe();

	return types
		.sort((a, b) => (a > b ? 1 : -1))
		.map(
			i =>
				new Item({
					title: translatePipe.transform(i),
					value: i
				})
		);
}
