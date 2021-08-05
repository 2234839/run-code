import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import { UserConfig } from "vite";
const config: UserConfig = {
  plugins: [
    vue(),
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  server: {
    hmr: false,
    fs: {
      strict: false,
    },
  },
  base: "./",
  build: {
    sourcemap: true,
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
