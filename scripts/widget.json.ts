import { join } from "path";
import pkg from "../package.json";
import fs from "fs";

const json = {
  name: pkg.name,
  author: pkg.author,
  url: pkg.repository.url,
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
//  copy files
["./preview.png", "./README.md", "./icon.png"].forEach((path) => {
  fs.copyFile(path, join("./public", path), (err) => {
    if (err) throw err;
  });
});
