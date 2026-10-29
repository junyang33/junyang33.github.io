---
title: 华为云参数查询指南
date: 2026-10-29
category: 鸿蒙
cover: /assets/images/covers/harmony-logo-cover.jpg
hero: /assets/images/covers/huawei-hero.png
tags: [鸿蒙, 华为云, IoTDA]
summary: 接设备前要凑齐的一串参数，分别藏在控制台的哪个角落——从 IAM 账号到设备 ID、service_id，逐项配截图说明。
---

接华为云 IoTDA 之前，代码里要先填一堆参数，而且它们散落在控制台的不同位置。

这份清单把每个参数的**含义**和**在哪找**对齐起来，照着抄一遍就能填完配置。

## 参数总览

| 变量名 | 是什么 |
|---|---|
| `IAM_USERNAME` | IAM 用户名 |
| `IAM_PASSWORD` | IAM 子账号密码 |
| `IAM_DOMAIN_NAME` | 主账号名称 |
| `IAM_PROJECT_NAME` | 区域标识 |
| `PROJECT_ID` | 项目 ID |
| `INSTANCE_ID` | 实例 ID |
| `APP_ID` | 应用 ID |
| `接入地址` | 应用接入地址 |
| `设备 ID` | 设备标识 |
| `service_id` | 服务 ID |
| `command_name` | 命令名称 |
| `参数名` | 命令里的属性字段 |

下面按「先账号、再实例、后设备」的顺序逐个说明。

## 一、账号与区域

**IAM 用户名**（`IAM_USERNAME`）

控制台右上角头像 → 统一身份认证 → 用户。

创建用户时必须勾选**编程访问**，否则拿不到 AK/SK；注意它不是华为云主账号。

**IAM 密码**（`IAM_PASSWORD`）

创建 IAM 用户时设置的密码。忘了就在用户列表里重置。

**主账号名称**（`IAM_DOMAIN_NAME`）

控制台右上角头像即可看到账号名。注意区分：`DOMAIN_NAME` 是**主账号**，`IAM_USERNAME` 是**该账号下的子用户**，两者不要填反。

**区域标识**（`IAM_PROJECT_NAME`）

控制台右上角头像 → 我的凭证 → 项目列表，例如 `cn-north-4`（北京四）。

![](/assets/images/param/fig02.png)

## 二、项目与实例

**项目 ID**（`PROJECT_ID`）

同样在「我的凭证」里，和区域列表挨着。

**实例 ID**（`INSTANCE_ID`）

设备接入 IoTDA 控制台 → IoTDA 实例 → 点开标准版实例卡片。

![](/assets/images/param/fig03.png)

## 三、资源空间与接入地址

**应用 ID**（`APP_ID`）

在左侧「资源空间」里查看。

![](/assets/images/param/fig04.png)

**应用接入地址**

实例详情里的「接入信息」页签，MQTT 连接的域名就写在这里。

![](/assets/images/param/fig05.png)

## 四、设备与服务

**设备 ID**

设备接入 IoTDA → IoTDA 实例 → 所有设备 → 设备列表，取设备名对应的那一项。

![](/assets/images/param/fig06.png)

**service_id**

设备接入 IoTDA → IoTDA 实例 → 实例名，服务 ID 在产品的服务列表里。

![](/assets/images/param/fig07.png)

**command_name 与参数名**

这两个不在控制台首页，而是跟着**产品模型**走：进产品的模型定义，找到对应的服务，服务下面的命令列表里就是命令名，命令里的字段就是参数名。

## 使用建议

填这些参数时建议按顺序一次性抄完：**账号 → 区域 → 项目 → 实例 → 应用 → 设备**，每填完一层就跑一次连通性测试。

顺序反了会很麻烦——比如先配设备，等发现区域填错，前面所有东西都要重来一遍。

另外，`INSTANCE_ID`、`APP_ID`、`DEVICE_ID` 三者名字很像，长度也都是二十几位，抄的时候最好直接复制粘贴，不要手打。
