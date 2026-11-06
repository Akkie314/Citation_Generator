import type { ChangeEntry } from "../changelog";

export function filterChangeLog(
    entries: ChangeEntry[],
    from?: string | null,
    to?: string | null
): ChangeEntry[] {
    const fromIndex = from ? entries.findIndex((e) => e.version === from) : entries.length - 1;
    const toIndex = to ? entries.findIndex((e) => e.version === to) : 0
    
    if (fromIndex === -1 || toIndex === -1 ) return []

    return entries.slice(toIndex, fromIndex);
}