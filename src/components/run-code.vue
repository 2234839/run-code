<template>
  <PrismJs v-if="loading" :source="source"></PrismJs>
  <RunKit
    v-model:source="source"
    v-model:inside="inside"
    v-model:title="title"
    v-model:preamble="preamble"
    v-model:version="version"
    @update:loading="(b) => (loading = b)"
  ></RunKit>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { ref } from "vue";
import PrismJs from "./code-editor/prismjs.vue";
import RunKit from "./code-editor/RunKit.vue";
import { propsToRefs } from "./props-to-refs";
const props = defineProps({
  inside: {
    type: String as PropType<EmbedOptions["gutterStyle"]>,
    default: "inside",
    required: true,
  },
  source: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  preamble: {
    type: String,
    default: "",
  },
  version: {
    type: String,
    default: "16.6.0",
  },
});
const emit = defineEmits([
  "update:inside",
  "update:source",
  "update:title",
  "update:preamble",
  "update:version",
]);
const { inside, source, title, preamble, version } = propsToRefs(props, emit);

/** 在其他编辑组件加载完毕后隐藏默认组件 */
const loading = ref(true);
</script>
