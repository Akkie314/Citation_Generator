const DEFAULT_CITATION_FORMAT = '{site_name}、「{title}」、{url}（閲覧日：{now_date}）';

// 形式を書き込む
function saveCitationFormat(citationFormat) {
    chrome.storage.local.set({ citationFormat }, () => {
        console.log('Citation format saved:', citationFormat);
    });
}
// 形式を読み込む
function loadCitationFormat(callback) {
    return new Promise((resolve) => {
        chrome.storage.local.get(['citationFormat'], (result) => {
            const format = result.citationFormat;
            if (format) {
                resolve(format);
            } else {
                resolve(DEFAULT_CITATION_FORMAT);
            }
        });
    });
}

// 形式に従いて引用データを作成
async function applyCitationFormat(title, url, now_date, site_name) {
    let citationFormat = await loadCitationFormat();
    citationFormat = citationFormat.replace('{site_name}', site_name);
    citationFormat = citationFormat.replace('{title}', title);
    citationFormat = citationFormat.replace('{url}', url);
    citationFormat = citationFormat.replace('{now_date}', now_date);

    return citationFormat;
}

async function getCitationData() {
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
                        now_date: "",
                        site_name: ""
                    };

                    // タイトルを設定
                    template.title = document.title;
                    // URLを設定
                    template.url = window.location.href;
                    // 日付を設定
                    template.now_date = new Date().toISOString().split('T')[0];

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
                document.getElementById('citation_date').value = citationData.now_date;
                document.getElementById('site_name').value = citationData.site_name;

                // 引用形式を表示
                const citationFormat = await applyCitationFormat(
                    citationData.title,
                    citationData.url,
                    citationData.now_date,
                    citationData.site_name
                );
                document.getElementById('citation_text').value = citationFormat;
            }
        }
    })();
}

document.addEventListener('DOMContentLoaded', async () => {
    let citationFormat = await loadCitationFormat();
    document.getElementById('citation_format').value = citationFormat;
    document.getElementById('citation_format').addEventListener('input', (event) => {
        const newFormat = event.target.value;
        saveCitationFormat(newFormat);
        getCitationData();
    });

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

    const resetButton = document.querySelector('.reset-btn');
    resetButton.addEventListener('click', () => {
        document.getElementById('citation_format').value = DEFAULT_CITATION_FORMAT;
        saveCitationFormat(DEFAULT_CITATION_FORMAT);
        getCitationData();
    });
});
