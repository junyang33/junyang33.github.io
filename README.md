# 我的博客

玻璃拟态（Glassmorphism）风格的静态博客，**零依赖**，只要 Node.js 18+。

包含：文章系统、说说、照片墙、音乐播放器、评论开关、以及一个跑在本机的**管理后台**。

## 快速开始

双击即可，不用记命令：

| 文件 | 作用 |
| --- | --- |
| `preview.cmd` | 构建 + 启动预览（http://127.0.0.1:8080），自动开浏览器 |
| `admin.cmd` | 启动管理后台（http://127.0.0.1:8090），自动开浏览器 |

命令行等价写法：

```powershell
node build.js              # 构建到 public/
node serve.js --open       # 预览（端口被占用会自动 +1）
node admin.js 8090 --open  # 管理后台
```

## 目录结构

```
blog/
├── config.json          站点配置（含音乐、评论、统计开关）
├── build.js             构建脚本
├── serve.js             预览服务器
├── admin.js             管理后台服务（只监听本机）
├── admin/index.html     后台界面
├── preview.cmd          双击预览
├── admin.cmd            双击后台
├── assets/
│   ├── style.css        玻璃拟态样式（明暗两套变量）
│   ├── main.js          主题/进度条/目录/搜索/灯箱/扇子/音乐
│   └── images/          说说配图与相册照片
├── content/
│   ├── posts/           文章（Markdown）
│   ├── notes.json       说说数据
│   ├── albums.json      相册数据
│   ├── about.md         关于页
│   └── links.md         友链页
├── .github/workflows/   GitHub Pages 自动部署
└── public/              构建产物（自动生成）
```

## 写文章

`content/posts/` 下新建 `文件名.md`，文件名就是网址：

```markdown
---
title: 文章标题
date: 2026-10-25
updated: 2026-10-26
tags: [随笔, 技术]
summary: 一句话摘要
---

正文用 Markdown 写。
```

字段：`title` / `date` / `updated` / `tags` / `summary` / `draft`（写 `true` 不生成页面）。

## 说说

`content/notes.json` 是一个数组，每条：

```json
{
  "id": "n-1",
  "date": "2026-10-21",
  "color": "amber",
  "text": "第一段。\n\n第二段用两个换行分隔。",
  "images": ["/assets/images/notes/n1.svg"]
}
```

`color` 可选：`amber` / `rose` / `sky` / `mint` / `lilac` / `slate`，对应六种便利贴底色。悬停有弹簧动画，点图片开灯箱。

## 照片墙

`content/albums.json` 是相册数组：

```json
{
  "slug": "city-night",
  "title": "城市的夜晚",
  "description": "下班路上顺手拍的",
  "date": "2026-09-28",
  "cover": "/assets/images/city-night/1.svg",
  "photos": [
    { "src": "/assets/images/city-night/1.svg", "caption": "十点半的地铁口" }
  ]
}
```

图片放 `assets/images/<slug>/`，构建时整个 `assets/` 会复制到 `public/assets/`。

页面上的效果是**扇子**：默认叠成一摞，悬停（手机端点击）沿着弧线展开，点任意一张进灯箱，支持左右方向键切换。

## 音乐播放器

`config.json`：

```json
"music": {
  "enabled": true,
  "type": "playlist",
  "id": "3778678",
  "name": "写代码的时候听"
}
```

- `id` 换成你自己的网易云**歌单 ID**（打开歌单，地址栏 `playlist?id=` 后面那串数字）
- `type` 也可以写 `"song"`，此时 `id` 是单曲 ID
- 左下角玻璃胶囊，点开加载网易云官方播放器（懒加载，不点不请求）

浏览器会拦截自动播放，所以点开面板后仍需在播放器里点一次播放。

## 评论

