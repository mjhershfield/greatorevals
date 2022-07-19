import { writable, Writable } from "svelte/store";

export const question_filter: Writable<number[]> = writable([]);
export const term_filter: Writable<number[]> = writable([]);