<template>
  <pre class="embed" :data-gutter="inside"><div ref="element"></div> </pre>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect, computed, toRefs } from "vue";
import type { PropType } from "vue";
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
const element = ref<HTMLElement | null>(null);
const nodeVersion = computed({
  get() {
    //   run-kit 的 setNodeVersion 似乎只接受这种形式的输入
    return version!
      .value!.trim()
      .split(".")
      .map((v, index) => {
        if (index === 0) {
          return v;
        } else {
          return "x";
        }
      })
      .join(".");
  },
  set(v: string) {
    version!.value = v;
  },
});
onMounted(async () => {
  const cell = window.RunKit.createNotebook({
    element: element.value! as HTMLElement,
    preamble: preamble!.value,
    title: title!.value,
    gutterStyle: inside.value,
    source: source!.value,
    nodeVersion: nodeVersion.value,
  });

  cell.onLoad = async (book) => {
    cell.evaluate();
  };

  // 各种属性的绑定
  cell.onSave = async () => {
    cell.getSource().then((v) => (source!.value = v));
    cell.getNodeVersion().then((v) => (nodeVersion.value = v));
  };
  watchEffect(() => cell.setSource(source!.value!));
  watchEffect(() => cell.setTitle(title!.value!));
  watchEffect(() => cell.setPreamble(preamble!.value!));
  watchEffect(() => cell.setNodeVersion(nodeVersion.value));
});
</script>
