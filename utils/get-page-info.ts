import type { PageInfo } from "./types";
import { extractSiteName } from "./extract-site-name";
import { siteNameFromHostName } from "./site-name-from-hostname";

function hostnameToSiteName(url: string | undefined): string | undefined {
    if (!url) return undefined;

    try {
        return siteNameFromHostName(new URL(url).hostname);
    } catch {
        return undefined;
    }
}

function formatDateInJst(date: Date): string {
    return new Intl.DateTimeFormat("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}

export async function getPageInfo(now: Date = new Date()): Promise<PageInfo> {
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
    const accessedAt = formatDateInJst(now);

    if (!tab) return { accessedAt };

    const title = tab.title;
    const url = tab.url;

    let siteName: string | undefined;
    if (tab.id !== undefined) {
        try {
            const [injection] = await browser.scripting.executeScript({
                target: { tabId: tab.id },
                func: extractSiteName,
            });
            siteName = injection?.result ?? undefined;
        } catch {
            // chrome://などの取得不可なページ
        }
    }
    siteName ??= hostnameToSiteName(url);

    return {
        title: title,
        url : url,
        siteName: siteName,
        accessedAt: accessedAt,
    }
}
