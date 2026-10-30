export const DEFAULT_TEMPLATE = '{site_name}、「{title}」、{url}（閲覧日：{now_date}）';

export const templateSetting = storage.defineItem<string>('sync:template', {
    fallback: DEFAULT_TEMPLATE,
})
