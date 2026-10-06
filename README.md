# 韩国论坛体编辑器

手机优先的虚构论坛截图编辑器。支持中韩双语、评论与楼中楼、翻译覆盖层、图片上传、PNG 长图及手动比例截图。

网站：https://nanaxu74-sudo.github.io/korean-forum-editor/

## 本地运行与检查

纯静态 HTML/CSS/JavaScript，无 npm 依赖、无需编译。发布目录为 `dist`。

```sh
python3 -m http.server 4173 --directory dist
# 浏览器打开 http://localhost:4173
node --check dist/app.js
node --check dist/storage.js
```

所有运行资源使用相对路径，支持仓库子路径；html2canvas 1.4.1 随项目打包。字体使用系统中韩文字体和 emoji，不调用外部字体/CDN/API。

## 部署与更新

GitHub 仓库 `nanaxu74-sudo/korean-forum-editor`，正式分支 `main`。
Settings → Pages → Source 选择 GitHub Actions。
修改 `dist` 内的文件，检查后提交并推送到 `main`，官方 Pages 工作流自动检查并上传 `dist`，部署到 `github-pages` environment。也可在 Actions → Deploy GitHub Pages → Run workflow 手动发布。使用工作流身份，不需要个人访问令牌。

## 回退

对出错的提交运行 `git revert <提交SHA>`，再 `git push origin main`，自动重新发布。不要强制推送。回退代码不清空浏览器草稿。

## 草稿与隐私

草稿及上传图片仅存当前浏览器的 IndexedDB；沿用 `k-forum-editor-v1` 数据键，并读取同域旧 localStorage 数据迁移，旧备份不会自动删除。存储失败时会提示，不能保证无痕模式或空间不足时保存成功。
本地草稿不跨设备同步，清理浏览器数据会丢失。请定期导出 `.kforum.json` 备份。旧 Sites 域名与 GitHub Pages 存储相互隔离，迁移时先在旧站备份，再在新站导入。

上传图片、草稿文件不发送到服务器，不应提交到公开仓库。默认内容为虚构示例。

## 许可

本项目尚未选择开源许可证。打包的第三方 html2canvas 保留其原始 MIT 版权声明；其许可不等于本项目整体许可。
