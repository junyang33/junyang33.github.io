---
title: 固件编译与烧录
date: 2026-10-27
category: 鸿蒙南向工程手册
cover: /assets/images/covers/harmony-logo-cover.jpg
hero: /assets/images/covers/huawei-hero.png
tags: [鸿蒙, 烧录, 调试]
summary: 一次只勾选一个示例，编译、烧录、看启动日志；两块板子分别刷固件，靠星闪自动配对。
---

### 1  编译当前勾选的示例

在 Kconfig 中保存选择后，点击 Rebuild；也可先 Clean 再 Build。等待出现 SUCCESS 提示，再检查本次编译输出中的 error 和 warning。按任务要求处理后重新编译，直至无错误、无告警。每次切换示例或修改参数后，都按此方式重新编译。

### 2  烧录到对应开发板

连接开发板，点击 Project Config → 程序加载，传输方式选择 serial，端口选择当前开发板对应的 COM 口。

![](/assets/images/harmony/fig05.png)

*图 4  设置程序加载端口（SDK 指南配图）*

点击程序加载（Burn）；出现 Connecting, please reset device... 时复位开发板，等待烧录完成。图中 COM 口仅为示例，以本机识别结果为准。

先勾选 SMART_ENVIRONMENT，编译并烧录到 OLED 显示板（环境监测板）；再回到 Kconfig，取消 SMART_ENVIRONMENT、勾选 SMART_LAMP，保存后重新编译并烧录到台灯板。两块板通过星闪自动连接（地址和 UUID 固定在 common/sle_config.h，无需配对），烧录后同时上电即可。

### 3  串口启动日志与烧录故障排查

烧录失败时，先检查串口是否被占用。同一串口同一时间只能由一个功能或工具使用；烧录前应停止 HiSpark Studio 的“监视器”，并关闭占用该串口的其他串口调试工具，再重新烧录。

在 Windows“设备管理器”中展开“端口（COM 和 LPT）”，查看 USB-SERIAL CH340 对应的 COM 口。打开 HiSpark Studio 的 Project Config → 程序加载，确认传输方式为 serial，所选端口与设备管理器一致。出现 Connecting, please reset device... 后，按指南复位开发板，再等待烧录完成。

烧录结束后打开“监视器”，选择对应串口，点击“开始监视”并复位开发板，查看启动及示例初始化日志。若日志乱码，检查监视器波特率是否与工程日志配置一致。再次烧录前，先停止监视。
