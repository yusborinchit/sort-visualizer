export function $<T extends HTMLElement>(query: string): T | null {
	return document.getElementById(query) as T | null;
}
