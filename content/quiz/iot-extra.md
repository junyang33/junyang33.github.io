# 鸿蒙 · 华为云物联网 · 南向开发通用补充题库

> **定位**：通用能力补强题库，共 **150 题**（单选 81 / 多选 34 / 判断 35）
> **适用对象**：HarmonyOS / OpenHarmony 应用开发与设备开发学习者、华为云 IoT 方向参赛选手、专业实训课。
> **题型**：单选 / 多选 / 判断（多选题按「全对才得分」训练）
> **说明**：本题库为依据华为公开技术文档与官方考纲自编的练习题库，。个别版本相关的属性与 API，请以当前所用 SDK / API 版本官方文档为准。

## 题库结构一览

| 专题 | 内容 | 题号 | 题量 |
| --- | :--- | :---: | :---: |
| 一 | 华为云 IoT 与 IoTDA | 1–32 | 32 |
| 二 | Tabs / TabContent 细节 | 33–43 | 11 |
| 三 | 滚动与懒加载细节 | 44–50 | 7 |
| 四 | router 路由跳转与参数 | 51–58 | 8 |
| 五 | 自定义组件与状态管理 V2 | 59–67 | 9 |
| 六 | 并发与 UI 线程限制 | 68–72 | 5 |
| 七 | HTTP 网络请求取值 | 73–76 | 4 |
| 八 | 分布式能力归纳 | 77–79 | 3 |
| 九 | 持久化方案与 Preferences | 80–84 | 5 |
| 十 | MQTT 协议进阶与 QoS | 85–94 | 10 |
| 十一 | CoAP / LwM2M 与低功耗网络 | 95–101 | 7 |
| 十二 | 华为云云服务基础与账号体系 | 102–109 | 8 |
| 十三 | 设备鉴权、接入安全与 OTA | 110–119 | 10 |
| 十四 | OpenHarmony 南向设备开发基础 | 120–134 | 15 |
| 十五 | 南向编译构建、HDF 驱动与外设 | 135–150 | 16 |
| **合计** | | **1–150** | **150** |

---

# 专题一 · 华为云 IoT 与 IoTDA

> HCIA-HarmonyOS 官方考纲不包含华为云 IoT 内容，常规鸿蒙应用开发题库普遍缺失这一块。本专题是最需要系统补强的部分。

## 1.1 单选题（1–14）

**1.** 【单选】华为云 IoT 设备接入服务的英文缩写是？

- A. IoTDM
- B. IoTDA
- C. IoTDS
- D. IoTHub

<details><summary>答案与解析</summary>

**答案：B**

解析：IoTDA = IoT Device Access（设备接入），是华为云 IoT 全栈服务的核心一环，负责设备接入、管理、数据流转与命令下发。
</details>

**2.** 【单选】物联网终端（如 Wi-Fi MCU 模组）与华为云 IoTDA 平台之间最常用的通信协议是？

- A. FTP
- B. MQTT
- C. SMTP
- D. Telnet

<details><summary>答案与解析</summary>

**答案：B**

解析：MQTT 是物联网场景的事实标准：基于发布/订阅的长连接、报文极小、省电省流量、支持 QoS 分级。FTP/SMTP/Telnet 都不是物联网设备通信协议。
</details>

**3.** 【单选】MQTT 的通信模式属于下列哪一种？

- A. 请求-响应（Request-Response）
- B. 发布-订阅（Publish-Subscribe）
- C. 轮询抓取（Polling）
- D. 点对点直连（Peer to Peer）

<details><summary>答案与解析</summary>

**答案：B**

解析：所有设备与平台都连到 Broker（代理），通过 Topic（主题）发布与订阅消息，彼此不需要知道对方地址。
</details>

**4.** 【单选】MQTT 明文传输与 TLS 加密传输对应的默认端口分别是？

- A. 80 与 443
- B. 1883 与 8883
- C. 8080 与 8443
- D. 5683 与 5684

<details><summary>答案与解析</summary>

**答案：B**

解析：MQTT 默认 1883，MQTTS（TLS 加密）默认 8883。5683/5684 是 CoAP 的端口。
</details>

**5.** 【单选】在华为云 IoTDA 控制台上创建设备的正确前置顺序是？

- A. 先注册设备，再创建产品
- B. 先创建产品并定义产品模型，再在该产品下注册设备
- C. 产品与设备可以任意顺序创建，互不影响
- D. 只需创建设备，无需产品

<details><summary>答案与解析</summary>

**答案：B**

解析：产品是一类设备的抽象（定义属性/命令/事件的模型 Profile），设备必须归属于某个产品。
</details>

**6.** 【单选】设备直连 IoTDA 时用于身份鉴权的两要素是？

- A. 用户名与密码
- B. 设备 ID 与设备密钥
- C. IP 地址与 MAC 地址
- D. 证书与私钥

<details><summary>答案与解析</summary>

**答案：B**

解析：控制台注册设备后生成设备ID与设备密钥，设备侧据此计算 MQTT 连接所需的用户名/密码完成鉴权。
</details>

**7.** 【单选】产品模型（Profile）中不包含下列哪一类定义？

- A. 属性（Properties）
- B. 命令（Commands）
- C. 事件（Events）
- D. 数据库表结构（Table Schema）

<details><summary>答案与解析</summary>

**答案：D**

解析：Profile 描述"设备能上报什么属性、能接收什么命令、能上报什么事件"，不涉及平台侧存储结构。
</details>

**8.** 【单选】关于设备影子的作用，下列说法正确的是？

- A. 用于在设备离线时缓存平台要下发给设备的命令
- B. 用于缓存设备最新上报的属性值，设备离线时应用侧仍可读取
- C. 用于存储设备的历史温度曲线数据
- D. 用于替代 MQTT 完成数据加密传输

<details><summary>答案与解析</summary>

**答案：B**

解析：设备影子是一份 JSON 文档（含 reported、desired 等区），保存设备最后一次上报的状态。它不做加密传输，也不存历史曲线。
</details>

**9.** 【单选】设备影子 JSON 中，应用侧下发、等待设备上线后同步的那部分数据位于？

- A. `reported` 区
- B. `desired` 区
- C. `metadata` 区
- D. `shadow` 区

<details><summary>答案与解析</summary>

**答案：B**

解析：`reported` 是设备上报的最新状态；`desired` 是应用/平台下发的期望值，设备上线后同步到位。
</details>

**10.** 【单选】下列哪一类下发需要保证设备实时在线，否则会超时失败？

- A. 同步命令下发
- B. 异步命令下发
- C. 期望值下发（写设备影子 desired）
- D. 产品模型下发

<details><summary>答案与解析</summary>

**答案：A**

解析：同步命令下发立即投递、等待设备响应、有超时限制；异步命令下发会被平台缓存，等设备上线再投递。
</details>

**11.** 【单选】应用侧希望离线状态的设备"上线后自动把执行器打开"，最合适的做法是？

- A. 直接下发同步命令
- B. 写设备影子的 `desired` 区，等设备上线同步
- C. 修改产品模型
- D. 重新注册设备

<details><summary>答案与解析</summary>

**答案：B**

解析：这正是设备影子 desired 区设计的用途——把期望状态先存下来，设备上线后自动拉取执行。
</details>

**12.** 【单选】在 IoTDA 控制台的「消息跟踪」功能主要用于？

- A. 查看设备的历史流量账单
- B. 排查设备上报与平台下发的消息流转，辅助联调
- C. 修改设备的接入地址
- D. 批量删除设备

<details><summary>答案与解析</summary>

**答案：B**

解析：消息跟踪是设备—云端联调阶段最常用的排错工具，能看到属性上报、命令下发的具体报文与结果。
</details>

**13.** 【单选】下列协议中，哪一种通常不适用于 Wi-Fi 物联网设备的实时传感数据上报？

- A. MQTT
- B. HTTPS
- C. FTP
- D. MQTT over TLS

<details><summary>答案与解析</summary>

**答案：C**

解析：MQTT/MQTTS 是主力；HTTPS 也可做补充上报（短连接、功耗高）。FTP 是文件传输协议，不用于传感数据上报。
</details>

**14.** 【单选】设备属性上报与命令下发的数据流转方向分别是？

- A. 属性上报是下行，命令下发是上行
- B. 属性上报是上行（设备→平台），命令下发是下行（平台→设备）
- C. 两者都是上行
- D. 两者都是下行

<details><summary>答案与解析</summary>

**答案：B**

解析：上行 = 设备向平台推送数据；下行 = 平台向设备推送指令。温湿度上传为上行，开启警示灯为下行。
</details>

## 1.2 多选题（15–24）

**15.** 【多选】下列哪些属于华为云 IoTDA 支持的设备接入协议？

- A. MQTT / MQTTS
- B. HTTPS
- C. CoAP / LwM2M
- D. SMTP

<details><summary>答案与解析</summary>

**答案：ABC**

解析：IoTDA 支持 MQTT(S)、HTTPS、CoAP/LwM2M（含 NB-IoT 场景）。SMTP 是邮件协议，不属设备接入协议。
</details>

**16.** 【多选】MQTT 相比 HTTP 更适合物联网场景的原因包括？

- A. 基于长连接，避免反复建连开销
- B. 报头极小，节省带宽与电量
- C. 支持发布/订阅，天然适配一对多、多对一场景
- D. 不需要任何 Broker 即可通信

<details><summary>答案与解析</summary>

**答案：ABC**

解析：MQTT **必须**依赖 Broker（云平台侧的接入服务就是 Broker），D 错误。
</details>

**17.** 【多选】下列关于华为云 IoTDA 中设备影子的描述正确的是？

- A. 用于缓存设备最新上报的属性值
- B. 设备离线时应用侧仍可获取其最近一次上报的状态
- C. 支持应用侧下发期望值，待设备上线后同步至设备
- D. 可替代 MQTT 协议完成数据的加密传输

