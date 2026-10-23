---
title: 把它发布到公网：三种部署方案
date: 2026-10-15
category: 建站
cover: /assets/images/shanghai/2.jpg
tags: [部署, 静态博客, 教程]
summary: 从本地 public 目录到能访问的域名，比较 Cloudflare Pages、GitHub Pages 和对象存储三条路，以及域名和备案要注意什么。
---

本地跑起来只是开始，真正要解决的问题是：**别人怎么访问。**

前提是先有这三样东西：

1. 一个域名（约 50–100 元/年）
2. 一个 Git 账号（推荐 GitHub）——这台机器上还没装 Git，需要先装
3. 本站的 `public/` 目录

## 先确认本地没问题

```powershell
node build.js
node serve.js
```

打开 `http://127.0.0.1:8080`，首页、文章、归档、搜索都正常，再往下走。

## 方案一：Cloudflare Pages（推荐）

免费、自带 HTTPS、全球 CDN，国内访问也还行。

1. 把整个项目推到 GitHub 仓库（`public/` 建议 gitignore 掉，让它自动构建）
2. 打开 Cloudflare 控制台 → Workers & Pages → 创建 → Pages → 连接 Git
3. 构建设置填：
   - 框架预设：`None`
   - 构建命令：`node build.js`
   - 输出目录：`public`
4. 绑定自定义域名，DNS 加一条 CNAME

好处是每次 `git push` 自动重新构建发布。`public/_headers` 会被 Cloudflare 读取，静态资源自动带上长缓存。

## 方案二：GitHub Pages

不用买服务器，但国内访问速度一般。

1. 仓库 Settings → Pages → Source 选 **GitHub Actions**
2. 项目里已经有 `.github/workflows/deploy.yml`，push 之后会自动构建并部署
3. 自定义域名在 Pages 设置里填，同时在 DNS 加 CNAME

要注意 GitHub Pages 是纯静态托管，没有服务端重写规则，404 页面靠根目录的 `404.html`，本站已经生成了。

## 方案三：对象存储（国内访问最快）

阿里云 OSS、腾讯云 COS 都可以开"静态网站托管"：

1. 上传 `public/` 全部文件
2. 开启静态网站托管，默认首页设为 `index.html`，默认 404 设为 `404.html`
3. 绑定自定义域名并开启 HTTPS

**注意**：服务器和存储在中国大陆境内，域名必须先做 **ICP 备案**，否则会被阻断。备案通常 1–3 周，需要域名实名认证、提交主体资料。

用 Cloudflare Pages 或 GitHub Pages 这类境外托管，就不用备案。

## 域名和 DNS

不管走哪条路，最后一步都一样：

1. 域名商处把 NS 指到托管平台，或者加一条 CNAME 记录
2. 平台侧添加自定义域名，等证书签发（通常几分钟）
3. 把 `config.json` 里的 `url` 改成 `https://你的域名`，重新 `node build.js`

第 3 步常被忘掉，忘了的话 RSS 和 sitemap 里全是 `example.com`，搜索引擎会收错。

## 上线后检查这几项

- [ ] 首页、文章页、归档、标签、搜索都能打开
- [ ] `https://域名/feed.xml` 是合法 XML
- [ ] `https://域名/sitemap.xml` 里没有 `example.com`
- [ ] `https://域名/robots.txt` 里有 Sitemap 地址
- [ ] 手机打开排版正常
- [ ] 随便输一个错误路径，看到的是 404 页面而不是空白

## 备份

最后一句提醒：`content/` 和 `config.json` 是你的全部资产。推到 Git 上，或者在本地定期打包。生成出来的 `public/` 丢了没关系，一条命令就能重建；手写的文章丢了就真没了。
