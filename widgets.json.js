const pkg = require("./package.json");

const json = {
    "name": pkg.name,
    "author": pkg.author,
    "url": pkg.repository.url,
    "version": pkg.version
};

const fs = require("fs");

fs.writeFile("./dist/widgets.json", JSON.stringify(json, null, 4), (err) => {
    if (err) {
        console.log("widgets.json 创建失败", err);
    }
});