<details><summary>答案与解析</summary>

**答案：ABC**

解析：D 是典型的错误项——设备影子是一份状态缓存 JSON，**不承担**传输层的加密职责，加密靠 TLS（即 MQTTS）。
</details>

**18.** 【多选】MQTT 协议中与消息可靠性相关的机制包括？

- A. QoS 等级（0/1/2）
- B. 保留消息（Retained Message）
- C. 遗嘱消息（Will Message）
- D. 心跳保活（Keep Alive）

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四项均为 MQTT 标准特性，分别对应投递质量、最新状态缓存、异常掉线通知、连接保活。
</details>

**19.** 【多选】在南向工程接入华为云的过程中，通常需要在设备侧配置的参数包括？

- A. MQTT 接入地址
- B. 接入端口号
- C. 设备 ID
- D. 设备密钥

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：这四项是设备上云的最小配置集，缺一不可——地址与端口决定连到哪，ID 与密钥决定"你声称是谁"。
</details>

**20.** 【多选】一个完整的产品模型（Profile）通常定义？

- A. 设备可上报的属性及其数据类型
- B. 平台可下发至设备的命令及参数
- C. 设备可上报的事件及参数
- D. 设备的固件二进制文件

<details><summary>答案与解析</summary>

**答案：ABC**

解析：固件二进制属于升级包（OTA）管理范畴，不在 Profile 的定义范围内。
</details>

**21.** 【多选】应用侧要显示设备"在线/离线"，可以依据的信息来源有？

- A. 设备影子中的状态字段
- B. IoTDA 控制台的设备列表状态
- C. 设备最近一次属性上报的时间戳
- D. MQTT Broker 的 CPU 占用率

<details><summary>答案与解析</summary>

**答案：ABC**

解析：D 无意义。实际工程中常用"最近上报时间是否超过阈值"来判离线。
</details>

**22.** 【多选】关于同步命令下发与异步命令下发的区别，下列说法正确的有？

- A. 同步下发要求设备在线，异步下发可由平台缓存
- B. 同步下发可以设置较长的缓存有效期
- C. 异步下发可以设置缓存有效期
- D. 两者都需要先在产品模型中定义命令

<details><summary>答案与解析</summary>

**答案：ACD**

解析：缓存有效期是针对**异步**命令下发的概念（平台缓存多久），同步下发是即时投递、超时即失败，B 错误。
</details>

**23.** 【多选】在典型的「应用 App — 云平台 — 设备」三层链路中，下列说法正确的有？

- A. App 与云之间通过云端 API 交互，一般不直连设备
- B. 设备与云之间通过 MQTT 等接入协议交互
- C. App 下发的控制指令需经云平台才能到达设备
- D. App 可以随时跳过云平台直接控制设备

<details><summary>答案与解析</summary>

**答案：ABC**

解析：这种分层架构的核心价值就是解耦与统一鉴权，D 破坏了这一设计前提。
</details>

**24.** 【多选】下列哪些是物联网链路排错时常见的观测/调试手段？

- A. 云端控制台的消息跟踪
- B. 查看设备在线状态与最后上报时间
- C. 通过串口工具查看设备侧日志
- D. 在应用侧打印接口返回数据

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：链路排错要分段验证，四者分别对应平台侧、设备状态侧、设备日志侧、应用侧的观测手段。
</details>

## 1.3 判断题（25–32）

**25.** 【判断】在华为云 IoT 设备接入中，即使设备处于离线状态，应用侧也可通过设备影子获取其最近一次上报的属性值。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：这正是设备影子存在的意义：影子是留存于云端的最新状态快照，即使设备当前离线，读影子也能拿到最后一次上报值。
</details>

**26.** 【判断】MQTT 协议基于请求-响应模式，设备必须轮询平台才能获取下行数据。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：MQTT 基于发布/订阅 + 长连接，平台可主动推送，无需轮询。
</details>

**27.** 【判断】设备影子可以替代 MQTT 协议承担数据加密传输的职责。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：影子是应用层状态缓存机制，传输加密靠 TLS（MQTTS）。
</details>

**28.** 【判断】在 IoTDA 中，产品是设备的抽象模板，一个产品下可以注册多个设备。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：产品 → 设备 是一对多关系。
</details>

**29.** 【判断】同步命令下发在设备离线时会被平台长期缓存，直到设备上线。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：那是**异步**命令下发的行为；同步下发会等待响应并超时失败。
</details>

**30.** 【判断】设备侧通过 MQTT 接入华为云时，需在 Connect 报文中携带由设备 ID 与密钥派生的鉴权信息完成认证。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：连接时携带由设备标识与密钥计算出的 clientId / username / password 等字段，平台校验通过后才允许接入。
</details>

**31.** 【判断】MQTT 协议本身不负责数据加密，传输敏感数据时应启用 TLS 加密或使用国密套件。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：MQTT 只定义消息格式与投递语义，加密发生在传输层。明文 MQTT 的 payload 在网络上可被直接抓取。
</details>

**32.** 【判断】华为云 IoTDA 中，设备上报属性后，平台会更新对应设备影子的 `reported` 区。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：设备上报 → 平台更新影子 reported → 应用侧读影子拿到最新值，这是标准链路。
</details>

---

# 专题二 · Tabs / TabContent 细节

> Tabs 是面试与竞赛的高频考点，且专挑"宽高由谁决定"这类容易张冠李戴的细节出题。

## 2.1 单选题（33–38）

**33.** 【单选】关于 TabContent 的宽度规则，下列说法正确的是？

- A. TabContent 必须显式设置 width 才能显示
- B. TabContent 不支持设置通用宽度属性，宽度默认撑满父组件 Tabs
- C. TabContent 宽度等于 TabBar 的宽度
- D. TabContent 宽度由 Tabs 的 barHeight 决定

<details><summary>答案与解析</summary>

**答案：B**

解析：TabContent 不支持通用宽度属性和高宽属性的设置，其宽度默认撑满 Tabs 父组件；高度由 Tabs 父组件高度减去 TabBar 高度决定。
</details>

**34.** 【单选】TabContent 的高度由什么决定？

- A. 由 TabContent 自己的 height 属性决定
- B. 由父组件 Tabs 的高度与 TabBar 的高度共同决定
- C. 由第一个子组件的高度决定
- D. 固定为屏幕高度

<details><summary>答案与解析</summary>

**答案：B**

解析：TabContent 不支持设置通用高度属性，实际可绘制区域 = Tabs 高度 − TabBar 高度。
</details>

**35.** 【单选】关于 TabsController，下列说法正确的是？

- A. 一个 TabsController 可以同时控制多个 Tabs 组件
- B. 一个 TabsController 只能控制一个 Tabs 组件，不能一对多
- C. TabsController 必须配合 List 使用
- D. TabsController 用于实现懒加载

<details><summary>答案与解析</summary>

**答案：B**

解析：控制器与 Tabs 是绑定关系，不能一对多。这是选择题中极常见的干扰项写法。
</details>

**36.** 【单选】Tabs 组件的子组件只能是？

- A. 任意组件
- B. TabContent
- C. Column
- D. Stack

<details><summary>答案与解析</summary>

**答案：B**

解析：与 List 只能放 ListItem 类似，Tabs 的直接子组件必须是 TabContent。
</details>

**37.** 【单选】要为每个页签设置自定义样式的标签（图标+文字），应在哪个属性上传入 `@Builder` 构造的内容？

- A. Tabs 的 `toolbarConfiguration`
- B. TabContent 的 `tabBar` 属性
- C. Tabs 的 `barWidth`
- D. TabContent 的 `width`

<details><summary>答案与解析</summary>

**答案：B**

解析：`TabContent() { ... }.tabBar(this.TabBuilder(0))`，其中 TabBuilder 用 `@Builder` 装饰。
</details>

**38.** 【单选】Tabs 中让页签纵向排列（左侧竖排）应设置的属性是？

- A. `vertical(true)`
- B. `barPosition(BarPosition.Start)`
- C. `scrollable(true)`
- D. `layoutWeight(1)`

<details><summary>答案与解析</summary>

**答案：A**

解析：`vertical` 控制主轴方向；`barPosition` 控制 TabBar 位于起始端还是末端。
</details>

## 2.2 多选题（39–41）

**39.** 【多选】下列关于 Tabs 与 TabContent 的描述正确的是？

- A. TabContent 组件的宽度由父组件 Tabs 的宽度决定
- B. TabContent 的高度由 Tabs 组件的高度与 TabBar 的高度共同决定
- C. TabsController 可以同时控制多个 Tabs 组件
- D. tabBar 属性支持传入通过 @Builder 构造器生成的组件

<details><summary>答案与解析</summary>

**答案：ABD**

解析：C 是错误项——TabsController 与 Tabs 一一绑定，不能同时控制多个。
</details>

**40.** 【多选】关于 ArkUI 中 Tabs 组件和 TabContent 组件，下列描述正确的是？

- A. TabContent 不支持设置通用宽度属性
- B. TabContent 高度由父组件 Tabs 与 TabBar 高度决定
- C. TabsController 支持一对多控制
- D. tabBar 属性支持 @Builder 构造器生成的组件

<details><summary>答案与解析</summary>

**答案：ABD**

解析：与第 39 题同源考点，只是把"宽度由父组件决定"换成"不支持设置通用宽度属性"的表述。C 依旧错。
</details>

**41.** 【多选】Tabs 的 barPosition 属性可以取下列哪些值？

- A. `BarPosition.Start`
- B. `BarPosition.End`
- C. `BarPosition.Top`
- D. `BarPosition.Bottom`

<details><summary>答案与解析</summary>

**答案：AB**

解析：BarPosition 枚举只有 Start 与 End 两个值（配合 vertical 决定最终呈现为上/下或左/右），没有 Top/Bottom。
</details>

