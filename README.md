# 我的博客

一个**零依赖**的静态博客：Markdown 进，静态 HTML 出。

不需要数据库、不需要服务器、不需要 Hugo 或 Hexo，只要 Node.js 18+。构建脚本 `build.js` 约 700 行，只用了 Node 内置模块，升级 Node 也不会坏。

## 快速开始

```powershell
node build.js      # 生成 public/
node serve.js      # 本地预览 http://127.0.0.1:8080
```

或者用 npm 脚本（等价）：

```powershell
npm run build
npm run serve
```

改了文章重新跑 `node build.js`，刷新浏览器即可。`serve.js` 不需要重启。

## 目录结构

```
blog/
├── config.json           站点配置
├── build.js              构建脚本
├── serve.js              本地预览服务器
├── assets/
│   ├── style.css         样式（明暗两套配色，全部变量在顶部）
│   └── main.js           主题、进度条、目录高亮、搜索
├── content/
│   ├── posts/            文章，一篇一个 .md
│   ├── about.md          关于页
│   └── links.md          友链页
├── .github/workflows/
│   └── deploy.yml        GitHub Pages 自动部署
└── public/               构建产物（自动生成，不要手改）
```

## 写文章

在 `content/posts/` 下新建 `文件名.md`，文件名就是网址（用英文和连字符）：

```markdown
---
title: 文章标题
date: 2026-10-25
updated: 2026-10-26
tags: [随笔, 技术]
summary: 一句话摘要，显示在首页列表和搜索结果里。
---

正文用 Markdown 写。
```

字段说明：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `title` | 否 | 不填则用文件名 |
| `date` | 建议 | `YYYY-MM-DD`，用于排序、归档、RSS |
| `updated` | 否 | 更新日期，填了会显示「更新于」 |
| `tags` | 否 | `[标签一, 标签二]`，用于标签页和相关文章 |
| `summary` | 否 | 不填自动截取正文前 110 字 |
| `draft` | 否 | 写 `true` 则跳过，不生成页面 |

支持 `draft` 字段写草稿，发布前不会出现在任何页面里。

## 配置

`config.json` 主要字段：

| 字段 | 说明 |
| --- | --- |
| `title` | 站点名，显示在页头和 `<title>` |
| `tagline` | 副标题，显示在站名下方 |
| `description` | 站点简介，用于 SEO 和首页 |
| `author` | 作者名，用于版权和结构化数据 |
| `url` | **站点地址，部署前必须改** |
| `startYear` | 页脚版权起始年份 |
| `postsPerPage` | 首页每页文章数，默认 8 |
| `social` | 页脚社交链接数组 `[{label, url}]` |
| `comments` | 评论开关，默认关闭，见下文 |
| `analytics` | 统计开关，默认关闭 |

### 开启评论（Giscus）

评论基于 GitHub Discussions，免费、无广告。步骤：

1. 在 GitHub 上给仓库开启 Discussions，安装 [giscus app](https://github.com/apps/giscus)
2. 打开 [giscus.app](https://giscus.app)，填入仓库名，拿到 `repoId` 和 `categoryId`
3. 填进 `config.json` 的 `comments.giscus`，把 `enabled` 改成 `true`

### 开启统计（Umami）

```json
"analytics": {
  "enabled": true,
  "provider": "umami",
  "umami": { "src": "https://你的统计域名/script.js", "websiteId": "xxxx" }
}
```

只加载这一个脚本，不引入其他追踪代码。

## 生成的内容

| 文件 | 说明 |
| --- | --- |
| `index.html` + `page/N/` | 首页与分页 |
| `posts/*.html` | 文章页，含目录、相关文章、上下篇 |
| `archive.html` | 按年份归档 |
| `tags.html` | 标签云与分类列表 |
| `search.html` + `search.json` | 站内搜索（纯前端，含摘要高亮） |
| `about.html` / `links.html` | 独立页面 |
| `404.html` | 错误页 |
| `feed.xml` | RSS 2.0 |
| `sitemap.xml` / `robots.txt` | 搜索引擎 |
| `_headers` | Cloudflare Pages 缓存与安全头 |

每篇文章都带 `canonical`、Open Graph、Twitter Card 和 JSON-LD 结构化数据。

## 部署

`public/` 是纯静态文件，任何静态托管都能放。

### Cloudflare Pages（推荐）

连接 GitHub 仓库，构建命令 `node build.js`，输出目录 `public`。之后每次 push 自动发布。

### GitHub Pages

仓库 Settings → Pages → Source 选 **GitHub Actions**。项目里已有 `.github/workflows/deploy.yml`，push 到 `main` 就自动部署。

### 对象存储（阿里云 OSS / 腾讯云 COS）

上传 `public/`，开启静态网站托管，首页 `index.html`，错误页 `404.html`。

> 服务器在中国大陆境内需要 ICP 备案。用 Cloudflare Pages 或 GitHub Pages 不用备案。

### 上线检查

- [ ] `config.json` 的 `url` 已改成真实域名，并重新构建
- [ ] `/feed.xml`、`/sitemap.xml`、`/robots.txt` 都能访问
- [ ] 随便输个错误路径，看到 404 页面
- [ ] 手机端排版正常

## 自定义

**换配色**：打开 `assets/style.css`，改顶部两个块即可——`:root` 是浅色，`[data-theme="dark"]` 是深色。改 `--accent` 换主色，改 `--font-title` 换标题字体。

**改布局**：页面骨架在 `build.js` 的 `layout()` 里，文章页在 `buildPost()`。

**加页面**：在 `content/` 下加 `xxx.md`，然后在 `build.js` 的 `main()` 里加一行 `writeFile('xxx.html', buildMarkdownPage('xxx.md', '标题', 'nav-key', '/xxx.html'))`，并在 `NAV` 数组里加一项。

## 常见问题

**每次构建会清空 `public/` 吗？**
会。所以图片不要直接放 `public/`，放在别处（比如 `content/images/`），构建前拷进 `public/assets/`，或者用图床。

**文章里的图片怎么引用？**
放 `public/assets/` 下，用 `/assets/xxx.png` 绝对路径。注意这是构建产物，原图要另存。

**构建后中文乱码？**
文件都以 UTF-8 保存，页面声明了 `<meta charset="utf-8">`。如果编辑器把 .md 存成了 GBK，重新用 UTF-8 保存。

**想换成 Hugo / Hexo？**
`content/posts/*.md` 的 front matter 格式通用，拷过去即可。

## 备份

`content/` 和 `config.json` 是全部资产。推到 Git 就够了；`public/` 丢了没关系，一条命令就能重建。
