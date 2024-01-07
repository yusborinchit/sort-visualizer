export function swap({ array, a, b }: { array: number[]; a: number; b: number }): void {
	const aux = array[a];
	array[a] = array[b];
	array[b] = aux;
}