## 2.3 判断题（42–43）

**42.** 【判断】ArkUI 中 Tabs 组件的 TabContent 宽度由 Tabs 组件的 `barWidth` 属性决定。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：`barWidth` 决定的是 **TabBar**（页签条）的宽度，不是 TabContent 的宽度；TabContent 宽度默认撑满 Tabs。典型的"张冠李戴"型陷阱。
</details>

**43.** 【判断】一个 TabsController 实例可以控制多个不同的 Tabs 组件，实现统一切换。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：一对一绑定，不可一对多。
</details>

---

# 专题三 · 滚动与懒加载细节

## 3.1 单选题（44–47）

**44.** 【单选】关于 Scroll 组件的滚动能力，下列说法正确的是？

- A. 必须显式设置 `scrollable` 为 Vertical 或 Horizontal 才能滚动
- B. `scrollable` 默认值为 `ScrollDirection.Vertical`，不设置也能纵向滚动
- C. Scroll 默认不滚动，必须开启
- D. Scroll 只能横向滚动

<details><summary>答案与解析</summary>

**答案：B**

解析：`scrollable` 的默认缺省值是 `ScrollDirection.Vertical`，所以 Scroll 天然可纵向滚动，无需显式设置。
</details>

**45.** 【单选】下列哪个或哪些组件可以显示列表数据并支持懒加载？

- A. Scroll
- B. List
- C. Grid
- D. B 和 C 都对

<details><summary>答案与解析</summary>

**答案：D**

解析：List 与 Grid 都可配合 `LazyForEach` 实现懒加载；Scroll 不满足按需回收能力。注意本题选"都对"。
</details>

**46.** 【单选】为 LazyForEach 配置可视区外的预加载数量，应使用的属性是？

- A. `cachedCount`
- B. `preloadCount`
- C. `bufferSize`
- D. `offscreenCount`

<details><summary>答案与解析</summary>

**答案：A**

解析：List/Grid/Swiper 等支持 `cachedCount(n)`，在可视区外额外预创建 n 个组件，兼顾流畅与内存。
</details>

**47.** 【单选】List 组件的直接子组件只能是？

- A. 任意组件
- B. ListItem 或 ListItemGroup
- C. Stack 或 Column
- D. Scroll

<details><summary>答案与解析</summary>

**答案：B**

解析：List 是懒加载容器，必须以 ListItem / ListItemGroup 作为子组件才能正确回收复用。
</details>

## 3.2 判断题（48–50）

**48.** 【判断】在 ArkUI 中，Scroll 组件必须显式设置 `scrollable` 属性为 `ScrollDirection.Vertical` 或 `ScrollDirection.Horizontal` 才能滚动。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：默认值已是 Vertical，不设置即可滚动。这类"把默认值说成必须手动设置"是判断题常见套路。
</details>

**49.** 【判断】List 组件可以直接嵌套 Grid 作为其子组件并实现懒加载。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：List 的直接子组件必须是 ListItem/ListItemGroup，Grid 需包在 ListItem 内部；且 Grid 自身可独立做懒加载。
</details>

**50.** 【判断】Swiper 可以实现轮播翻页效果，并且其 `loop` 属性可控制是否循环播放。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：Swiper 用于轮播/翻页，`loop` 默认 true。注意与 Slider（滑块组件）区分，两者名字接近但用途完全不同。
</details>

---

# 专题四 · router 路由参数与跳转

## 4.1 单选题（51–53）

**51.** 【单选】跳转到新页面并希望返回时能回到当前页面，应使用？

- A. `router.pushUrl()`
- B. `router.replaceUrl()`
- C. `router.back()`
- D. `router.clear()`

<details><summary>答案与解析</summary>

**答案：A**

解析：push 压栈保留当前页；replace 替换并销毁当前页；back 出栈返回；clear 清空页面栈。
</details>

**52.** 【单选】下列哪个方法用于返回上一页？

- A. `router.pushUrl()`
- B. `router.replaceUrl()`
- C. `router.back()`
- D. `router.clear()`

<details><summary>答案与解析</summary>

**答案：C**

解析：router.back() 执行出栈操作，回到上一次入栈的页面。
</details>

**53.** 【单选】在目标页面中读取路由跳转时携带的参数，应使用？

- A. `router.getParams()`
- B. `router.getState()`
- C. `router.getLength()`
- D. `router.showAlertBeforeBackPage()`

<details><summary>答案与解析</summary>

**答案：A**

解析：`getParams()` 取跳转参数，`getState()` 取当前页面的栈信息（index/name/path）。
</details>

## 4.2 多选题（54–56）

**54.** 【多选】在 HarmonyOS NEXT 应用开发中，下列哪些属于页面路由跳转时可以携带的参数类型？

- A. string 字符串
- B. number 数字
- C. object 对象
- D. ArrayBuffer

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四类均可携带。工程建议：复杂或超大对象建议序列化后传递，或用 AppStorage 传引用，避免挤占 IPC 传输上限。
</details>

**55.** 【多选】HarmonyOS NEXT 中与页面路由/页面栈操作相关的 API 包括？

- A. `router.pushUrl()`
- B. `router.replaceUrl()`
- C. `router.back()`
- D. `router.clear()`

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四个 API 均属 router 模块提供的能力。push/replace 是"跳过去"，back/clear 属于页面栈管理。
</details>

**56.** 【多选】关于 Navigation 组件导航相比 router 的优势，下列说法正确的有？

- A. 支持单栏/分栏自适应，更适合一次开发多端部署
- B. 通过 NavPathStack 管理页面栈，能力更强
- C. 一次开发多端部署场景下官方更推荐
- D. Navigation 只能用于手机竖屏

<details><summary>答案与解析</summary>

**答案：ABC**

解析：Navigation 具备多端形态自适应能力，D 明显错误。
</details>

## 4.3 判断题（57–58）

**57.** 【判断】在 HarmonyOS NEXT 中，`router.replaceUrl()` 跳转新页面后，用户可以通过系统返回键回到原页面。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：replace 会替换并销毁当前页，原页面已不在栈中。常用于登录成功后跳主页的场景。
</details>

**58.** 【判断】使用 `router.pushUrl()` 跳转时入栈的模式默认为多实例模式，可重复创建同名页面。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：默认 `RouterMode.Standard`（多实例）；指定 `RouterMode.Single` 则为单实例，命中栈顶会复用。
</details>

---

# 专题五 · 自定义组件与状态管理 V2

> 新一代状态管理 V2（`@ComponentV2` + `@Local`/`@Param`/`@Once`/`@Event`/`@Provider`/`@Consumer`）常以干扰项形式出现在传统 V1 装饰器的题目中。

## 5.1 单选题（59–63）

**59.** 【单选】下列关于 ArkUI 中 `@Component` 装饰器的描述**错误**的是？

- A. 用于声明自定义组件
- B. 必须实现 `build()` 方法
- C. 支持传入 `@Param` 参数
- D. 能嵌套使用

<details><summary>答案与解析</summary>

**答案：C**

解析：`@Param` 是**状态管理 V2** 的装饰器，必须配合 `@ComponentV2` 使用；传统 `@Component`（V1）对应的是 `@Prop` / `@Link` / `@State`。两者不能混用。
</details>

**60.** 【单选】下列哪一组装饰器属于状态管理 V2？

- A. `@State`、`@Prop`、`@Link`
- B. `@Local`、`@Param`、`@Once`、`@Event`
- C. `@Provide`、`@Consume`、`@ObjectLink`
- D. `@Observed`、`@Builder`、`@Styles`

<details><summary>答案与解析</summary>

**答案：B**

解析：V2 的核心装饰器为 `@Local`（本地状态）、`@Param`（外部传入）、`@Once`（仅同步一次）、`@Event`（回调给父组件）、`@Provider`/`@Consumer`（跨层级）、`@Computed`（计算属性）。
</details>

**61.** 【单选】状态管理 V2 中，声明自定义组件应使用哪个装饰器？

- A. `@Component`
- B. `@ComponentV2`
- C. `@CustomDialog`
- D. `@Entry`

<details><summary>答案与解析</summary>

**答案：B**

解析：`@ComponentV2` 是使用 V2 装饰器的前提；`@Entry` 仍用于标记页面入口。
</details>

**62.** 【单选】关于 V1 与 V2 装饰器能否混用，下列说法正确的是？

- A. 同一组件内可以自由混用
- B. 同一组件内不可混用 V1 与 V2 装饰器
- C. 只有类型式状态可以混用
- D. 混用时编译会自动纠正

<details><summary>答案与解析</summary>

**答案：B**

解析：V1 与 V2 是两套状态管理实现，同一个自定义组件里不能混用，否则会报错。
</details>

**63.** 【单选】`@Prop` 修饰对象类型数据时，采用的是？

- A. 引用传递（深拷贝的对立面）
- B. 深拷贝（值传递），子组件修改不影响父组件原对象
- C. 与 `@Link` 完全相同的双向绑定
- D. 父组件对象与子组件 @Prop 变量指向同一份内存，任一侧修改都同步

<details><summary>答案与解析</summary>

**答案：B**

解析：官方定义 `@Prop` 装饰的变量对复杂类型是**深拷贝**，父组件对象与子组件 @Prop 变量相互独立——D 描述的其实是 `@Link` 的行为。
</details>

## 5.2 多选题（64–65）

**64.** 【多选】下列关于 ArkTS 装饰器说法正确的是？

- A. `@State` 表示组件内部状态
- B. `@Link` 支持父子组件双向同步
- C. `@Prop` 是深拷贝
- D. `@Provide` / `@Consume` 支持跨组件层级共享

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四项描述均正确。C 是容易被漏选的一项——`@Prop` 对对象类型做的是深拷贝，与 `@Link` 的引用传递对比鲜明。
</details>

**65.** 【多选】关于状态管理 V2 的 `@Once` 装饰器，下列说法正确的有？

