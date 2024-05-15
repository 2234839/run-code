# run-code

代码 高亮/运行/repl 挂件

#思源挂件块# 在思源中可以进行编辑和运行的代码块挂件，并且支持在 [OceanPress](https://shenzilong.cn/%E6%83%B3%E6%B3%95/%E9%A1%B9%E7%9B%AE/OceanPress_js) 下使用

可以访问 [2234839.github.io/run-code](https://2234839.github.io/run-code/?code=TjRJZ3pnOWdyZ1RneGdVeEFMaEFBd0JZSURiWWdBZ0hjSVpzQVRORUFHaEFFc0E3TVdzcFZCcGw2a0FGMXUrMVlndUFCeGdJQWhnRnNBUmdKUkNhQU53UXdtRWV2SUNNQU5nQjBBRHdNZ0F2a0E9PQ%3D%3D) 来查看在线效果

![效果图](./preview.png)

## 快速开始

已在思源集市上架，可直接在集市中安装

手动安装流程如下

- 在这里 [./releases](./releases) 下载挂件块的代码解压后放到 SiYuan 的 widgets 目录下
- 在思源内创建一个 iframe 资源地址填 `/widgets/run-code/index.html` 即可

## 开发者相关

本项目为标准npm包，通过命令`pnpm build`构建为思源挂件包

[./scripts/widget.json.ts](./scripts/widget.json.ts) 为生成 widget.json 的脚本
[./scripts/link.ts](./scripts/link.ts) 用于生成软链接到思源工作目录