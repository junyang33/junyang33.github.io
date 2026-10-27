---
title: 南向工程启动与参数修改
date: 2026-10-27
category: 鸿蒙南向工程手册
cover: /assets/images/covers/harmony-1.jpg
tags: [鸿蒙, WS63, 环境搭建]
summary: 准备 SDK 与附件、拷贝示例工程、替换 config.py，再把 Wi-Fi 和两台设备的 MQTT 参数填进配置文件。
---

![](/assets/images/harmony/huawei-logo.png)

准备好 SDK 和 attach 附件（本套示例的附件目录为 attach_env_lamp，下文仍记为 attach），SDK 根目录统一记为 fbb_ws63。在资源管理器中分别打开附件和 SDK；也可在 VS Code左侧资源管理器中展开这两个目录。

### 1  添加示例文件

打开 attach/src/application/samples/products，选中下面三个文件夹，拖拽复制到 fbb_ws63/src/application/samples/products。目标中没有 products 文件夹时，先新建。

文件夹：common、smart_environment、smart_lamp。

再将 attach 中 products 下的 CMakeLists.txt 和 Kconfig 一并拖拽复制到目标 products 目录；已有同名文件时先备份，再替换。它们用于让插件识别并编译这两个示例。

### 2  添加 MQTT 源码

打开 attach/src/open_source/mqtt，将其中的 paho.mqtt.c 文件夹拖拽复制到 fbb_ws63/src/open_source/mqtt，保留目标目录中原有的其他文件。

### 3  替换 config.py

将附件内配套的 config.py 拖入 SDK 对应目录，出现同名文件提示时选择替换。替换前备份原文件。

附件文件：attach/src/build/config/target_config/ws63/config.py

替换位置：fbb_ws63/src/build/config/target_config/ws63/config.py

## 填写 Wi-Fi 与设备参数

进入 fbb_ws63/src/application/samples/products，打开下面的配置文件，修改双引号中的值并保存。

### 1  Wi-Fi 和 MQTT 服务器

文件：common/net_config.h

| 配置项 | 填写内容 |
| --- | --- |
| NET_WIFI_SSID | 设备要连接的 2.4 GHz Wi-Fi 名称 |
| NET_WIFI_PWD | 该 Wi-Fi 的密码 |
| CLOUD_MQTT_HOST | 华为云 IoTDA 的 MQTT 设备接入地址（域名或 IP） |
| CLOUD_MQTT_PORT | 与接入方式对应的端口；本示例默认使用 1883 |

### 2  smart_environment 设备参数

文件：smart_environment/iot_config.h

| 配置项 | 填写内容 |
| --- | --- |
| IOT_CLIENT_ID | OLED 显示板（smart_environment）设备的 MQTT Client ID |
| IOT_DEVICE_ID | 该设备的设备 ID（MQTT 用户名） |
| IOT_DEVICE_SECRET | 该设备的连接密码，按控制台 MQTT 连接参数填写 |

### 3  smart_lamp 设备参数

文件：smart_lamp/iot_config.h。修改同样的三个配置项，填入台灯设备对应的 Client ID、设备 ID 和连接密码。

服务器地址在 IoTDA 实例的接入信息中查看；设备参数在该设备详情中的 MQTT 连接参数中查看。两块开发板分别填写各自设备的参数。

将配置文件中的 YOUR_ 开头占位内容替换为实际值，保存后再编译。

### 4  附件文件一览

下表汇总附件中每个文件的处理方式。表中 products 指 application/samples/products，ws63 指 build/config/target_config/ws63，路径均相对于 attach/src，拷贝或替换到 SDK 中 fbb_ws63/src 下的相同位置。

| 文件或目录 | 操作 |
| --- | --- |
| products/common、smart_environment、smart_lamp | 拷贝：整个文件夹拷到 SDK 相同路径下 |
| products/CMakeLists.txt、Kconfig | 替换：已有同名文件时先备份再覆盖 |
| open_source/mqtt/paho.mqtt.c | 拷贝：保留 SDK 中 mqtt 目录原有的 CMakeLists.txt 等文件 |
| ws63/config.py | 替换：先备份原文件；SDK 版本不同时改用下一行的补丁，或手动加 "mqtt" |
| ws63/config.py.patch | 不用拷贝：备用补丁，在 SDK 根目录用 git apply 打上 |
| products/common/net_config.h | 拷贝后填写：Wi-Fi 名称、密码和 IoTDA 接入地址 |
| products/smart_environment/iot_config.h、smart_lamp/iot_config.h | 拷贝后填写：各自设备的 clientId、username、password |
| application/samples/CMakeLists.txt、Kconfig（SDK 自带） | 不需要改动：示例开关在 Kconfig 界面中勾选 |

## 新建工程

1. 点击“新建工程”，根据提示填写对应信息，芯片选择“WS63”， 工程类型选择“普通工程”，工程名填写“demo”。

![](/assets/images/harmony/fig02.png)

2，选择工程路径和软件包路径，注意选择至src文件夹，选择完成后等待新建成功

![](/assets/images/harmony/fig03.png)

## 通过 HiSpark Studio 选择示例

### 1  打开示例选项

在 HiSpark Studio 中点击 Kconfig【即系统配置】，依次展开：

Application → Enable Sample → Enable the Sample of products

![](/assets/images/harmony/fig04.png)

*图 3  在 products 中勾选 SMART_ENVIRONMENT*

### 2  勾选需要编译的示例

smart_environment：勾选名称中带 SMART_ENVIRONMENT 的选项。

smart_lamp：勾选名称中带 SMART_LAMP 的选项（取消 SMART_ENVIRONMENT 后才会显示）。

一次只勾选一个示例。切换时先取消原来的选项，再勾选另一个。每个示例是一块开发板的完整固件，两块板分别编译、分别烧录。

需要调整引脚或上报周期时，进入对应的 SMART_ENVIRONMENT Sample Configuration 或 SMART_LAMP Sample Configuration。设置完成后点击 Save，关闭配置窗口。
