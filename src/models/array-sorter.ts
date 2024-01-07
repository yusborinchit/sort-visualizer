import { MAX_ARRAY_LENGTH } from "../config/const";
import { SortStep } from "../types";
import { getRandomArray } from "../utils/get-random-array";
import { swap } from "../utils/swap";

export class ArraySorter {
	private method: string;
	private array_length: number;
	private array: number[];

	public constructor() {
		this.method = "bubble";
		this.array_length = MAX_ARRAY_LENGTH;
		this.array = getRandomArray({ length: this.array_length });
	}

	// #region getters
	public getMethod(): string {
		return this.method;
	}

	public getArrayLength(): number {
		return this.array_length;
	}

	public getArray(): number[] {
		return this.array;
	}
	// #endregion

	// #region setters
	public setMethod(method: string): void {
		this.method = method;
	}

	public setArrayLength(array_length: number): void {
		this.array_length = array_length;
		this.generateNewArray();
	}
	// #endregion

	public generateNewArray(): ArraySorter {
		this.array = getRandomArray({ length: this.array_length });
		return this;
	}

	public bubbleSort(): SortStep[] {
		const steps: SortStep[] = [];

		for (let i = 0; i < this.array.length; i++) {
			for (let j = 0; j < this.array.length - i; j++) {
				const current_index = j;
				const next_index = j + 1;

				const current_value = this.array[current_index];
				const next_value = this.array[next_index];

				if (current_value > next_value) {
					steps.push({ index: current_index, value: next_value });
					steps.push({ index: next_index, value: current_value });
					swap({ array: this.array, a: current_index, b: next_index });
				}
			}
		}

		return steps;
	}
}
