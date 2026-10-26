import type { PageInfo } from "./types";

const PLACEHOLDER = /\{(title|url|site_name|now_date)}/g;
const KEY_MAP =  {
    title: 'title',
    url: 'url',
    site_name: 'siteName',
    now_date: 'accessedAt',
} as const;

export function formatCitation(template: string, info: PageInfo): string {
    return template.replace(
        PLACEHOLDER, 
        (_, name:keyof typeof KEY_MAP) => info[KEY_MAP[name]] ?? '取得できませんでした');
}