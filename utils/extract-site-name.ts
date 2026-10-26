export function extractSiteName(): string | undefined {
    const meta = (key: string): string | undefined => document.querySelector<HTMLElement>(`meta[property="${key}"], meta[name="${key}"]`)?.content?.trim() || undefined;

    const fromJsonLd = (): string | undefined => {
        for (const elem of document.querySelectorAll('script[type="application/ld+json"]')) {
            try {
                const json = JSON.parse(elem.textContent ?? '');
                const items = (Array.isArray(json) ? json: [json]).flatMap((j) => j?.['@graph'] ?? [j]);
                const site = items.find(
                    (i) => i?.['@type'] === 'WebSite' && typeof i.name === 'string' && i.name.trim(),
                );
                if (site) return site.name.trim();
            } catch {
                // JSON-LDが破損している
            }
        }

        return undefined;
    }

    return meta('og:site_name') || fromJsonLd() || meta('application-name') || undefined;
}