- A. 必须与 `@Param` 搭配使用
- B. 表示仅初始化时同步一次外部传入的值
- C. 可替代 `@Link` 实现双向同步
- D. 之后父组件的变化不再同步到子组件

<details><summary>答案与解析</summary>

**答案：ABD**

解析：`@Once` 用于"传一次就够了"的场景（如初始值），不建立持续同步，因此 C 错。
</details>

## 5.3 判断题（66–67）

**66.** 【判断】`@Component` 装饰的组件中可以正常使用 `@Param` 装饰器接收父组件传入的参数。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：`@Param` 属 V2，需使用 `@ComponentV2`；V1 的 `@Component` 应使用 `@Prop` / `@Link`。
</details>

**67.** 【判断】V2 中的 `@Event` 装饰器用于让子组件向父组件抛出回调函数，替代 V1 中部分 `@Link` 的反向同步场景。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：V2 用 `@Event` 声明回调方法成员，父组件传入闭包，实现"子 → 父"的单向通知，数据流向更清晰。
</details>

---

# 专题六 · 并发与 UI 线程限制

## 6.1 单选题（68–70）

**68.** 【单选】关于 Worker 线程与 UI 的关系，下列说法正确的是？

- A. Worker 可以直接修改 UI 组件的属性
- B. Worker 不能直接操作 UI，需把结果回传主线程后由主线程更新
- C. Worker 与主线程共享同一份 UI 上下文
- D. Worker 中可以创建 `@State` 状态驱动刷新

<details><summary>答案与解析</summary>

**答案：B**

解析：Worker 拥有独立的线程与全局对象实例，不共享 UI 上下文。任何 UI 更新都必须通过 `postMessage` / `onmessage` 回到主线程（宿主线程）执行。
</details>

**69.** 【单选】TaskPool 中被 `@Concurrent` 修饰的任务函数，下列做法正确的是？

- A. 在任务函数内部直接操作 UI 组件
- B. 在任务函数内部直接访问 UIAbilityContext 的数据库方法
- C. 仅做纯计算，把结果返回给宿主线程再更新 UI
- D. 在任务函数内部调用 `console.log` 更新界面文本

<details><summary>答案与解析</summary>

**答案：C**

解析：并发任务函数应保持"纯函数"，`console.log` 只是打日志；UI 与上下文相关对象不可直接在其中使用。
</details>

**70.** 【单选】Worker 与宿主线程之间通信使用的机制是？

- A. 共享同一块内存变量直接读写
- B. `postMessage()` 发送、`onmessage` 接收的消息机制
- C. 通过全局变量传递
- D. 通过 Preferences 文件中转

<details><summary>答案与解析</summary>

**答案：B**

解析：Worker 线程之间内存隔离，只能靠消息传递。虽然 SharedArrayBuffer 等可共享内存，但常规用法仍是消息机制。
</details>

## 6.2 判断题（71–72）

**71.** 【判断】HarmonyOS NEXT 中 Worker 线程不能直接操作 UI。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：UI 只能在主线程（宿主线程）更新；Worker 计算结果需回传后再触发 UI 刷新。
</details>

**72.** 【判断】因为 TaskPool 由系统统一管理线程池，所以在 TaskPool 任务函数里操作 UI 是允许的。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：无论 TaskPool 还是 Worker，都不在 UI 线程，都不允许直接操作 UI。
</details>

---

# 专题七 · HTTP 网络请求取值

## 7.1 单选题（73–75）

**73.** 【单选】使用 `@ohos.net.http` 模块发起网络请求时，下列哪个是获取响应数据的正确方式？

- A. `httpRequest.on('data', callback)`
- B. `httpRequest.responseCode`
- C. `httpRequest.request.getResponseData()`
- D. `httpRequest.response.result`

<details><summary>答案与解析</summary>

**答案：D**

解析：`http.request()` 返回 `HttpResponse`，响应体在 `result` 字段；`responseCode` 只是 HTTP 状态码（200/404等）；`on('data')` 是流式写法的干扰项。
</details>

**74.** 【单选】`HttpResponse` 中表示本次请求 HTTP 状态码（如 200、500）的字段是？

- A. `result`
- B. `resultType`
- C. `responseCode`
- D. `header`

<details><summary>答案与解析</summary>

**答案：C**

解析：`result` 是响应体、`resultType` 是数据类型（`HttpDataType`）、`header` 是响应头，状态码看 `responseCode`。
</details>

**75.** 【单选】希望 http 模块把响应体直接解析成 JavaScript 对象，应在请求选项中设置？

- A. `expectDataType: http.HttpDataType.OBJECT`
- B. `expectDataType: http.HttpDataType.STRING`
- C. `expectDataType: http.HttpDataType.ARRAY_BUFFER`
- D. `expectDataType: http.HttpDataType.JSON`

<details><summary>答案与解析</summary>

**答案：A**

解析：`HttpDataType` 只有 STRING / OBJECT / ARRAY_BUFFER 三种取值，期望拿到对象用 OBJECT。
</details>

## 7.2 判断题（76）

**76.** 【判断】一个 HttpRequest 对象使用完毕后应当调用 `destroy()` 释放资源。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：一个 HttpRequest 同时只能处理一个请求，用完必须 destroy，否则会占用连接资源。
</details>

---

# 专题八 · 分布式能力归纳

## 8.1 多选题（77–78）

**77.** 【多选】以下哪些是 HarmonyOS 分布式能力的关键技术？

- A. 分布式软总线
- B. 分布式数据管理
- C. 分布式任务调度
- D. 分布式设备虚拟化

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：官方四大分布式关键技术为：分布式软总线、分布式设备虚拟化、分布式数据管理、分布式任务调度。四项全选，注意别漏 D。
</details>

**78.** 【多选】关于分布式软总线的作用，下列说法正确的有？

- A. 是设备间发现、连接、鉴权与数据传输的统一基座
- B. 屏蔽了不同物理链路的差异
- C. 是实现"超级终端"体验的底层支撑
- D. 只用于同一设备内部的进程通信

<details><summary>答案与解析</summary>

**答案：ABC**

解析：D 错——软总线面向**跨设备**互联，设备内进程通信另有 IPC 机制。
</details>

## 8.2 判断题（79）

**79.** 【判断】分布式任务调度可以实现应用在不同设备间的接续（如手机上看到一半的视频在智慧屏继续播放）。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：这正是"应用接续"的典型场景，依赖分布式任务调度与分布式软总线。
</details>

---

# 专题九 · 持久化方案与 Preferences

## 9.1 单选题（80–81）

**80.** 【单选】HarmonyOS NEXT 中数据持久化存储的首选项（Preferences）适用于哪种场景？

- A. 大量结构化数据存储
- B. 少量配置项（如阈值、用户偏好）的快速读写
- C. 大文件存储（如图片、视频）
- D. 分布式跨设备同步

<details><summary>答案与解析</summary>

**答案：B**

解析：Preferences 定位于轻量键值配置。大量结构化数据用 RDB，文件类数据用文件系统，跨设备同步用分布式 KV Store——这三个正好是 A/C/D 的正确归属。
</details>

**81.** 【单选】应用中需要本地保存"用户设置的告警阈值"，最合适的方案是？

- A. 关系型数据库 RDB
- B. 用户首选项 Preferences
- C. 分布式键值数据库 KV Store
- D. 写入 rawfile 资源文件

<details><summary>答案与解析</summary>

**答案：B**

解析：阈值是典型的小量配置项，且需要断电保存、频繁读写。rawfile 资源文件是只读的，打包进 hap 后无法写入。
</details>

## 9.2 多选题（82）

**82.** 【多选】下列哪些是 HarmonyOS NEXT 中可用的数据持久化方案？

- A. Preferences（首选项）
- B. KV-Store（分布式键值数据库）
- C. RDB（关系型数据库）
- D. 文件存储

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四项都算持久化手段。D 容易漏选——通过 Core File Kit（`@ohos.file.fs`）在应用沙箱目录读写文件，也是官方认可的持久化方式之一。
</details>

## 9.3 判断题（83–84）

**83.** 【判断】HarmonyOS NEXT 中首选项（Preferences）支持分布式跨设备同步。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：Preferences 是**本机**键值存储，不做跨设备同步。需要多设备同步请用分布式键值数据库（KV Store）或分布式数据对象。
</details>

**84.** 【判断】调用 Preferences 的 `putSync()` 后，如果不调用 `flush()`，数据可能在应用退出后丢失。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：putSync 只改内存缓存，flush 才落盘。这是 Preferences 最常见的踩坑点。
</details>

---

# 专题十 · MQTT 协议进阶与 QoS

> 只背"MQTT 轻量省电"不够用。考查会深入 QoS 语义、Topic 通配符、控制报文类型、保活与遗嘱这些细节。

## 10.1 单选题（85–92）

**85.** 【单选】MQTT 中 QoS1 的投递语义是？

- A. 至多一次，不确认，可能丢失
- B. 至少一次，确保送达但可能重复
- C. 恰好一次，通过四次握手保证不重不漏
- D. 不保证投递，仅尽力而为

<details><summary>答案与解析</summary>

**答案：B**

解析：QoS0 至多一次（发完不管）；QoS1 至少一次（要求 PUBACK，网络异常重传会导致重复）；QoS2 恰好一次（PUBREC/PUBREL/PUBCOMP 四步握手，最可靠也最慢）。
</details>

**86.** 【单选】某计量设备要求上报数据"绝对不能丢、也不能重复计费"，应选择的 QoS 等级是？

- A. QoS0
- B. QoS1
- C. QoS2
- D. QoS3

<details><summary>答案与解析</summary>

**答案：C**

解析：既要不丢又要去重，只有 QoS2 满足。注意 MQTT 只有 0/1/2 三个等级，不存在 QoS3。实际工程中 QoS2 开销大，多数物联网场景用 QoS1 + 业务层幂等去重来替代。
</details>

