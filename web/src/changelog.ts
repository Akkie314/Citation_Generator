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
        version: '1.0.1',
        date: '2025/12/4',
        changes: [{
            type: 'fixed',
            text: '`data`のスペルミスを`date`に修正しました。'
        }, {
            type: 'added',
            text: '入力欄をホバーした際に全文を表示する機能を追加しました。'
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