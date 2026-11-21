# njy24 的个人网站

网站：https://njy24.github.io/

采用黑色通栏导航、白底和青绿色标题的个人网站，布局参考 https://xiazr20.top/ 。包括个人简介、公开项目与动态、文章、搜索和联系方式。使用 Astro 静态生成、Markdown 内容集合和 GitHub Pages。

## 内容管理方案

GitHub Pages 不运行服务器端程序。本站采用成熟的 Git 内容管理方式：GitHub 提供登录、编辑、版本历史和回滚，Astro 在构建时校验文章字段并生成页面，GitHub Actions 负责自动发布。不需要数据库、额外服务器或前端令牌。

要在网页上写文章，进入 [文章目录](https://github.com/njy24/njy24.github.io/tree/main/src/content/posts)，点击 Add file / Create new file，创建 `文章英文名.md`，编辑后提交。这里的 GitHub 登录就是内容管理的权限边界。

目前没有已发布文章，可以直接开始创建自己的文章。原 Hexo 博客不保留在新版页面中，历史版本仍保存在 Git 历史。

```yaml
---
title: "我的第一篇文章"
description: "一两句话介绍文章内容。"
date: 2026-11-21
tags: [学习, 随笔]
draft: false
---

这里开始写 Markdown 正文。
```

`draft: true` 的文章不会生成页面，也不会进入搜索、RSS、标签或归档。未来日期的文章在构建时隐藏，到日期后需要重新运行构建才会发布。支持可选的 `updated` 日期和 `permalink: /自定义路径/`。

图片放在 `public/images/`，正文用 `![图片说明](/images/文件名.png)` 引用。

## 本地使用

使用 Node.js 22.22.1 或更高版本，建议 npm 10.8.2 或更高版本。

```sh
npm ci
npm run dev
```

打开 http://localhost:4321 。创建草稿：

```sh
npm run new -- my-first-post "我的第一篇文章"
```

编辑 `src/site.ts` 修改昵称、`introduction` 个人简介和 GitHub 链接。个人简介目前留空。全站样式在 `src/styles/global.css`，文章在 `src/content/posts/`。

## 公开项目和动态

`scripts/sync-github.mjs` 在构建时获取 njy24 的公开仓库与近期提交，结果保存在 `src/data/github.json`。访问者无需请求 GitHub API，接口不可用时继续使用已保存的数据。数据在每次构建时更新，不是实时刷新；可以重新运行 GitHub Actions 获取最新动态。只展示公开数据，不读取私有仓库。GitHub Actions 令牌只用于构建，不会进入页面。

## 检查和发布

```sh
npm run check
npm run build
npm run preview
```

构建输出为 `dist/`。`.github/workflows/deploy.yml` 在推送 main 时自动检查、构建并部署 Pages；PR 只检查构建，不部署。推荐在仓库 Settings → Pages → Source 选择 GitHub Actions。

为兼容仓库已有的 main 根目录发布方式，首次更新也提供构建后的静态文件；以 `src/` 内源码为准，不要手动修改生成的 HTML。旧静态文件可在 Git 历史中恢复。若保持分支发布方式，本地构建后同步 `dist/` 到仓库根目录再推送，或改用上述 GitHub Actions 发布方式。

端到端检查使用 Playwright，先运行预览服务，再执行 `npx playwright test`。测试覆盖内部链接、资源、搜索、主题记忆、RSS 和手机宽度。已有 Chromium 可通过 `CHROMIUM_PATH` 指定；否则先执行 `npx playwright install chromium`。

## 可扩展的后台

如果以后需要可视化编辑，可以接入 [Decap CMS](https://decapcms.org/docs/github-backend/) 的 GitHub 后端。它直接提交 Markdown，但在线 GitHub 登录需要独立 OAuth 认证服务。当前没有安装虚假的登录入口，也没有把私钥或令牌放进网页。

架构参考：[Astro 内容集合](https://docs.astro.build/en/guides/content-collections/)、[Astro 部署到 GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)、[GitHub Pages 文档](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)。
