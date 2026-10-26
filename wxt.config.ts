import { defineConfig } from 'wxt';

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    name: 'Citation Generator',
    description: '閲覧中のページのタイトルやURLを取得し、指定した形式で出典情報を生成・コピーできる拡張機能です。',
    permissions: [
      'activeTab',
      'scripting',
      'storage'
    ]
  }
});
