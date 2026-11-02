import type { ChangeLogEntry } from "../changelog";

export function filterChangeLog(
    entries: ChangeLogEntry[],
    from?: string | null,
    to?: string | null
): ChangeLogEntry[] {
    const fromIndex = from ? entries.findIndex((e) => e.version === from) : entries.length - 1;
    const toIndex = to ? entries.findIndex((e) => e.version === to) : 0
    
    if (fromIndex === -1 || toIndex === -1 ) return []

    return entries.slice(toIndex, fromIndex);
}