**87.** 【单选】MQTT Topic 中用于匹配**多层**层级的是哪个通配符？

- A. `*`
- B. `+`
- C. `#`
- D. `?`

<details><summary>答案与解析</summary>

**答案：C**

解析：`#` 匹配当前层级及其下所有子层级，且必须位于 Topic 最后，如 `device/#` 可匹配 `device/001/status`。`+` 只匹配单层，`*` 和 `?` 是文件系统通配符，不是 MQTT 的。
</details>

**88.** 【单选】订阅主题 `sensor/+/temp` 可以匹配下列哪个 Topic？

- A. `sensor/001/humidity`
- B. `sensor/001/temp`
- C. `sensor/001/sub/temp`
- D. `gateway/001/temp`

<details><summary>答案与解析</summary>

**答案：B**

解析：`+` 是单层通配符，只占据一层。C 展开了两层需用 `#`；A 末层不符；D 首层不符。
</details>

**89.** 【单选】MQTT 客户端向 Broker 发起连接时发送的报文类型是？

- A. SUBSCRIBE
- B. PUBLISH
- C. CONNACK
- D. CONNECT

<details><summary>答案与解析</summary>

**答案：D**

解析：CONNECT 由客户端发出，Broker 收到后回 CONNACK。SUBSCRIBE/SUBACK、PUBLISH/PUBACK（QI1时）、PINGREQ/PINGRESP、DISCONNECT 一一对应，方向别记反。
</details>

**90.** 【单选】MQTT 的 Keep Alive 机制主要解决什么问题？

- A. 提高消息投递的可靠性
- B. 通过周期性心跳维持长连接，及时发现半开连接
- C. 给消息内容做端到端加密
- D. 压缩报文以减少流量

<details><summary>答案与解析</summary>

**答案：B**

解析：Keep Alive 是以秒为单位的心跳间隔，客户端在此周期内需发送报文（无数据时发 PINGREQ），Broker 长时间未收到则判定连接断开。它解决的是"半开连接"——网络已断但双方还以为连着。
</details>

**91.** 【单选】关于遗嘱消息（Will Message），下列说法正确的是？

- A. 客户端连接时预先设置，当其异常断开时由 Broker 代为发布
- B. 由 Broker 在每条消息发布失败时自动生成
- C. 用于服务端主动推送配置给设备
- D. 只能在 QoS2 等级下使用

<details><summary>答案与解析</summary>

**答案：A**

解析：遗嘱（LWT）在 CONNECT 报文中指定 Topic 与内容，客户端**非正常**断开（未发 DISCONNECT）时 Broker 自动发布，常用于"设备掉线通知"。选项 C 描述的是平台向设备下发期望值的场景，应由设备影子实现，与遗嘱无关。
</details>

**92.** 【单选】华为云 IoTDA 中，设备向平台**上报属性**所使用的默认 Topic 格式是？

- A. `/devices/{device_id}/properties/report`
- B. `$iot/devices/{device_id}/sys/properties/up`
- C. `{product_id}/{device_id}/properties`
- D. `$oc/devices/{device_id}/sys/properties/report`

<details><summary>答案与解析</summary>

**答案：D**

解析：华为云设备侧 Topic 统一以 `$oc/devices/{device_id}` 开头（`$oc` 意为 One Connect），如上报属性用 `/sys/properties/report`、接收命令用 `/sys/commands/#`。不同云厂商的 Topic 命名规则不同，换平台时这里最容易踩坑。
</details>

## 10.2 多选题（93）

**93.** 【多选】关于 MQTT 的 QoS 等级，下列说法正确的有？

- A. 共有 0、1、2 三个等级，不存在 QoS3
- B. QoS0 被称为"至多一次"，可能丢失消息
- C. QoS 等级越高，报文交互次数与开销越大
- D. QoS 是端到端的，发布侧与订阅侧必须相同等级才能通信

<details><summary>答案与解析</summary>

**答案：ABC**

解析：D 错——QoS 是**分段生效**的：发布者到 Broker 用发布侧等级，Broker 到订阅者取两者较低值，两端等级不必一致。
</details>

## 10.3 判断题（94）

**94.** 【判断】使用 QoS0 发布消息时，Broker 不会返回确认，消息在网络异常时可能丢失。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：QoS0 又称"fire and forget"（发后不管），适用于对偶发丢失不敏感的场景，如高频环境采样——丢一两个数不影响趋势判断。
</details>

---

# 专题十一 · CoAP / LwM2M 与低功耗网络

> NB-IoT、LoRa 这类场景跑不动 MQTT，CoAP/LwM2M 才是正解。这一块是 MQTT 之外最常见的第二考点。

## 11.1 单选题（95–98）

**95.** 【单选】CoAP 协议工作在哪种传输协议之上？

- A. TCP
- B. UDP
- C. WebSocket
- D. ICMP

<details><summary>答案与解析</summary>

**答案：B**

解析：CoAP（受限应用协议）专为受限节点设计，基于 UDP，省去了 TCP 三次握手开销；可靠性靠自身的重传机制保证。
</details>

**96.** 【单选】CoAP 与 CoAPS（DTLS 加密）对应的默认端口分别是？

- A. 1883 与 8883
- B. 5683 与 5684
- C. 80 与 443
- D. 8080 与 8443

<details><summary>答案与解析</summary>

**答案：B**

解析：5683/5684 是 CoAP 的标准端口；1883/8883 属于 MQTT，别混。
</details>

**97.** 【单选】关于 NB-IoT 的特点，下列描述正确的是？

- A. 带宽极高，适合视频流传输
- B. 基于非授权频谱，部署无需运营商
- C. 低功耗、广覆盖、大连接、低成本，适合表计类小数据量业务
- D. 必须搭配 Wi-Fi 热点才能联网

<details><summary>答案与解析</summary>

**答案：C**

解析：NB-IoT 属 LPWAN（低功耗广域网），工作在运营商授权频段，牺牲带宽换取覆盖深度与续航，典型场景是水表、烟感、井盖等。它不支持视频这类大流量业务。
</details>

**98.** 【单选】LwM2M 协议对设备资源的寻址形式是？

- A. IP 地址 + 端口号
- B. `/对象ID/实例ID/资源ID`，如三级层级路径
- C. RESTful URL + Query 参数
- D. 设备序号的简单列表

<details><summary>答案与解析</summary>

**答案：B**

解析：LwM2M 构建 Object / Instance / Resource 三层模型（OMNA 定义的标准对象如温度传感器对象），路径形如 `/3303/0/5700`，天然可被 CoAP 的 GET/PUT 直接操作，适合远程设备管理。
</details>

## 11.2 多选题（99–100）

**99.** 【多选】下列属于 CoAP 协议特点的有？

- A. 采用与 HTTP 类似的 GET/POST/PUT/DELETE 语义
- B. 基于 UDP，报文头部极小
- C. 支持 DTLS 加密与可靠传输选项
- D. 必须建立长连接并维持心跳

<details><summary>答案与解析</summary>

**答案：ABC**

解析：D 错——CoAP 是无连接的请求/响应模式，不像 MQTT 那样维持长连接，这恰恰是它省电的原因。
</details>

**100.** 【多选】下列协议中，适合电池供电、低带宽物联网设备的有？

- A. MQTT-SN
- B. CoAP
- C. LwM2M
- D. WebSocket

<details><summary>答案与解析</summary>

**答案：ABC**

解析：MQTT-SN 是 MQTT 针对非 TCP/IP 网络的简化版；CoAP/LwM2M 面向受限节点。WebSocket 虽然也是全双工，但基于 TCP、握手与报文开销偏大，一般不作为受限设备的首选。
</details>

## 11.3 判断题（101）

**101.** 【判断】CoAP 协议基于 TCP 实现，因此天然具备可靠传输与拥塞控制能力。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：CoAP 基于 UDP。它的可靠性由自带的 Confirmable Message + 超时重传机制提供，拥塞控制也由协议自身简化实现，与 TCP 无关。
</details>

---

# 专题十二 · 华为云云服务基础与账号体系

> 做 IoT 项目绕不开云上的其他服务：怎么鉴权、数据往哪存、转发到哪去。这是从"能连上"到"能用起来"的分界线。

## 12.1 单选题（102–106）

**102.** 【单选】华为云开放 API 中，用于标识调用者身份的一对长期凭证被称为什么？

- A. AK（Access Key ID）与 SK（Secret Access Key）
- B. AppID 与 AppSecret
- C. OAuth Code 与 Refresh Token
- D. SSH 公钥与私钥

<details><summary>答案与解析</summary>

**答案：A**

解析：AK 相当于用户名（公开），SK 相当于密码（必须保密）。调用华为云 API 时用 SK 对请求做签名（Signature），服务端验签通过才处理。Token 一般由 AK/SK 换取，具有时效性。
</details>

**103.** 【单选】关于华为云 Region（区域）与 AZ（可用区）的关系，下列说法正确的是？

- A. Region 和 AZ 是同一概念的不同叫法
- B. 一个 Region 包含多个 AZ，AZ 之间电力与网络相互独立，通过低时延链路互联
- C. 一个 AZ 可以跨多个 Region
- D. AZ 之间只能通过公网互通

<details><summary>答案与解析</summary>

**答案：B**

解析：Region 是地理概念（如华北-北京四），AZ 是同一 Region 内物理独立的机房。把实例部署在同城不同 AZ 可获得高可用，同时保持低时延互联。
</details>

**104.** 【单选】华为云上用于为用户提供**逻辑隔离**的私有网络空间的服务是？

- A. CDN
- B. ELB
- C. VPC（虚拟私有云）
- D. DNS

<details><summary>答案与解析</summary>

**答案：C**

