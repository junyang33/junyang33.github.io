---
title: 如何获取华为云 Token 鉴权
date: 2026-10-29
category: 鸿蒙
cover: /assets/images/covers/huawei-logo-cover.jpg
hero: /assets/images/covers/huawei-hero.png
tags: [鸿蒙, 华为云, Token]
summary: 用一条 PowerShell 命令向 IAM 换取 Token，再把 Token 放进 App 的每个请求头里。附参数逐个解释。
---

华为云的接口默认不认人，只认 Token。

不管是查设备影子、看设备在不在线，还是给设备下发命令，请求头里都必须带上一张临时通行证，也就是 Token。它由 IAM 服务签发，有效期到了就作废，需要重新换一张。

## Token 在赛题里管什么

App 侧凡是涉及真实设备的操作，都要先有这个 Token：

| 操作 | 是否需要 Token |
|---|---|
| 查设备影子 | 需要 |
| 查设备在线状态 | 需要 |
| 下发喷雾命令 | 需要 |
| 修改阈值属性 | 需要 |

换句话说，**没有 Token，App 就是个只读的界面**，什么都控制不了。

## 一条命令换 Token

按 `Win + R`，输入 `PowerShell` 回车，把下面这条命令粘贴进去执行：

```powershell
$b = '{
  "auth": {
    "identity": {
      "methods": ["password"],
      "password": {
        "user": {
          "name": "你的账号",
          "password": "你的密码",
          "domain": { "name": "你的账号名" }
        }
      }
    }
  },
  "scope": { "project": { "name": "cn-north-4" } }
}'

(iwr https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens `
  -Method Post -Body $b -ContentType application/json).Headers['X-Subject-Token']
```

执行后终端会直接打印一串很长的字符，那就是 Token。

> 命令里的账号、密码、domain 名要换成自己的。这段 JSON 必须用**英文双引号**，Word 里复制出来的中文引号会让命令直接报错。

## 这段 JSON 是什么意思

逐层看，其实是「谁 / 用什么方式 / 要哪个区域的权限」：

| 字段 | 含义 | 实际填什么 |
|---|---|---|
| `auth` | 认证 | 固定写法 |
| `identity` | 身份 | 固定写法 |
| `methods` | 认证方式 | `password`，即账号密码 |
| `password.user.name` | 用户名 | 你的 IAM 用户名 |
| `password.user.password` | 密码 | 你的登录密码 |
| `domain.name` | 账号名 | 华为云账号（不是用户名） |
| `scope.project.name` | 生效区域 | `cn-north-4` 表示北京四 |

`domain` 和 `user.name` 容易填反：前者是**账号**，后者是**该账号下的 IAM 用户**。个人账号两者通常一样，企业账号下可能有多个子用户。

## 命令行那几个参数

| 写法 | 作用 |
|---|---|
| `iwr` | `Invoke-WebRequest` 的简写，发一个 HTTP 请求 |
| `-Method Post` | 用 POST 提交数据；换 Token **必须用 POST**，GET 不行 |
| `-ContentType application/json` | 声明发送的是 JSON，服务器据此解析 |
| `-Body $b` | 把上面那段 JSON 装进请求体发出去 |
| `$b` / `$r` | 变量，`b` 是 body，`r` 是 response |

最后那段 `.Headers['X-Subject-Token']` 是从响应头里把 Token 拎出来——它不在响应体里，而在 Header 里，这点很容易踩坑。

## 换到之后怎么用

拿到 Token 后，App 端每个请求都要带一个请求头：

```
X-Auth-Token: <刚才那串字符>
```

建议在 App 启动时统一换一次，存进内存，所有接口复用同一张 Token，而不是每次请求都去换。

## 两个必须注意的点

**1. Token 会过期**

华为云的 Token 默认 24 小时有效。过期后再发请求会返回 `401`，此时要重新执行命令换一张。App 里最好判断一次状态码，401 就自动重取。

**2. 别把密码提交进仓库**

Token 命令里带着账号密码，**千万不要把它硬编码进前端代码或提交到 Git**。正确做法是放在服务端，或者用临时环境变量注入，App 只拿服务端返回的 Token。

写这篇文章时我也把示例命令里的账号密码换成了占位符——原因同上。
