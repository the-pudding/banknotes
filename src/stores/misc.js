import { derived, readable, writable } from "svelte/store";

// store the index of the current section
export const currentSection = writable({ name: "", idx: 0 });
