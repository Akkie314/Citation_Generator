<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import type { PageInfo } from '@/utils/types';
import { getPageInfo } from '@/utils/get-page-info';
import { formatCitation } from '@/utils/format-citation';
import { templateSetting, DEFAULT_TEMPLATE } from '@/utils/settings';
import DataBox from '@/components/DataBox.vue';
import CopyButton from '@/components/CopyButton.vue';
import ResetButton from '@/components/ResetButton.vue';

const pageInfo = ref<PageInfo>({accessedAt: ""});
const template = ref<string>(DEFAULT_TEMPLATE);
const formatedText = ref<string>("");


onMounted(async () => {
  template.value = await templateSetting.getValue();
  pageInfo.value = await getPageInfo();
  render();
})

const render = () => {
  if (pageInfo.value) {
    formatedText.value = formatCitation(template.value, pageInfo.value);
  }
};

watch(template, async (value) => {
  await templateSetting.setValue(value);
  render();
});
</script>

<template>
  <h1>出典情報ジェネレータ</h1>
  <DataBox label="出典情報" :model-value="formatedText">
    <CopyButton :text="formatedText"/>
  </DataBox>
  <hr />

  <h3>取得情報</h3>
  <DataBox label="タイトル" :model-value="pageInfo.title">
    <CopyButton :text="pageInfo.title"/>
  </DataBox>
  <DataBox label="URL" :model-value="pageInfo.url">
    <CopyButton :text="pageInfo.url"/>
  </DataBox>
  <DataBox label="閲覧日" :model-value="pageInfo.accessedAt">
    <CopyButton :text="pageInfo.accessedAt"/>
  </DataBox>
  <DataBox label="サイト名" :model-value="pageInfo.siteName">
    <CopyButton :text="pageInfo.siteName"/>
  </DataBox>
  <hr />

  <h3>オプション</h3>
  <DataBox label="形式" editable v-model="template">
    <ResetButton v-model="template" :default-value="DEFAULT_TEMPLATE"/>
  </DataBox>
  <p>プレースホルダー: {site_name}, {title}, {url}, {now_date}</p>
</template>

<style scoped></style>
