import { array_sorter } from "../models/array-sorter-singleton";
import { $ } from "../utils/$";

export function handleGenerateArray({
	$array_container,
}: {
	$array_container: HTMLDivElement;
}): void {
	const $sort_button = $<HTMLButtonElement>("sort-array")!;
	$array_container.innerHTML = "";

	const array = array_sorter.generateNewArray().getArray();
	const bars = array.map((number) => {
		const bar = document.createElement("div");

		bar.style.setProperty("--height", `${number}px`);
		bar.style.setProperty("--color", `#3b82f6`);
		bar.className = "flex-1 transition-[height] bg-[var(--color)] h-[var(--height)]";

		return bar;
	});

	$sort_button.disabled = false;
	$array_container.append(...bars);
}
