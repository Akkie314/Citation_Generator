export type ChangeType = "added" | "changed" | "fixed" | "removed";
export const changeTypeLabel: Record<ChangeType, string> = {
    added: '追加',
    changed: '変更',
    fixed: '修正',
    removed: '削除',
};

export interface ChangeEntry {
    version: string
    date: string
    changes: {
        type: ChangeType;
        title: string;
        description?: string;
    }[]
}

export const changeLog: ChangeEntry[] = [
    {
        version: '9.9.9',
        date: '2999/13/99',
        changes: [{
            type: 'added',
            title: 'テスト用の追加(descriptionなし)',
        },{
            type: 'added',
            title: 'テスト用の追加(description1行)',
            description: '古本屋の奥で見つけた奇妙なノートには、明日起こる小さな奇跡ばかりが書き込まれていた。',
        },{
            type: 'added',
            title: 'テスト用の追加(description複数行)',
            description: '古本屋の奥で見つけた奇妙なノートには、明日起こる小さな奇跡ばかりが書き込まれていた。半信半疑でページをめくると、そこには今日の私の朝食のメニューが正確に記録されていた。驚きのあまり本を落としそうになった瞬間、店の奥から古びた鈴の音が静かに響いた。店主の老人は深みのある声で、「その本は次の持ち主を選ぶのだよ」と微笑みかけた。私は胸の高鳴りを抑えきれないまま、そのノートを鞄に押し込んで店を後にした。',
        }]
    },
    {
        version: '1.1.0',
        date: '2026/11/3',
        changes: [{
            type: 'added',
            title: 'フィードバックへのリンクをポップアップの下側に配置しました。',
        }]
    },
    {
        version: '1.0.1',
        date: '2025/12/4',
        changes: [{
            type: 'fixed',
            title: '`data`のスペルミスを`date`に修正しました。'
        }, {
            type: 'added',
            title: '入力欄をホバーした際に全文を表示する機能を追加しました。'
        }]
    },
    {
        version: '1.0.0',
        date: '2025/11/13',
        changes: [{
            type: 'added',
            title: '初回リリース'
        }]
    }
]