默认关闭。要开启，去 [giscus.app](https://giscus.app) 用 GitHub 仓库生成配置，然后填进 `config.json`：

```json
"comments": {
  "enabled": true,
  "provider": "giscus",
  "giscus": {
    "repo": "你的账号/仓库",
    "repoId": "R_xxx",
    "category": "Announcements",
    "categoryId": "DIC_xxx",
    "mapping": "pathname"
  }
}
```

主题切换时评论框会自动跟着换深浅色。

## 管理后台

```powershell
node admin.js 8090
```

打开 http://127.0.0.1:8090 ，五个标签页：

| 标签 | 能做什么 |
| --- | --- |
| 概览 | 文章数、总字数、说说数、照片数、标签分布、近 12 个月产出柱状图 |
| 文章 | 左侧列表 + 右侧编辑器，新建 / 编辑 / 删除 / 预览 |
| 说说 | 增删改，选日期、配色、图片 URL |
| 相册 | 新建相册、上传图片（自动存到 `assets/images/<slug>/`）、改说明、排序 |
| 构建 | 一键 `node build.js`，显示耗时和输出 |

**安全说明**：后台只监听 `127.0.0.1`，外网访问不到，所以没有做登录。不要把它 `nginx` 反代到公网。

后台改的是本地文件，改完必须点「构建」生成 `public/`，再部署（或让 GitHub 自动部署）。

## 部署

`public/` 是纯静态文件，任何静态托管都能放。

### Cloudflare Pages（推荐）

仓库连上去，构建命令 `node build.js`，输出目录 `public`。之后每次 push 自动发布。

### GitHub Pages

仓库 Settings → Pages → Source 选 **GitHub Actions**，`.github/workflows/deploy.yml` 已经配好。

### 对象存储（阿里云 OSS / 腾讯云 COS）

上传 `public/`，开启静态网站托管，首页 `index.html`，错误页 `404.html`。大陆节点需要备案。

上线前把 `config.json` 的 `url` 改成真实域名并重新构建。

## 换主题

`assets/style.css` 顶部两个块就是全部配色：

- `:root` → 浅色
- `[data-theme="dark"]` → 深色

关键变量：`--glass`（玻璃底色）、`--blur`（模糊半径）、`--accent` / `--accent-2`（渐变主色）、`--blob-1/2/3`（背景光斑）。

想把玻璃感调强：把 `--glass` 的 alpha 降到 0.35，`--blur` 提到 30px。

## 常见问题

**双击 HTML 打开没样式？**
页面里用的是绝对路径（`/assets/...`），必须通过本地服务器访问，用 `preview.cmd`。

**改了文章没生效？**
先 `node build.js`，再 `Ctrl+F5`。

**`.cmd` 文件用记事本改过后打不开？**
必须保持 CRLF 换行，且不要加中文（cmd 编码容易乱）。

**图片太大加载慢？**
相册建议长边压到 1600px 以内、转 WebP；占位图是 SVG，几十 KB。

## 顶部轮播

首页顶部是一个轮播横幅，配置在 `config.json`：

```json
"carousel": {
  "enabled": true,
  "autoplay": 5200,
  "height": "clamp(320px, 46vh, 520px)",
  "slides": [
    { "image": "/assets/images/banner/1.jpg", "title": "我的博客", "subtitle": "写作是一种思考方式", "text": "记录技术、读书与生活" },
    { "image": "/assets/images/banner/2.jpg", "title": "留一块自己的地方", "subtitle": "没有数据库，没有追踪脚本" },
    { "image": "/assets/images/banner/3.jpg", "title": "慢一点也没关系", "subtitle": "一年几篇，写清楚就好" }
  ]
}
```

- 图片放 `assets/images/banner/`，用 16:9 的横图；横幅按图片原始比例显示，**不会拉伸或裁切**（屏幕太矮时会按高度反推宽度，避免占满整屏）
- 每张可配 `title` / `subtitle` / `text`，显示在图左下角
- 悬停或键盘聚焦时暂停自动播放；支持左右箭头、底部圆点、方向键
- `enabled: false` 就退回纯文字大标题的首页
- 系统开启「减少动态效果」时不自动轮播

文章页顶部用轮播第一张图做头图，标题压在图上，正文面板上浮咬住图片。

整页背景图仍然保留，把 `background.enabled` 设为 `true` 即可恢复（与轮播可共存，但视觉上会互相抢）。

## 友链

`/links.html` 是一面卡片墙，数据来自 `content/friends.json`：

```json
[
  { "name": "站点名", "url": "https://example.com", "desc": "一句话介绍", "color": "violet" }
]
```

- `color` 可选 `violet` / `amber` / `mint` / `sky` / `rose` / `slate`，不填默认紫色
- 有 `avatar` 字段就显示图片，没有就用站点名首字做彩色方块
- 页面上的「换个顺序」按钮会把卡片随机打乱（前端 Fisher-Yates，不刷新页面）
- 说明文字仍然写在 `content/links.md` 里

## 首页侧栏

首页宽屏时是三栏：左栏「公告 + 站点数据」，中间文章列表，右栏「音乐 + 分类 + 标签」。

| 挂件 | 数据来源 | 说明 |
| --- | --- | --- |
| 公告 | `config.json` 的 `notice` | 点 × 关闭，记在 localStorage |
| 站点数据 | 构建时统计 | 文章数 / 分类数 / 标签数 / 总字数 / 运行天数 / 近期活动，不需要后端 |
| 音乐 | `music` 配置 | 点「打开播放器」唤起左下角浮动播放器 |
| 分类 | 文章 front matter 的 `category` | 点进 `/categories.html` 对应锚点 |
| 标签 | 文章 `tags` | 取前 12 个，点进 `/tags.html` 对应锚点 |

写文章时加一行就能归入分类：

```yaml
category: 技术
```

响应式：≥1300 三栏；900–1300 两栏（左栏挂件移到列表下方）；<900 单栏，挂件横向排在列表后面。

## 阅读体验

| 功能 | 说明 |
| --- | --- |
| 阅读进度 | 顶部进度条 + 右上角百分比胶囊（滚动 260px 后出现） |
| 字号调节 | 右下角 `A` 按钮循环三档（17 → 18.4 → 19.7px），记在 localStorage |
| 代码行号 | 代码块左侧行号，复制时不带行号 |
| 图片放大 | 正文图片点击进灯箱，支持 Esc 关闭 |
| 快捷键 | `/` 搜索、`t` 切换主题、`f` 调字号 |
| 置顶 | 文章 front matter 写 `pinned: true`，首页列表排最前并显示「置顶」徽标 |

## 订阅

构建会生成两份订阅源，都带全文：

| 文件 | 格式 |
| --- | --- |
| `/feed.xml` | RSS 2.0 + `content:encoded` 全文 |
| `/feed.json` | JSON Feed 1.1，含 `content_html` |

页面头部会自动声明这两个 feed，阅读器能自动发现。

## 备份

`content/`、`assets/`、`config.json` 是全部资产，推到 Git 就够了。`public/` 丢了随时能重建。
