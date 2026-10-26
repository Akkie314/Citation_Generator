import { parse } from "tldts";

export function siteNameFromHostName(hostname: string): string {
    const { domainWithoutSuffix } = parse(hostname);
    return domainWithoutSuffix || hostname.replace(/^www\./, '');
}