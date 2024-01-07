import { MAX_BAR_LENGTH, MIN_BAR_LENGTH } from "../config/const";
import { getRandomNumber } from "./get-random-number";

export function getRandomArray({ length }: { length: number }): number[] {
	return Array.from({ length }).map(() =>
		getRandomNumber({ min: MIN_BAR_LENGTH, max: MAX_BAR_LENGTH })
	);
}
