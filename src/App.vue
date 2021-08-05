<template>
  <runCodeVue
    v-model:source="config.source"
    v-model:inside="config.inside"
    v-model:title="config.title"
    v-model:preamble="config.preamble"
    v-model:version="config.version"
  />
</template>

<script lang="ts" setup>
import runCodeVue from "./components/run-code.vue";
import { reactive, onBeforeMount, watchEffect } from "vue";

import { api, util, config as apiConfig } from "siyuan_api_cache_lib";

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
  } else {
    console.error("获取当前挂件快id失败");
  }
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
});
</script>
