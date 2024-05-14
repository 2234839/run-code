import vue from "@vitejs/plugin-vue";
import { UserConfig } from "vite";
const config: UserConfig = {
  plugins: [
    vue(),
  ],
  server: {
    /** 调试 siyuan_cache_api_lib 时最好关掉，因为每次编译会导致 hmr 多次，我不太喜欢 */
    // hmr: false,
    fs: {
      strict: false,
    },
  },
  base: "./",
  build: {
    sourcemap: true,
    minify:false
  },
};
export default ({ command, mode }) => {
  if (command === "serve") {
    config.base = "/widgets/run-code/";
    return config;
  } else {
    return config;
  }
};
