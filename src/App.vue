<template>
  <div
    v-if="showSetInfo$"
    style="position: absolute; background-color: aliceblue; padding: 4px 6px"
  >
    {{
      setConfig$.pending
        ? "保存中"
        : setConfig$.fulfilled
        ? "保存成功"
        : setConfig$.rejected
        ? "保存失败"
        : ""
    }}
  </div>
  <RunCodeVue
    v-model:source="config.source"
    v-model:inside="config.inside"
    v-model:title="config.title"
    v-model:preamble="config.preamble"
    v-model:version="config.version"
  />
</template>

<script lang="ts" setup>
import RunCodeVue from "./components/run-code.vue";
import { reactive, onBeforeMount, watchEffect, ref, computed } from "vue";

import { api, util, config as apiConfig } from "siyuan_api_cache_lib";
import { useParamsObj } from "./util/use-url-params-obj";
import LZString from "lz-string";
import { usePromiseComputed } from "./util/vue.composition.api";
import { date$ } from "./util/date.now";

// 非开发模式下不用设定 server，使用相对路径来指向 思源server
if (import.meta.env.DEV) {
  apiConfig.server = "http://127.0.0.1:6806";
}

apiConfig.apiCache = true;
const config = reactive({
  source: "",
  inside: "inside" as const,
  title: "",
  preamble: "",
  version: "16.6.0",
});
const setConfig$ = usePromiseComputed({
  deps: () => [],
  getter: () =>
    api.setBlockAttrs({
      id: util.currentNodeId()!,
      attrs: { "custom-config": JSON.stringify(config) },
    }),
});

const showSetInfo$_t = ref(Date.now());
watchEffect(() => {
  setConfig$.value;
  showSetInfo$_t.value = Date.now() + 3000;
});
const showSetInfo$ = computed(() => {
  if (setConfig$.value.pending) {
    return true;
  } else if (setConfig$.value.fulfilled || setConfig$.value.rejected) {
    return showSetInfo$_t.value > date$.value.getTime();
  } else {
    return false;
  }
});

onBeforeMount(async () => {
  const id = util.currentNodeId();
  // 从 url 获取 config，以及将 config 保存至 url
  const [AppOptions, href] = useParamsObj(undefined, { code: "{}" });
  watchEffect(() => history.replaceState("", "", href.value));

  Object.assign(
    config,
    JSON.parse(LZString.decompressFromBase64(AppOptions.code) || "{}")
  );
  watchEffect(() => {
    AppOptions.code = LZString.compressToBase64(JSON.stringify(config));
  });

  // 从本地获取 config 的值
  if (id) {
    // 此 await 用于避免下面的 `保存 config 到本地` 先于查询执行
    await api.getBlockAttr(id, "custom-config").then((r) => {
      if (r) {
        const source = util.htmlDecode(r.value);
        if (source) {
          Object.assign(config, JSON.parse(source));
        } else {
          console.error("decode 失败, code:", r.value);
        }
      }
      // 没有找到配置项，啥也不做
    });
    // 保存 config 到本地
    if (util.getCurrentEnv() === util.getCurrentEnv.env.siYuan) {
      watchEffect(() => {
        config;
        setConfig$.value.reLoad();
      });
    }
  } else {
    console.error("获取当前挂件快id失败，不再尝试调用思源 api 保存代码");
  }
});
</script>
<style global>
body::-webkit-scrollbar {
  display: none;
}
</style>
