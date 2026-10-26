<script lang="ts" setup>
import DataBox from '@/components/DataBox.vue';
</script>

<template>
  <DataBox label="テスト" :value="'これはテスト'" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #54bc4ae0);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
