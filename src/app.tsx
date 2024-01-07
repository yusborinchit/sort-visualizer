import { useEffect, useState, type CSSProperties, type ChangeEvent } from "react";
import { MAX_ARRAY_LENGTH, MAX_DELAY, MIN_ARRAY_LENGTH, MIN_DELAY } from "./config/const";
import { SortStep, type ArrayBar } from "./types";
import { sleep } from "./utils/delay";
import { getRandomArray } from "./utils/random";
import { swap } from "./utils/swap";

export default function App() {
	const [length, setLength] = useState(MAX_ARRAY_LENGTH);
	const [array, setArray] = useState<ArrayBar[]>(() => getRandomArray(length));

	const [delay, setDelay] = useState<number>(MIN_DELAY);

	const [is_sorting, setIsSorting] = useState<boolean>(false);
	const [is_sorted, setIsSorted] = useState<boolean>(false);

	function bubbleSort(array: number[]): SortStep[] {
		const steps: SortStep[] = [];

		for (let i = 0; i < array.length; i++) {
			for (let j = 0; j < array.length - i; j++) {
				if (array[j] > array[j + 1]) {
					steps.push({ index: j, value: array[j + 1] });
					steps.push({ index: j + 1, value: array[j] });
					swap(array, j, j + 1);
				}
			}
		}

		return steps;
	}

	useEffect(() => {
		const new_array = getRandomArray(length);
		setArray(new_array);
		setIsSorted(false);
	}, [length]);

	function handleGenerateArray(): void {
		const new_array = getRandomArray(length);
		setArray(new_array);
		setIsSorted(false);
	}

	async function handleSortArray(): Promise<void> {
		const steps = bubbleSort(array.map(({ value }) => value));

		setIsSorting(true);
		setIsSorted(false);

		for (const step of steps) {
			const { index, value } = step;

			setArray((prev) => {
				const draft = [...prev];
				draft[index].value = value;
				draft[index].type = "swap";
				return draft;
			});

			await sleep(delay);

			setArray((prev) => {
				const draft = [...prev];
				draft[index].value = value;
				draft[index].type = "none";
				return draft;
			});
		}

		setIsSorting(false);
		setIsSorted(true);
	}

	function handleLengthChange(event: ChangeEvent<HTMLInputElement>): void {
		const { currentTarget } = event;
		const { valueAsNumber } = currentTarget;
		setLength(valueAsNumber);
	}

	function handleDelayChange(event: ChangeEvent<HTMLInputElement>): void {
		const { currentTarget } = event;
		const { valueAsNumber } = currentTarget;
		setDelay(valueAsNumber);
	}

	return (
		<main className="relative h-screen overflow-hidden">
			<header className="absolute flex gap-2 text-sm bottom-4 left-4 right-4">
				<button
					disabled={is_sorting}
					onClick={handleGenerateArray}
					className="px-4 py-2 text-white rounded-sm bg-gradient-to-t from-blue-600 to-blue-500 disabled:from-zinc-400 disabled:to-zinc-300"
				>
					Generate Array
				</button>
				<button
					disabled={is_sorting || is_sorted}
					onClick={async () => await handleSortArray()}
					className="px-4 py-2 text-white rounded-sm bg-gradient-to-t from-blue-600 to-blue-500 disabled:from-zinc-400 disabled:to-zinc-300"
				>
					Sort Array
				</button>
				<div className="flex flex-col flex-1 gap-1">
					<label htmlFor="length">Array Length: {length}</label>
					<input
						id="length"
						type="range"
						disabled={is_sorting}
						onChange={handleLengthChange}
						defaultValue={length}
						min={MIN_ARRAY_LENGTH}
						max={MAX_ARRAY_LENGTH}
						className="w-full accent-blue-500"
					/>
				</div>
				<div className="flex flex-col flex-1 gap-1">
					<label htmlFor="delay">Delay: {delay}</label>
					<input
						id="delay"
						type="range"
						disabled={is_sorting}
						onChange={handleDelayChange}
						defaultValue={delay}
						min={MIN_DELAY}
						max={MAX_DELAY}
						className="w-full accent-blue-500"
					/>
				</div>
			</header>
			<section className="flex gap-[2px]">
				{array.map(({ type, value }, index) => (
					<div
						key={index}
						style={{ "--height": `${value}px` } as CSSProperties}
						data-bg={type}
						className="flex-1 h-[var(--height)] data-[bg=none]:bg-zinc-300 data-[bg=swap]:bg-red-500"
					/>
				))}
			</section>
		</main>
	);
}
