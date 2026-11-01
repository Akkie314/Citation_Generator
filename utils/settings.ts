export const DEFAULT_TEMPLATE = '{site_name}、「{title}」、{url}（閲覧日：{now_date}）';

export const templateSetting = storage.defineItem<string>('sync:template', {
    fallback: DEFAULT_TEMPLATE,
    init: async () => {
        const oldTemplate = await storage.getItem<string>('local:citationFormat');
        return oldTemplate || DEFAULT_TEMPLATE
    },
})
