function getCitationData() {
    (async () => {
        // アクティブで現在のウィンドウにあるタブを取得
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // タブが存在する場合
        if (tab) {
            // scripting API を使用して、指定したタブで関数を実行
            const injectionResults = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    let template = {
                        success: false,
                        title: "",
                        url: "",
                        now_data: "",
                        site_name: ""
                    };

                    // タイトルを設定
                    template.title = document.title;
                    // URLを設定
                    template.url = window.location.href;
                    // 日付を設定
                    template.now_data = new Date().toISOString().split('T')[0];

                    // サイト名を設定
                    const metaSiteName = document.querySelector("meta[property='og:site_name']");
                    if (metaSiteName && metaSiteName.content) {
                        template.site_name = metaSiteName.content;
                    } else {
                        // メタタグがない場合、ホスト名からサイト名を推測
                        const hostname = window.location.hostname;
                        const splitHost = hostname.split('.');
                        let siteName = splitHost[splitHost.length - 2];

                        // siteNameがACなど属性型ドメインの場合にsiteNameを調整
                        const attributeDomains = ['ac', 'co', 'go', 'or', 'ne', 'ad', 'ed', 'gr', 'lg', 'geo'];
                        if (attributeDomains.includes(siteName) && splitHost.length >= 3) {
                            siteName = splitHost[splitHost.length - 3];
                        }

                        template.site_name = siteName;
                    }

                    template.success = true;
                    return template;
                }
            });

            // 実行結果を受け取る
            if (injectionResults && injectionResults.length > 0) {
                const citationData = injectionResults[0].result;
                // ポップアップの要素にデータを表示
                document.getElementById('title').value = citationData.title;
                document.getElementById('url').value = citationData.url;
                document.getElementById('citation_date').value = citationData.now_data;
                document.getElementById('site_name').value = citationData.site_name;

                // 引用形式を表示
                const citationFormat = `${citationData.site_name}、「${citationData.title}」、${citationData.url}（閲覧日：${citationData.now_data}）`;
                document.getElementById('citation_format').value = citationFormat;
            }
        }
    })();
}

document.addEventListener('DOMContentLoaded', () => {
    getCitationData();

    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const input = event.currentTarget.previousElementSibling;
            if (input && input.tagName === 'INPUT') {
                input.select();
                navigator.clipboard.writeText(input.value)
                    .then(() => {
                        const originalText = button.textContent;
                        button.textContent = 'Copied!';
                        setTimeout(() => {
                            button.textContent = originalText;
                        }, 1500);
                    })
                    .catch(err => {
                        console.error('Failed to copy text: ', err);
                    });
            }
        });
    });
});
