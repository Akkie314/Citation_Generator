import isMajorMinorUpdate from "@/utils/version";
import { CONFIG } from "@/utils/config";

export default defineBackground(() => {
    browser.runtime.onInstalled.addListener(({ reason, previousVersion }) => {
        console.log(reason, previousVersion)
        if (reason !== 'update' || !previousVersion) return;
        
        const current = browser.runtime.getManifest().version;

        if (!isMajorMinorUpdate(previousVersion, current)) return;

        const url = new URL(CONFIG.NOTICE_URL);
        url.searchParams.set('from', previousVersion);
        url.searchParams.set('to', current);
        browser.tabs.create({ url: url.toString() });
    });
});