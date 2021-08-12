<template>
  <pre><code ref="code" class="language-javascript">{{props.source}}</code></pre>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, ref, watchEffect } from "vue";
import Prism from "prismjs";
const props = defineProps({
  source: {
    type: String,
    default: "",
  },
});
const code = ref<HTMLElement | null>(null);
onMounted(() => {
  watchEffect(() => {
    nextTick(() => {
      Prism.highlightElement(code.value! as HTMLElement);
    });
    // 依赖
    return props.source;
  });
});
</script>
<!-- 这个style 加上 scoped 后高亮就失效了 -->
<style src="prismjs/themes/prism.css"></style>