解析：VPC 内可自定义网段、子网、路由表和安全组，是ECS、数据库等实例的网络容器。CDN 做加速、ELB 做负载分担、DNS 做域名解析。
</details>

**105.** 【单选】关于华为云安全组的规则模型，下列说法正确的是？

- A. 默认放行所有入方向流量
- B. 采用白名单机制，未明确放行的流量默认拒绝，且规则是有状态的
- C. 采用黑名单机制，需手动封禁不想要的地址
- D. 安全组配置后与实例无关，登录 Global 全网生效

<details><summary>答案与解析</summary>

**答案：B**

解析：安全组是**有状态**的虚拟防火墙：放行入方向的请求后，响应流量自动允许出。默认拒绝入方向，所以"端口开了却连不上"八成是安全组没放通。
</details>

**106.** 【单选】华为云 OBS（对象存储服务）中，数据存储的基本容器是？

- A. 目录（Directory）
- B. 桶（Bucket）
- C. 表（Table）
- D. 卷（Volume）

<details><summary>答案与解析</summary>

**答案：B**

解析：OBS 采用扁平的对象模型：桶 → 对象（Object）。所谓"目录"只是对象名里带 `/` 的前缀模拟。IoT 场景常用于存放设备上传的图片、固件包、日志归档。
</details>

## 12.2 多选题（107–108）

**107.** 【多选】华为云 IAM（统一身份认证服务）中常见的管理对象包括？

- A. 用户（User）
- B. 用户组（User Group）
- C. 策略（Policy）与授权
- D. 委托/信任委托（Agency）

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：IAM 的核心实践是"不直接用账号 root 操作"，而是建用户 → 加入组 → 给组挂策略；跨服务授权则用委托。这是云上安全的基本盘。
</details>

**108.** 【多选】华为云 IoTDA 的规则引擎/数据转发可以将设备数据流转到下列哪些服务？

- A. DIS（数据接入服务）
- B. DMS Kafka（分布式消息服务）
- C. OBS 对象存储
- D. FunctionGraph（函数工作流）

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：数据转发是 IoTDA 的核心能力——设备上报的数据经过规则过滤后推送到下游：DIS/Kafka 做流式处理与实时分析，OBS 做冷数据归档，FunctionGraph 做触发器与自定义逻辑，也可对接第三方 HTTP 服务。
</details>

## 12.3 判断题（109）

**109.** 【判断】为了方便调用，把华为云 AK/SK 明文写在应用前端代码或设备固件中是安全的做法。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：AK/SK 属于长期凭证，一旦泄露相当于把云资源的管理权交给别人。正确做法是用临时凭证（Token/STS）下发，或由应用服务端代理签名，前端与设备端只持有有时效的最小权限凭据。
</details>

---

# 专题十三 · 设备鉴权、接入安全与 OTA

## 13.1 单选题（110–114）

**110.** 【单选】"一机一密"认证方式指的是？

- A. 所有同类设备共用一个密钥
- B. 每台设备拥有独立密钥，出厂时预置到每个设备
- C. 每次连接临时生成一个随机密钥
- D. 设备无需密钥，仅靠 IP 白名单识别

<details><summary>答案与解析</summary>

**答案：B**

解析：一机一密安全性最高（单点泄露不影响其它设备），代价是生产环节要为每台设备烧录独立密钥，管理成本高。适合高价值或有合规要求的设备。
</details>

**111.** 【单选】大批量同型号设备希望简化生产烧录流程，同时又不希望共用固定密钥，应选择的认证方式是？

- A. 一机一密，每台单独烧录
- B. 一型一密（注册组），设备首次接入时从平台动态获取设备密钥
- C. 关闭认证，靠 TLS 传输加密
- D. MAC 地址白名单

<details><summary>答案与解析</summary>

**答案：B**

解析：一型一密让同型号设备共用产品级密钥完成首次引导，上线后由平台下发**每台独立的**设备密钥并安全保存，兼顾了生产效率与安全性。注意 C 是错的：TLS 只保证通道不被窃听，不能替代设备身份认证。
</details>

**112.** 【单选】下列哪种认证方式依靠非对称密钥与数字证书体系？

- A. 用户名 + 静态口令
- B. MAC 地址绑定
- C. X.509 证书认证
- D. 明文设备序号

<details><summary>答案与解析</summary>

**答案：C**

解析：X.509 证书内含公钥与签发链，设备用私钥完成挑战-应答，平台用证书链验签。安全芯片（SE/TPM）场景常见，私钥不出芯片，抗克隆能力强。
</details>

**113.** 【单选】MQTTS 中的 "S" 通常指的是？

- A. Secure Shell 隧道
- B. 在 MQTT 与 TCP 之间加入 TLS 层实现加密传输
- C. 一种 MQTT 的超集协议标准
- D. 数据报文采用 Snappy 压缩

<details><summary>答案与解析</summary>

**答案：B**

解析：MQTTS = MQTT over TLS，默认端口 8883。它会带来额外的握手开销与 RAM 占用，在 MCU 上需评估证书校验的内存开销。
</details>

**114.** 【单选】为 CoAP 协议提供加密传输能力的安全协议是？

- A. TLS
- B. WPA2
- C. DTLS
- D. IPSec

<details><summary>答案与解析</summary>

**答案：C**

解析：DTLS（Datagram TLS）是 TLS 面向数据报场景的变体，解决了 UDP 下握手乱序、重放等问题。NB-IoT + CoAP + LwM2M 的组合常配合 PSK 模式的 DTLS 使用。
</details>

## 13.2 多选题（115–116）

**115.** 【多选】下列属于物联网设备接入安全加固措施的有？

- A. 为每台设备分配独立密钥
- B. 启用 TLS / DTLS 加密传输通道
- C. 在平台侧限制设备的 Topic 订阅与发布权限
- D. 在代码中以明文常量形式存放设备密钥便于调试

<details><summary>答案与解析</summary>

**答案：ABC**

解析：D 是明确的反面做法。密钥应存放在安全存储区/安全芯片，调试时通过临时令牌或日志脱敏处理。
</details>

**116.** 【多选】华为云 IoTDA 中一次完整的软固件（OTA）升级通常包含哪些环节？

- A. 上传升级包并完成固件/软件包管理
- B. 创建升级任务并指定升级范围与策略
- C. 由平台强制远程 Root 登录设备执行安装
- D. 设备上报下载与安装进度、最终升级结果

<details><summary>答案与解析</summary>

**答案：ABD**

解析：C 不成立——OTA 由设备侧的升级代理（Agent）主动拉取或被动接收后执行，平台不做远程登录。设备必须上报成功率与失败原因，否则无法判断任务是否完成。
</details>

## 13.3 判断题（117–119）

**117.** 【判断】在物联网场景中，网关设备可以作为代理，让其下挂的、不具备直接联网能力的子设备通过网关与云平台通信。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：这是标准的网关/子设备（Gateway-SubDevice）模式。网关负责汇聚 ZigBee、蓝牙、Modbus 等子设备的连接，统一代理它们上报属性与接收命令，并在平台上维护拓扑关系。
</details>

**118.** 【判断】设备在 OTA 升级时，可以不校验升级包的完整性与签名，直接下载写入并重启。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：未校验的固件可能被中间人替换成恶意固件（"固件劫持"）。标准流程要求校验哈希/签名，且必须保证断电不砖——通常采用双分区（A/B）备份升级。
</details>

**119.** 【判断】设备在完成 OTA 升级后，应当主动向平台上报升级结果与当前版本号，以便确认任务完成情况。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：版本上报是闭环的关键一环。平台据此统计升级成功率，失败时触发重试或告警；未上报的设备会被标记为"升级状态未知"。
</details>

---

# 专题十四 · OpenHarmony 南向设备开发基础

> 南向 = 设备侧开发，与北向（ArkTS 应用开发）相对。理解这一层，才能把"云—管—端"的链路真正走通，而不只是会写界面。

## 14.1 单选题（120–127）

**120.** 【单选】OpenHarmony 按照系统能力由弱到强，将系统分为哪三个类型？

- A. 微型系统、小型系统、大型系统
- B. 轻量系统（Mini）、小型系统（Small）、标准系统（Standard）
- C. 实时系统、分时系统、分布式系统
- D. 内核态系统、用户态系统、混合系统

<details><summary>答案与解析</summary>

**答案：B**

解析：这是 OpenHarmony 最基础的分层概念。三类系统对应不同的硬件能力与内存门槛，决定了能跑什么内核、能不能跑 ArkUI 应用。
</details>

**121.** 【单选】Hi3861 这类 Wi-Fi MCU 属于 OpenHarmony 哪一类系统的典型载体？

- A. 轻量系统（Mini System）
- B. 小型系统（Small System）
- C. 标准系统（Standard System）
- D. 不属于 OpenHarmony 支持范围

<details><summary>答案与解析</summary>

**答案：A**

解析：轻量系统面向 MCU（Cortex-M、RISC-V 32 位），最小内存可低至百 KB 级，Hi3861 是其中最经典的教学与竞赛平台（常见开发板如 BearPi-HM Nano）。
</details>

**122.** 【单选】RK3568 这类带 MMU、内存较大的开发板通常运行哪类 OpenHarmony 系统？

- A. 轻量系统
- B. 小型系统
- C. 标准系统
- D. 无法运行 OpenHarmony

<details><summary>答案与解析</summary>

**答案：C**

解析：标准系统面向内存充足的（通常百 MB 级以上）应用处理器平台，具备增强的图形、媒体、多窗口能力，典型载体是 RK3568 开发板（如 DAYU200）。
</details>

**123.** 【单选】OpenHarmony 轻量系统默认的操作系统内核是？

- A. LiteOS-M
- B. LiteOS-A
- C. Linux
- D. FreeRTOS

<details><summary>答案与解析</summary>

**答案：A**

