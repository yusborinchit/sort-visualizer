import { MAX_ARRAY_LENGTH, MIN_ARRAY_LENGTH } from "../config/const";
import { array_sorter } from "../models/array-sorter-singleton";
import { handleGenerateArray } from "./handle-generate-array";

export function handleChangeArraySize({
	$array_container,
	$length_input,
}: {
	$array_container: HTMLDivElement;
	$length_input: HTMLInputElement;
}): void {
	const { valueAsNumber: length } = $length_input;

	if (length > MAX_ARRAY_LENGTH || length < MIN_ARRAY_LENGTH)
		throw new Error("Invalid length input value");
	array_sorter.setArrayLength(length);

	handleGenerateArray({ $array_container });
}
