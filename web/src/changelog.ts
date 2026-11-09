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
        version: '1.1.0',
        date: '2026/11/9',
        changes: [{
            type: 'added',
            title: 'プライバシーポリシーを追加いたしました。',
            description: 
`本アップデートから、プライバシーポリシーを追加いたしました。内容は以下の通りです。
https://github.com/Akkie314/Citation_Generator/blob/dev/PRIVACY.md

1. 通常のご利用時に個人情報を収集・追跡することはありません。
2. 任意でのフィードバック送信時に取得するメールアドレス等の情報を適切に管理するため、プライバシーポリシーを設置・明記しました。
`
        }, {
            type: 'added',
            title: '拡張機能をアップデート時に、変更内容を表示するようにしました。'
        }, {
            type: 'added',
            title: 'フィードバックへのリンクをポップアップの下側に配置しました。',
        }, {
            type: 'changed',
            title: 'コピーボタンとの誤操作を防ぐため、リセットボタンのデザインを変更しました。'
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