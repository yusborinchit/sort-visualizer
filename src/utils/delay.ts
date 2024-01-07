export async function sleep(time: number): Promise<void> {
	return new Promise((r) => setTimeout(r, time));
}
