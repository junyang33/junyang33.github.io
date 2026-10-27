---
title: 华为云平台接入与数据贯通
date: 2026-10-27
category: 鸿蒙南向工程手册
cover: /assets/images/covers/harmony-3.jpg
tags: [鸿蒙, 华为云, IoTDA]
summary: 把 IoTDA 的连接参数写进工程，验证云端下发命令、报警联动和台灯自动控制这几条链路。
---

![](/assets/images/harmony/huawei-logo.png)

### 1   产品与设备注册见华为云新建设备与产品(模型).pdf

### 2  复制连接参数并填写工程配置

在设备详情的“设备信息”页，找到“MQTT连接参数”，点击“查看”。点击各字段右侧的复制图标可分别复制参数，也可以点击“一键复制”。

![](/assets/images/harmony/fig06.png)

*图 9  查看并复制 MQTT 连接参数*

打开 src/application/samples/products/smart_environment/iot_config.h，将 clientId 填入 IOT_CLIENT_ID，将 username 填入 IOT_DEVICE_ID，将 password 填入 IOT_DEVICE_SECRET。填写时复制完整参数，保留代码中的双引号。

打开 common/net_config.h，设置 CLOUD_MQTT_HOST：可直接填写 hostname 域名，也可填写其 IPv4 地址。华北－北京四（cn-north-4）的常用地址为 117.78.5.125，以当前实例域名的解析结果为准。其他区域可在 Linux 终端执行 ping hostname（将 hostname 替换为控制台显示的域名），读取返回的 IPv4 地址并填入。

截图显示 MQTTS、8883 端口；本示例默认使用 MQTT、1883 端口，CLOUD_MQTT_PORT 应与工程实际接入方式一致。

保存配置后，在 HiSpark Studio 的 Kconfig 中选择 smart_environment，再执行 Rebuild，编译成功后烧录到 OLED 显示板。设备联网接入成功后，在控制台检查设备是否在线及物模型数据是否更新。

台灯在“台灯控制器”产品下单独注册设备，并将该设备的连接参数填写到 smart_lamp/iot_config.h。

### 3  联动验证

两块板都烧录并上电后，OLED 上显示 Cld:OK SLE:OK，表示云端和星闪都已连接；控制台中两台设备均显示“在线”。

在 OLED显示板 设备详情的“云端下发”中选择命令 SetTemperatureThreshold，把 TemperatureThreshold 设为低于当前室温的值（例如 20）并下发。OLED 最后一行先提示 SET TEMP THR，随即显示 Status: WARNING!，蜂鸣器报警（KEY1 可静音），物模型数据中的 AlarmStatus 变为 1。

台灯板同时通过星闪收到报警，按当前亮度亮、灭交替闪烁；台灯设备的物模型数据中 LampStatus 变为 "ON"，EnvAlarm 变为 1。把阈值改回 30 后报警解除，台灯恢复按光照自动控制，LampStatus 按实际亮灭上报 "ON" 或 "OFF"。

台灯的亮灭只由两件事决定：环境监测板的报警（经星闪）和光照自动控制（低于 15 lux 开灯、高于 35 lux 关灯）。云端不能开关台灯：SetLampStatus、SetLampMode 下发后设备会正常应答，但灯的状态不变。

这样设计是为了避免两路控制互相矛盾。例如温度超过阈值、台灯正在闪烁时，如果允许云端把灯关掉，环境监测板下一个周期测到的温度仍然超限，又会通过星闪让台灯亮起。要让台灯停止报警闪烁，应对 OLED显示板 下发 SetLinkage 为 OFF（关闭联动），或用 SetTemperatureThreshold、SetHumidityThreshold 调高阈值让报警解除。

云端可以调节台灯亮度：SetLampDutyCycle 下发 1~100，对光照自动点亮和报警闪烁都生效。灯灭时上报的 DutyCycle 为 0，新亮度在下次点亮时生效。
