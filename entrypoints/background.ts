import isMajorMinorUpdate from "@/utils/version";

export default defineBackground(() => {
    browser.runtime.onInstalled.addListener(({ reason, previousVersion }) => {
        console.log(reason, previousVersion)
        if (reason !== 'update' || !previousVersion) return;
        
        const current = browser.runtime.getManifest().version;

        if (!isMajorMinorUpdate(previousVersion, current)) return;

        const url = new URL(`https://citation-generator.akkie.me/`);
        url.searchParams.set('from', previousVersion);
        url.searchParams.set('to', current);
        browser.tabs.create({ url: url.toString() });
    });
});