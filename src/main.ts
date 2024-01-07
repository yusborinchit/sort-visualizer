import { handleChangeArraySize } from "./handlers/handle-change-array-size";
import { handleGenerateArray } from "./handlers/handle-generate-array";
import { handleSortArray } from "./handlers/handle-sort-array";
import { $ } from "./utils/$";

const $control_panel = $<HTMLFormElement>("control-panel");
const $array_container = $<HTMLDivElement>("array-container");

if ($control_panel === null || $array_container === null)
	throw new Error("Some crucial elements doesn't exists");

handleGenerateArray({ $array_container });

$control_panel.addEventListener("click", async (event) => {
	const { target } = event;

	if (target === null) return event.stopPropagation();

	const $element = target as HTMLElement;
	const { tagName } = $element;

	if (tagName !== "BUTTON") return event.stopPropagation();

	const $button = $element as HTMLButtonElement;
	const { id } = $button;

	switch (id) {
		case "generate-array":
			handleGenerateArray({ $array_container });
			break;
		case "sort-array":
			await handleSortArray({ $array_container });
			break;
	}
});

$control_panel.addEventListener("change", (event) => {
	const { target } = event;

	if (target === null) return event.stopPropagation();

	const $element = target as HTMLElement;
	const { tagName } = $element;

	if (tagName !== "INPUT") return event.stopPropagation();

	const $input = $element as HTMLInputElement;
	const { id } = $input;

	switch (id) {
		case "array-length":
			handleChangeArraySize({ $array_container, $length_input: $input });
			break;
	}
});