解析：LiteOS-M 面向无 MMU 的 MCU，体积小、支持抢占式调度与多种低功耗特性。LiteOS-A 面向带 MMU 的小型系统，标准系统则使用 Linux 内核。
</details>

**124.** 【单选】OpenHarmony 小型系统可用的内核是？

- A. 只能使用 LiteOS-M
- B. LiteOS-A 或 Linux
- C. 只能使用 Linux
- D. 无任何内核，裸机运行

<details><summary>答案与解析</summary>

**答案：B**

解析：小型系统面向应用处理器（如 Cortex-A），可根据需要选择 LiteOS-A 或 Linux 内核，这正是 OpenHarmony "一套架构多内核适配"的体现。
</details>

**125.** 【单选】OpenHarmony 标准系统所采用的内核是？

- A. LiteOS-M
- B. LiteOS-A
- C. Linux
- D. Zephyr

<details><summary>答案与解析</summary>

**答案：C**

解析：标准系统需要处理复杂的图形、多媒体与外设，依托 Linux 内核的驱动生态与成熟的进程管理能力，在其上的用户态框架层由 OpenHarmony 提供。
</details>

**126.** 【单选】OpenHarmony 的开源代码主要托管在哪个平台？

- A. GitHub 的 openseadragon 组织
- B. Gitee 的 OpenHarmony 组织
- C. GitLab 自托管服务
- D. 仅通过华为内部仓库分发

<details><summary>答案与解析</summary>

**答案：B**

解析：OpenHarmony 是由开放原子开源基金会孵化运营的开源项目，代码与 SIG（特别兴趣小组）协作公开托管，开发者可自由获取源码并参与贡献。
</details>

**127.** 【单选】OpenHarmony 南向设备侧开发主要使用的编程语言是？

- A. ArkTS
- B. C / C++
- C. Java
- D. Python

<details><summary>答案与解析</summary>

**答案：B**

解析：南向涉及驱动、内核子系统与硬件抽象，以 C/C++ 为主；ArkTS 属于北向应用层语言。需要跨语言调用时可通过 NAPI（Node API 风格的原生扩展机制）桥接。
</details>

## 14.2 多选题（128–130）

**128.** 【多选】关于 OpenHarmony 轻量系统，下列说法正确的有？

- A. 面向 MCU 类处理器，如 Cortex-M、32 位 RISC-V
- B. 硬件内存资源需求远低于标准系统
- C. 通常不具备图形化的 ArkUI 应用运行环境
- D. 支持完整的多用户与多进程隔离能力

<details><summary>答案与解析</summary>

**答案：ABC**

解析：轻量系统资源受限，运行的是单进程多线程模型，不具备多进程隔离与图形栈，因此 D 不成立。这也是为什么 MCU 设备通常靠北向 App 通过云端来"看数据"。
</details>

**129.** 【多选】下列哪些属于 OpenHarmony 常见的南向开发板/平台？

- A. Hi3861 系列开发板（如 BearPi-HM Nano）
- B. Hi3516DV300 系列开发板
- C. RK3568 系列开发板（如 DAYU200）
- D. 普通 x86 桌面主机（不作 OpenHarmony 南向目标）

<details><summary>答案与解析</summary>

**答案：ABC**

解析：ABC 分别对应轻量、小型、标准三类系统的典型载体。x86 桌面机虽可作为某些场景的运行环境，但不是南向设备开发的典型目标板。
</details>

**130.** 【多选】一个典型的南向感知终端通常需要实现的能力包括？

- A. 通过 GPIO/I2C 等接口采集传感器数据
- B. 通过 Wi-Fi 或蜂窝网络接入互联网
- C. 运行 MQTT 等客户端协议与云端通信
- D. 低功耗管理与异常复位恢复

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：这四项构成了"采—传—连—稳"的完整闭环。实际项目中，D 往往最容易被忽略——设备部署后无法人工重启，看门狗与异常自恢复是必备项。
</details>

## 14.3 判断题（131–134）

**131.** 【判断】OpenHarmony 与 HarmonyOS 是同一个系统的两种叫法，二者完全等同。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：OpenHarmony 是开源的**基础能力平台**，由开放原子开源基金会孵化；HarmonyOS 是华为基于 OpenHarmony 等开发的商业发行版，额外包含华为专有能力与服务。二者是"基座"与"发行版"的关系。
</details>

**132.** 【判断】OpenHarmony 轻量系统设备上，可以直接安装运行面向标准系统的 ArkTS Stage 模型应用安装包。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：轻量系统没有相应运行时与图形栈，无法承载标准系统之上的 ArkTS 应用。这类设备上的业务逻辑由 C 编写的程序/任务实现，这也是为什么 MCU 侧数据必须由北向 App 来呈现。
</details>

**133.** 【判断】LiteOS-M 内核采用抢占式任务调度，高优先级任务就绪时可抢占低优先级任务的 CPU。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：这是实时操作系统（RTOS）的核心特征——保证高优先级任务在确定时间内得到响应，嵌入式控制场景依赖这一点。
</details>

**134.** 【判断】OpenHarmony 源码公开可获取，开发者可以在本地完成下载、编译与烧录。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：作为开源项目，源码、工具链与文档均可公开获取。不过拉取完整源码与首次全量编译耗时较长，建议提前准备好构建环境与足够的磁盘空间。
</details>

---

# 专题十五 · 南向编译构建、HDF 驱动与外设

> 这一专题是最接近工程实操的部分：代码写完了怎么编出来、驱动怎么加载、引脚怎么高低电平。

## 15.1 单选题（135–145）

**135.** 【单选】在 OpenHarmony 的 hb 构建工具链中，`hb set` 命令的作用是？

- A. 设置（选择）要编译的产品/解决方案
- B. 设置 IP 地址
- C. 设置 Git 用户名
- D. 设置 CH340 串口波特率

<details><summary>答案与解析</summary>

**答案：A**

解析：`hb` 是 OpenHarmony 的命令行构建工具。`hb set` 交互式选择目标产品（如 `wifiiot_hispark_pegasus`），选择结果写入 `ohos_config.json`，随后 `hb build` 才知道编什么。
</details>

**136.** 【单选】希望忽略已有构建缓存、强制重新完整编译一次，应使用的命令是？

- A. `hb clean -a`
- B. `hb build -f`
- C. `hb env`
- D. `hb set --reset`

<details><summary>答案与解析</summary>

**答案：B**

解析：`-f`（force）强制重建，常用于修改了全局配置或怀疑增量结果不对时。`hb clean` 是清理产物，`hb env` 查看环境信息。
</details>

**137.** 【单选】OpenHarmony 的构建系统底层依赖的工具组合是？

- A. Make + CMake
- B. Maven + Gradle
- C. GN + Ninja
- D. Ant + Ivy

<details><summary>答案与解析</summary>

**答案：C**

解析：GN（Generate Ninja）负责元构建描述，生成 `.ninja` 文件；Ninja 负责执行实际编译，速度快、增量处理高效。开发者编写的是 `BUILD.gn`，一般不直接写 ninja 文件。
</details>

**138.** 【单选】OpenHarmony 源码目录中，用于描述某个模块如何编译、依赖哪些库的文件是？

- A. `Makefile`
- B. `BUILD.gn`
- C. `pom.xml`
- D. `CMakeLists.txt`

<details><summary>答案与解析</summary>

**答案：B**

解析：每个模块/子目录下放置 `BUILD.gn`，用 `ohos_executable`、`ohos_shared_library`、`ohos_static_library` 等模板声明产出类型、源文件与依赖。
</details>

**139.** 【单选】HDF 是哪个缩写？

- A. Hardware Driver Foundation（硬件驱动框架）
- B. High Definition Framework
- C. Host Device Function
- D. Harmony Device File

<details><summary>答案与解析</summary>

**答案：A**

解析：HDF 是 OpenHarmony 的统一驱动框架，目标是解决传统驱动"一棵树上各写各的"的碎片化问题，让驱动具备可组件化、一次开发多部署的能力。
</details>

**140.** 【单选】HDF 使用 HCS 来描述硬件资源配置，其编译后的二进制形式是？

- A. DTB（Device Tree Blob）
- B. ELF 可执行文件
- C. HCB（HDF Configuration Binary）
- D. JSON 文本

<details><summary>答案与解析</summary>

**答案：C**

解析：HCS（HDF Configuration Source）是类 C 语法的配置源码，编译期由 hc-gen 工具转换为 HCB 二进制，由驱动在系统启动时读取解析。
</details>

**141.** 【单选】HDF 驱动的**入口结构体**（struct HdfDriverEntry）中，OpenHarmony 规定的三个主要成员是？

- A. `open`、`read`、`write`
- B. `Bind`、`Init`、`Release`
- C. `start`、`stop`、`restart`
- D. `probe`、`remove`、`suspend`

<details><summary>答案与解析</summary>

**答案：B**

解析：`Bind` 用于将驱动服务发布给框架（对外可见），`Init` 初始化自身并与硬件交互，`Release` 在卸载时释放资源。`read/write` 这类是 VFS 文件操作接口，属另一层。
</details>

**142.** 【单选】在 HDF 框架中，驱动被组织在哪种容器里加载运行？

- A. Docker 容器
- B. Host（驱动宿主）
- C. Java 虚拟机
- D. 单独的 glibc 命名空间

<details><summary>答案与解析</summary>

**答案：B**

解析：HDF 按 Host → Device → Device Node 组织。同一 Host 内的驱动运行在同一个宿主进程，多个 Host 之间隔离；Node 是设备的配置实例节点。
</details>

**143.** 【单选】关于 HDF 驱动的运行模式，下列说法正确的是？

- A. 只支持内核态驱动
- B. 只支持用户态驱动
- C. 支持内核态（KERNEL）与用户态（USER）两种加载模式
- D. 必须在应用层以 ArkTS 实现

<details><summary>答案与解析</summary>

