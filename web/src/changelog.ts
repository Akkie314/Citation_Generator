export type ChangeType = "added" | "changed" | "fixed" | "removed";

export interface ChangeLogEntry {
    version: string
    date: string
    changes: {
        type: ChangeType;
        text: string
    }[]
}

export const changeLog: ChangeLogEntry[] = [
    {
        version: '1.1.0',
        date: '2026/11/3',
        changes: [{
            type: 'added',
            text: 'フィードバックへのリンクをポップアップの下側に配置しました。'
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
            text: '初回リリース'
        }]
    }
]