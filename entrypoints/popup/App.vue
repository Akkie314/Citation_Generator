<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { PageInfo } from '@/utils/types';
import { getPageInfo } from '@/utils/get-page-info';
import { formatCitation } from '@/utils/format-citation';
import { templateSetting } from '@/utils/settings';
import DataBox from '@/components/DataBox.vue';

const pageInfo = ref<PageInfo>();
const template = ref<string>("");
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

const onTemplateChange = async (value: string) => {
  template.value = value;
  await templateSetting.setValue(value);
  render();
};
</script>

<template>
  <h1>出典情報ジェネレータ</h1>
  <DataBox label="出典情報" :value="formatedText" />
  <hr />

  <h3>取得情報</h3>
  <DataBox label="タイトル" :value="pageInfo?.title" />
  <DataBox label="URL" :value="pageInfo?.url" />
  <DataBox label="閲覧日" :value="pageInfo?.accessedAt" />
  <DataBox label="サイト名" :value="pageInfo?.siteName" />
  <hr />

  <h3>オプション</h3>
  <DataBox label="形式" editable :value="template" default-value="{site_name}、「{title}」、{url}（閲覧日：{now_date}）" @update:value="onTemplateChange"/>
  <p>プレースホルダー: {site_name}, {title}, {url}, {now_date}</p>
</template>

<style scoped></style>
