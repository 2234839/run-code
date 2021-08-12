<template>
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
import { reactive, onBeforeMount, watchEffect } from "vue";

import { api, util, config as apiConfig } from "siyuan_api_cache_lib";
import { useParamsObj } from "./util/use-url-params-obj";
import LZString from "lz-string";

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
    api
      .getBlockAttr(id, "custom-config")
      .then((r) => {
        if (r) {
          const source = util.htmlDecode(r.value);
          if (source) {
            Object.assign(config, JSON.parse(source));
          } else {
            console.error("decode 失败, code:", r.value);
          }
        }
        // 没有找到配置项，啥也不做
      })
      .catch((e) => {
        console.error("查询config失败", e);
      });
    // 保存 config 到本地
    if (util.getCurrentEnv() === util.getCurrentEnv.env.siYuan) {
      watchEffect(() => {
        api
          .setBlockAttrs({
            id: util.currentNodeId()!,
            attrs: { "custom-config": JSON.stringify(config) },
          })
          .then((r) => {
            // console.log("保存成功", r);
          });
      });
    }
  } else {
    console.error("获取当前挂件快id失败，不再尝试调用思源 api 保存代码");
  }
});
</script>
