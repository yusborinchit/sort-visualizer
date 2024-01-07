import { MAX_BAR_LENGTH, MIN_BAR_LENGTH } from "../config/const";
import { type ArrayBar } from "../types";

export function getRandomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomArray(length: number): ArrayBar[] {
	return Array.from({ length }).map(() => ({
		type: "none",
		value: getRandomNumber(MIN_BAR_LENGTH, MAX_BAR_LENGTH),
	}));
}
