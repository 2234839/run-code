import pkg from "./package.json";
import fs from "fs";

const json =
{
    "name": pkg.name,
    "author": pkg.author,
    "url": pkg.repository.url,
    "version": pkg.version,
    "minAppVersion": "2.8.8",
    "displayName": {
      "default": "",
      "zh_CN": "代码运行挂件"
    },
    "description": {
      "default": "This is a run code widget",
      "zh_CN": "这是一个运行代码的挂件"
    },
    "readme": {
      "default": "README.md",
    },
    "funding": {
      "openCollective": "",
      "patreon": "",
      "github": "https://github.com/2234839",
      "custom": [
        "https://afdian.net/a/llej0"
      ]
    },
    "keywords": [
      "code", "代码"
    ]
  }


fs.writeFile("./dist/widget.json", JSON.stringify(json, null, 4), (err) => {
    if (err) {
        console.log("widget.json 创建失败", err);
    }
});
fs.copyFile('./preview.png', './dist/preview.png', (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
});