**答案：C**

解析：对性能与资源访问要求最高的驱动放在内核态；其余可配置为在用户态加载，即使某个用户态驱动崩溃一般也不会导致整个内核失效，从而提升了系统稳定性。
</details>

**144.** 【单选】OpenHarmony 中设置 GPIO 引脚输出指定电平（高/低）应当调用？

- A. `GpioRead`
- B. `GpioWrite`
- C. `GpioSetDir`
- D. `GpioSetIrq`

<details><summary>答案与解析</summary>

**答案：B**

解析：`GpioSetDir` 设置方向（输入/输出），`GpioWrite` 写电平，`GpioRead` 读电平，`GpioSetIrq` 配置中断。点亮 LED 的顺序是先 SetDir(OUT) 再 Write(1)。
</details>

**145.** 【单选】要在 ADC 通道上获取模拟量转换结果，应调用？

- A. `AdcCalibrate`
- B. `AdcOpen`
- C. `AdcRead`
- D. `AdcConvert`

<details><summary>答案与解析</summary>

**答案：C**

解析：`AdcRead(channel, &value)` 读取指定通道的转换值；拿到的是原始量化值，还需结合参考电压换算成实际物理量。
</details>

## 15.2 多选题（146–148）

**146.** 【多选】嵌入式设备常用的片外通信总线/接口包括？

- A. I2C
- B. SPI
- C. UART
- D. PWM

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：I2C/SPI/UART 属通信总线（分别适合中低速多从机、高速全双工、异步串口）；PWM 常用于阀门/电机/调光控制。GPIO、ADC 则是最基础的数字/模拟输入输出。
</details>

**147.** 【多选】CMSIS-RTOS2 接口提供的能力包括？

- A. 线程创建与管理（osThreadNew）
- B. 互斥锁与信号量（osMutexNew / osSemaphoreNew）
- C. 消息队列与事件标志（osMessageQueueNew / osEventFlagsNew）
- D. 软件定时器（osTimerNew）

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：CMSIS-RTOS2 是 Arm 定义的 RTOS 统一 API，OpenHarmony LiteOS 对其做了适配。好处是更换 RTOS 时应用代码基本不用改。
</details>

**148.** 【多选】关于 HDF 驱动框架带来的收益，下列说法正确的有？

- A. 统一的驱动入口与加载机制，便于标准化管理
- B. 支持一次开发适配不同内核，减少重复开发
- C. 支持按需组件化裁剪，适配资源受限设备
- D. 要求所有厂商改写成 Java 实现驱动

<details><summary>答案与解析</summary>

**答案：ABC**

解析：D 明显错误——HDF 驱动的主体实现仍是 C 语言。HDF 的价值在于把驱动从"跟随内核版本写死"解放出来。
</details>

## 15.3 判断题（149–150）

**149.** 【判断】OpenHarmony 南向开发中，完成编译后通常需要使用烧录工具（如 DevEco Device Tool、HiBurn 等）将镜像写入目标板的 Flash。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：交叉编译产出的镜像运行在设备侧，必须通过串口或下载线烧录。这也是南向开发与 PC 本地程序开发体验差异最大的环节。
</details>

**150.** 【判断】在 HDF 中，驱动应通过 Bind 方法对外发布服务、通过 Init 方法完成初始化、通过 Release 方法在卸载时释放资源。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：三者分工明确——Bind 只做服务发布，绑定阶段通常还不能操作硬件（此时硬件资源可能尚未就绪）；Init 才真正初始化；Release 负责兜底清理。把 Init 的逻辑写进 Bind 是新手最容易犯的错。
</details>

---

<!--APPEND-->

# 附录 · 通用补充题库答题卡

| 题号 | 题型 | 答案 | 题号 | 题型 | 答案 | 题号 | 题型 | 答案 |
| --- | :---: | :---: | ---: | :---: | :---: | ---: | :---: | :---: |
| 1 | 单选 | B | 2 | 单选 | B | 3 | 单选 | B |
| 4 | 单选 | B | 5 | 单选 | B | 6 | 单选 | B |
| 7 | 单选 | D | 8 | 单选 | B | 9 | 单选 | B |
| 10 | 单选 | A | 11 | 单选 | B | 12 | 单选 | B |
| 13 | 单选 | C | 14 | 单选 | B | 15 | 多选 | ABC |
| 16 | 多选 | ABC | 17 | 多选 | ABC | 18 | 多选 | ABCD |
| 19 | 多选 | ABCD | 20 | 多选 | ABC | 21 | 多选 | ABC |
| 22 | 多选 | ACD | 23 | 多选 | ABC | 24 | 多选 | ABCD |
| 25 | 判断 | A | 26 | 判断 | B | 27 | 判断 | B |
| 28 | 判断 | A | 29 | 判断 | B | 30 | 判断 | A |
| 31 | 判断 | A | 32 | 判断 | A | 33 | 单选 | B |
| 34 | 单选 | B | 35 | 单选 | B | 36 | 单选 | B |
| 37 | 单选 | B | 38 | 单选 | A | 39 | 多选 | ABD |
| 40 | 多选 | ABD | 41 | 多选 | AB | 42 | 判断 | B |
| 43 | 判断 | B | 44 | 单选 | B | 45 | 单选 | D |
| 46 | 单选 | A | 47 | 单选 | B | 48 | 判断 | B |
| 49 | 判断 | B | 50 | 判断 | A | 51 | 单选 | A |
| 52 | 单选 | C | 53 | 单选 | A | 54 | 多选 | ABCD |
| 55 | 多选 | ABCD | 56 | 多选 | ABC | 57 | 判断 | B |
| 58 | 判断 | A | 59 | 单选 | C | 60 | 单选 | B |
| 61 | 单选 | B | 62 | 单选 | B | 63 | 单选 | B |
| 64 | 多选 | ABCD | 65 | 多选 | ABD | 66 | 判断 | B |
| 67 | 判断 | A | 68 | 单选 | B | 69 | 单选 | C |
| 70 | 单选 | B | 71 | 判断 | A | 72 | 判断 | B |
| 73 | 单选 | D | 74 | 单选 | C | 75 | 单选 | A |
| 76 | 判断 | A | 77 | 多选 | ABCD | 78 | 多选 | ABC |
| 79 | 判断 | A | 80 | 单选 | B | 81 | 单选 | B |
| 82 | 多选 | ABCD | 83 | 判断 | B | 84 | 判断 | A |
| 85 | 单选 | B | 86 | 单选 | C | 87 | 单选 | C |
| 88 | 单选 | B | 89 | 单选 | D | 90 | 单选 | B |
| 91 | 单选 | A | 92 | 单选 | D | 93 | 多选 | ABC |
| 94 | 判断 | A | 95 | 单选 | B | 96 | 单选 | B |
| 97 | 单选 | C | 98 | 单选 | B | 99 | 多选 | ABC |
| 100 | 多选 | ABC | 101 | 判断 | B | 102 | 单选 | A |
| 103 | 单选 | B | 104 | 单选 | C | 105 | 单选 | B |
| 106 | 单选 | B | 107 | 多选 | ABCD | 108 | 多选 | ABCD |
| 109 | 判断 | B | 110 | 单选 | B | 111 | 单选 | B |
| 112 | 单选 | C | 113 | 单选 | B | 114 | 单选 | C |
| 115 | 多选 | ABC | 116 | 多选 | ABD | 117 | 判断 | A |
| 118 | 判断 | B | 119 | 判断 | A | 120 | 单选 | B |
| 121 | 单选 | A | 122 | 单选 | C | 123 | 单选 | A |
| 124 | 单选 | B | 125 | 单选 | C | 126 | 单选 | B |
| 127 | 单选 | B | 128 | 多选 | ABC | 129 | 多选 | ABC |
| 130 | 多选 | ABCD | 131 | 判断 | B | 132 | 判断 | B |
| 133 | 判断 | A | 134 | 判断 | A | 135 | 单选 | A |
| 136 | 单选 | B | 137 | 单选 | C | 138 | 单选 | B |
| 139 | 单选 | A | 140 | 单选 | C | 141 | 单选 | B |
| 142 | 单选 | B | 143 | 单选 | C | 144 | 单选 | B |
| 145 | 单选 | C | 146 | 多选 | ABCD | 147 | 多选 | ABCD |
| 148 | 多选 | ABC | 149 | 判断 | A | 150 | 判断 | A |

---

# 附：知识点分布与备考建议

| 能力域 | 覆盖题号 | 题量 | 训练优先级 |
| --- | :--- | :---: | :---: |
| 华为云 IoTDA 与设备接入 | 1–32、85–94、110–119 | 52 | 高 |
| OpenHarmony 南向设备开发 | 120–150 | 31 | 高 |
| 云服务通用基础 | 102–109 | 8 | 中 |
| ArkUI 组件细节与路由 | 33–58、73–84 | 44 | 中 |
| 状态管理与并发 | 59–72 | 15 | 中 |

**备考建议**：

1. **多选题按"全对才得分"训练**。部分考试明确标注"少选或多选都不得分"，宁可放慢也要逐项判断，避免"看似都对"的选项漏判。
2. **华为云部分建议动手建一次真实例子**。在控制台创建产品—注册设备—上报属性—下发命令走完一遍，比背十道题有效；设备影子、同步/异步命令、消息跟踪这几个概念，只靠记忆很容易混淆。
3. **南向部分优先掌握"分层"**。轻量/小型/标准三类系统的划分标准、各自内核、典型开发板，是后面一切知识的地基——理解了分层，才明白为什么轻量系统跑 LiteOS-M、为什么 HDF 要区分用户态与内核态驱动。
4. **版本相关的属性类题目请现场核对**。ArkUI 属性行为可能随 API 版本调整，赛前应在实际开发环境中验证 TabContent、Scroll、List 等组件的实际表现。
