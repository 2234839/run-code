import { join } from "path";
import pkg from "../package.json";
import fs from "fs";

const json = {
  name: pkg.name,
  author: pkg.author,
  /** 思源挂件市场要求 url 不带 `.git` 后缀，这里在生成边界统一剥离，与 package.json 的 npm 习惯解耦 */
  url: pkg.repository.url.replace(/\.git$/, ""),
  version: pkg.version,
  minAppVersion: "2.8.8",
  displayName: {
    default: "",
    zh_CN: "代码运行挂件",
  },
  description: {
    default: "This is a run code widget",
    zh_CN: "这是一个运行代码的挂件",
  },
  readme: {
    default: "README.md",
  },
  funding: {
    openCollective: "",
    patreon: "",
    github: "",
    custom: ["https://afdian.net/a/llej0"],
  },
  keywords: ["code", "代码"],
};

fs.writeFile("./public/widget.json", JSON.stringify(json, null, 4), (err) => {
  if (err) {
    console.log("widget.json 创建失败", err);
  }
});
fs.writeFile("./widget.json", JSON.stringify(json, null, 4), (err) => {
  if (err) {
    console.log("widget.json 创建失败", err);
  }
});
//  copy files
["./preview.png", "./README.md", "./icon.png"].forEach((path) => {
  fs.copyFile(path, join("./public", path), (err) => {
    if (err) throw err;
  });
});
