export const templateSetting = storage.defineItem<string>('sync:template', {
    fallback: '{site_name}、「{title}」、{url}（閲覧日：{now_date}）',
})