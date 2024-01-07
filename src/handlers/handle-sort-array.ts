import { array_sorter } from "../models/array-sorter-singleton";
import { $ } from "../utils/$";
import { delay } from "../utils/delay";

export async function handleSortArray({
	$array_container,
}: {
	$array_container: HTMLDivElement;
}): Promise<void> {
	const steps = array_sorter.bubbleSort();

	const $generate_button = $<HTMLButtonElement>("generate-array")!;
	const $sort_button = $<HTMLButtonElement>("sort-array")!;
	const $length_input = $<HTMLInputElement>("array-length")!;

	$generate_button.disabled = true;
	$sort_button.disabled = true;
	$length_input.disabled = true;

	for (const step of steps) {
		const { index, value } = step;

		const $bar = $array_container.children[index] as HTMLDivElement;
		$bar.style.setProperty("--height", `${value}px`);

		$bar.style.setProperty("--color", "#f43f5e");
		await delay(10);
		$bar.style.setProperty("--color", "#3b82f6");
	}

	$generate_button.disabled = false;
	$sort_button.disabled = true;
	$length_input.disabled = false;
}
