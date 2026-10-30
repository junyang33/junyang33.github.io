# HarmonyOS 应用开发者认证 · 题库（单选 / 判断 / 多选）

> **文件说明**
> - **题目来源声明**：本文件所有题目均为**依据公开考试大纲自编的练习题**，不是官方真题、也不是泄题库，仅供教学辅导与学生备考练习使用。
> - **对标考试**：HarmonyOS 应用开发者基础认证 / 华为 HCIA-HarmonyOS Application Developer（考试代码 H14-211，V2.5 大纲）。
> - **题型范围**：仅含**单选题、判断题、多选题**三种。
> - **答案呈现**：每题答案与解析折叠在 `<details>` 折叠块中，学生做题时不展开即可自用；文件末尾附「答题卡速查表」方便老师批改与快速核对。
> - **答案可能随 API 版本演进**：本文件以 HarmonyOS API 12+ 及 HarmonyOS NEXT 为主要基准，若用于备考请以当期官方课件为准。

---

## 目录与知识点权重

| 章节 | 知识域 | 官方占比 | 题目量 |
| --- | --- | --- | --- |
| 一 | HarmonyOS 介绍 | 10% | 26 |
| 二 | 应用开发入门 | 10% | 26 |
| 三 | 方舟编程语言（ArkTS） | 20% | 44 |
| 四 | 程序框架服务（Ability Kit） | 20% | 44 |
| 五 | 方舟 UI 框架（ArkUI） | 20% | 44 |
| 六 | 网络服务与数据管理 | 10% | 26 |
| 七 | 卡片开发服务（Form Kit） | 10% | 24 |
| — | **合计** | 100% | **234** |

---

# 一、HarmonyOS 介绍

## 1.1 单选题（1–12）

**1.** 【单选】下列属于 HarmonyOS 三大核心秉持理念的是？

- A. 一次打开，多端运行
- B. 一次开发，多端部署
- C. 一次编译，多核调度
- D. 一次安装，多端兼容

<details><summary>答案与解析</summary>

**答案：B**

解析：「一次开发，多端部署」「可分可合，自由流转」「统一生态，原生智能」是 HarmonyOS 对外表述的三大技术理念/特性。A、C、D 均为拼凑干扰项。
</details>

**2.** 【单选】HarmonyOS 技术架构自上而下正确的层次顺序是？

- A. 应用层 → 框架层 → 系统服务层 → 内核层
- B. 应用层 → 系统服务层 → 框架层 → 内核层
- C. 框架层 → 应用层 → 系统服务层 → 内核层
- D. 内核层 → 系统服务层 → 框架层 → 应用层

<details><summary>答案与解析</summary>

**答案：A**

解析：HarmonyOS 采用分层架构，从上到下依次为**应用层、框架层、系统服务层、内核层**。
</details>

**3.** 【单选】关于 HarmonyOS NEXT（原生鸿蒙），下列说法正确的是？

- A. 可以直接安装并运行 Android APK
- B. 应用的基本交付格式为 HAP，不再兼容 APK
- C. 只能使用类 Web 开发范式开发
- D. 不支持分布式能力

<details><summary>答案与解析</summary>

**答案：B**

解析：HarmonyOS NEXT 走出独立生态路线，不再兼容 Android APK，应用以 HAP（Harmony Ability Package）为交付单元；仍支持 Stage 模型与分布式能力。
</details>

**4.** 【单选】下列关于原子化服务（元服务）的说法，**错误**的是？

- A. 用户可免安装直接使用
- B. 拥有独立入口，如负一屏、服务中心
- C. 可分可合，支持在多设备间流转
- D. 必须像传统 App 一样先完成安装才能使用

<details><summary>答案与解析</summary>

**答案：D**

解析：原子化服务的核心特征就是**免安装**、独立入口、可分可合、可流转，D 与传统安装型应用的概念混淆。
</details>

**5.** 【单选】分布式软总线的核心作用是？

- A. 编译 ArkTS 源码为字节码
- B. 实现多设备间的发现、连接与数据传输的统一基座
- C. 把应用打包并上架到应用市场
- D. 负责 ArkUI 的界面绘制与合成

<details><summary>答案与解析</summary>

**答案：B**

解析：分布式软总线是 HarmonyOS 全场景互联的通信底座，屏蔽不同设备的物理链路差异，实现设备发现、连接、鉴权与数据传输。
</details>

**6.** 【单选】实现「一次开发，多端部署」时，下列哪一项**不是**其主要支撑能力？

- A. 响应式布局与栅格布局
- B. 多态／自适应组件
- C. 系统能力集判断与差异化调用
- D. 5G 网络切片

<details><summary>答案与解析</summary>

**答案：D**

解析：多端 UI 适配靠响应式、栅格、多态组件；多端能力差异靠能力集判断。5G 网络切片属通信网络侧技术，与该述说无直接关系。
</details>

**7.** 【单选】关于 HarmonyOS 的两种主要应用形态，下列说法正确的是？

- A. 传统应用需要安装，元服务可免安装使用
- B. 元服务必须先安装后才能使用
- C. 传统应用与元服务的工程结构完全相同
- D. 一个工程不能同时产出传统应用与元服务

<details><summary>答案与解析</summary>

**答案：A**

解析：HarmonyOS 中「应用」是需要安装的完整能力集合，「元服务（原子化服务）」可免安装、后台按需取用，两者可由同一工程通过不同产物形态产出。
</details>

**8.** 【单选】在 DevEco Studio 中，用于将多个 HAP 打包为一个上架产物的操作是？

- A. Build Hap(s)
- B. Build App Pack(s)
- C. Clean Project
- D. Sync Project

<details><summary>答案与解析</summary>

**答案：B**

解析：Build Hap(s) 生成单个或多个 HAP；**Build App Pack(s)** 生成用于上架的 `.app` 包（App Pack）。
</details>

**9.** 【单选】HarmonyOS 应用开发推荐主推的编程语言是？

- A. ArkTS
- B. Java
- C. Objective-C
- D. Dart

<details><summary>答案与解析</summary>

**答案：A**

解析：ArkTS 是 HarmonyOS 生态优选的应用开发语言，在 TypeScript 之上强化静态类型与声明式 UI 能力。
</details>

**10.** 【单选】关于 FA 模型与 Stage 模型，下列说法正确的是？

- A. FA 模型是官方主推的新一代应用模型
- B. Stage 模型通过 Ability 与 UI 解耦，是官方推荐的应用模型
- C. Stage 模型下不再有任何生命周期回调
- D. FA 模型不支持 JavaScript 开发

<details><summary>答案与解析</summary>

**答案：B**

解析：Stage 模型是官方主推的新一代应用模型，Ability 组件与窗口、UI 解耦，更适合多设备与多窗口场景；FA 模型为早期模型。
</details>

**11.** 【单选】技术理念中的「可分可合」主要描述的是？

- A. 一个应用可拆分为多个功能模块，按设备按需部署与组合
- B. 一个线程可以被拆分多个线程并行执行
- C. UI 组件可以自由嵌套任意层级
- D. 一份代码可编译出多种 CPU 架构的 so

<details><summary>答案与解析</summary>

**答案：A**

解析：「可分可合」指应用的各功能单元可独立拆分部署、按需组合，同一应用在不同设备上呈现不同形态。
</details>

**12.** 【单选】关于 HAP（Harmony Ability Package），下列说法正确的是？

- A. HAP 可以直接安装在任意 Android 手机上
- B. HAP 是 HarmonyOS 应用的基本部署单元，可包含 Ability 及其资源
- C. 一个 HAP 必须包含至少两个 Ability
- D. HAP 只能用 Java 语言产出

<details><summary>答案与解析</summary>

**答案：B**

解析：HAP 是 HarmonyOS 应用的基本部署／安装单元，内含 Ability、资源、库等；其数量与语言均无 B、C、D 所述限制。
</details>

## 1.2 多选题（13–18）

**13.** 【多选】HarmonyOS 的核心技术理念／特性包括？

- A. 一次开发，多端部署
- B. 可分可合，自由流转
- C. 统一生态，原生智能
- D. 仅支持单一手机设备形态

<details><summary>答案与解析</summary>

**答案：ABC**

解析：三大核心理念为 A、B、C；HarmonyOS 是面向全场景多设备的分布式操作系统，D 明显错误。
</details>

**14.** 【多选】下列属于分布式能力带来的全场景协同体验的有？

- A. 应用接续
- B. 跨设备剪贴板
- C. 跨设备拖拽
- D. 多屏协同／媒体播控流转

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四项均属于「自由流转」与分布式能力的典型场景。
</details>

**15.** 【多选】关于原子化服务的特点，正确的有？

- A. 免安装即可使用
- B. 支持在多设备之间流转
- C. 可分可合，按需组合功能
- D. 必须用户手动下载升级包才能更新

<details><summary>答案与解析</summary>

**答案：ABC**

解析：原子化服务由提供方在服务端更新，用户无需手动安装包升级，D 错误。
</details>

**16.** 【多选】关于 HarmonyOS 的系统安全设计，下列说法正确的有？

- A. 应用访问敏感资源必须申请并获授权相应权限
- B. 应用运行在相对独立的沙箱环境中，数据相互隔离
- C. 多设备协同时需完成设备间的可信认证
- D. 任意应用均可自由读取其他应用的私有数据

<details><summary>答案与解析</summary>

**答案：ABC**

解析：HarmonyOS 通过权限管控、应用沙箱、分布式安全认证构建安全体系，D 与安全设计相悖。
</details>

**17.** 【多选】HarmonyOS 技术架构包含以下哪些层次？

- A. 应用层
- B. 框架层
- C. 系统服务层
- D. 内核层

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四层架构自上而下为应用层、框架层、系统服务层、内核层。
</details>

**18.** 【多选】元服务可以通过哪些入口触达用户？

- A. 服务中心／负一屏
- B. 桌面上添加的元服务卡片或图标
- C. 只能通过应用市场搜索打开
- D. 碰一碰、扫码、NFC 标签等隐式触发

<details><summary>答案与解析</summary>

**答案：ABD**

解析：元服务具备多入口分发能力，不限于应用市场，C 错误。
</details>

## 1.3 判断题（19–26）

**19.** 【判断】HarmonyOS 采用分布式技术，能够打破单一设备的物理边界实现协同。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：分布式软总线 + 分布式数据/任务管理，使多个设备可融合成一个「超级终端」。
</details>

**20.** 【判断】Android 的 APK 包可以在 HarmonyOS NEXT 上直接安装运行。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：HarmonyOS NEXT 不再兼容 APK，仅支持 HAP 格式的原生应用。
</details>

**21.** 【判断】分布式软总线是全场景互联中设备间互通的统一通信基座。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：符合官方对分布式软总线的定位描述。
</details>

**22.** 【判断】「一次开发，多端部署」意味着同一份代码无需任何 UI 适配即可在所有尺寸设备上获得最佳体验。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：仍需借助响应式布局、栅格布局、多态组件等手段做合理适配，只是减少了重复开发量。
</details>

**23.** 【判断】原子化服务必须以完整安装包的形式由用户安装后才可使用。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：元服务的核心特征之一即为免安装。
</details>

**24.** 【判断】Stage 模型将 Ability 组件与 UI 窗口解耦，更利于多设备、多窗口场景。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：Stage 模型引入 WindowStage 承载窗口，Ability 只负责业务与生命周期，解耦更彻底。
</details>

**25.** 【判断】在 HarmonyOS 技术架构中，应用层位于最上层，直接面向最终用户。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：四层架构中应用层处于最上层。
</details>

**26.** 【判断】HarmonyOS 内核层支持多内核设计，可依据不同设备形态选用合适的内核。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：HarmonyOS 采用多内核设计，针对不同资源能力的设备选用不同内核及系统组件。
</details>

---

# 二、应用开发入门

## 2.1 单选题（27–38）

**27.** 【单选】DevEco Studio 是基于下列哪个平台打造的？

- A. Eclipse
- B. IntelliJ IDEA Community（开源社区版）
- C. Visual Studio Code
- D. Xcode

<details><summary>答案与解析</summary>

**答案：B**

解析：DevEco Studio 基于 IntelliJ IDEA Community 开源版本深度定制。
</details>

**28.** 【单选】HarmonyOS/OpenHarmony 应用开发使用的三方包管理工具是？

- A. npm
- B. ohpm
- C. pip
- D. Maven

<details><summary>答案与解析</summary>

**答案：B**

解析：ohpm（OpenHarmony Package Manager）是鸿蒙生态的包管理器，用于管理三方依赖。
</details>

**29.** 【单选】HarmonyOS 应用工程默认使用的构建工具是？

- A. hvigor
- B. CMake
- C. Gradle
- D. Ant

<details><summary>答案与解析</summary>

**答案：A**

解析：hvigor 是鸿蒙工程的构建工具，配合 hvigor-config.json5、build-profile.json5 使用。
</details>

**30.** 【单选】HarmonyOS 工程中 AppScope 目录的作用是？

- A. 存放单个 Module 的源码
- B. 存放应用级全局配置，如 app.json5 与应用级资源
- C. 存放三方依赖库
- D. 存放崩溃日志

<details><summary>答案与解析</summary>

**答案：B**

解析：AppScope 是应用级作用域目录，包含 app.json5（bundleName、版本、图标等）与全局 resources。
</details>

**31.** 【单选】下列哪一项信息通常**不在** module.json5 中配置？

- A. abilities
- B. deviceTypes
- C. requestPermissions
- D. bundleName

<details><summary>答案与解析</summary>

**答案：D**

解析：bundleName 属于应用级信息，配置在 **app.json5** 中；module.json5 描述单个 Module 的能力配置。
</details>

**32.** 【单选】下列关于 HAR（Harmony Archive）的说法正确的是？

- A. HAR 在运行时由多个 HAP 动态共享
- B. HAR 是静态共享包，编译时会打包进使用方的 HAP 中
- C. HAR 不能被其他工程引用
- D. HAR 只能包含 Java 代码

<details><summary>答案与解析</summary>

**答案：B**

解析：HAR 为静态共享包，随使用方一起编译打包，可能被重复拷贝；HSP 才是运行时动态共享包。
</details>

**33.** 【单选】关于 HSP（Harmony Shared Package），下列说法正确的是？

- A. HSP 是静态共享包，编译时直接复制到每个 HAP
- B. HSP 是动态共享包，可在运行时按需加载，避免多 HAP 重复打包
- C. HSP 不能包含 UI 资源
- D. HSP 必须依赖 HAR 才能编译

<details><summary>答案与解析</summary>

**答案：B**

解析：HSP 解决了 HAR 在多 HAP 场景下重复打包导致的体积冗余问题，运行时按需加载。
</details>

**34.** 【单选】在 `resources/base/media` 下放入名为 `logo.png` 的图片，正确的引用方式是？

- A. `Image('logo.png')`
- B. `Image($r('app.media.logo'))`
- C. `Image('app.media.logo')`
- D. `Image($rawfile('logo.png'))`

<details><summary>答案与解析</summary>

**答案：B**

解析：进入 resource 体系（base/限定词目录）的资源统一使用 `$r('app.xxx.yyy')` 引用；`$rawfile()` 用于 rawfile 原始资源目录。
</details>

**35.** 【单选】要读取 `resources/rawfile` 目录下的 `config.json`，应使用？

- A. `$rawfile('config.json')`
- B. `$r('app.rawfile.config')`
- C. `$r('app.media.config')`
- D. `require('config.json')`

<details><summary>答案与解析</summary>

**答案：A**

解析：rawfile 目录不会被编译为资源索引，只能通过 `$rawfile('文件名')` 原样读取。
</details>

**36.** 【单选】关于应用签名，下列说法正确的是？

- A. 调试签名包可直接用于应用上架发布
- B. 上架发布需要使用发布证书与发布 Profile 文件重新签名
- C. 鸿蒙应用无需签名即可安装到真机
- D. 签名只影响图标显示

<details><summary>答案与解析</summary>

**答案：B**

解析：调试签名仅供开发调试；发布必须使用发布证书（.cer）+ 发布 Profile（.p7b）+ 密钥（.p12）重新签名。
</details>

**37.** 【单选】关于 DevEco Studio 的 Previewer（预览器），下列说法正确的是？

- A. 只能运行不能预览
- B. 支持 ArkTS 声明式页面的实时预览与动态预览
- C. 只能在 macOS 上使用
- D. 必须连接真机才能预览

<details><summary>答案与解析</summary>

**答案：B**

解析：Previewer 支持 ArkTS 声明式开发的实时预览（刷新 UI 描述）与动态预览（模拟交互），无需真机。
</details>

**38.** 【单选】关于 bundleName 的命名规范，下列做法正确的是？

- A. 使用任意字符串，无需担心冲突
- B. 采用反向域名形式并保证全局唯一，如 `com.example.demo`
- C. 可以与已上架应用完全相同
- D. 必须在运行时动态修改

<details><summary>答案与解析</summary>

**答案：B**

解析：bundleName 是应用的唯一标识，采用反向域名风格，上架时不可重复，安装后不可变更。
</details>

## 2.2 多选题（39–44）

**39.** 【多选】Stage 模型鸿蒙工程中常见的配置文件／描述文件包括？

- A. app.json5
- B. module.json5
- C. build-profile.json5
- D. oh-package.json5

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四者分别为应用级配置、模块级配置、构建签名与产物配置、依赖声明。
</details>

**40.** 【多选】对应用进行发布签名时通常涉及哪些文件？

- A. 密钥库文件（.p12）
- B. 数字证书文件（.cer）
- C. 签名 Profile 文件（.p7b）
- D. AndroidManifest.xml

<details><summary>答案与解析</summary>

**答案：ABC**

解析：鸿蒙签名体系使用 .p12 密钥、.cer 证书、.p7b Profile；D 为安卓产物，不参与鸿蒙签名。
</details>

**41.** 【多选】HarmonyOS 工程的 Module 类型包括？

- A. entry
- B. feature
- C. har
- D. hsp

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：entry（主模块，编译为 entry 类型 HAP）、feature（特性模块 HAP）、har（静态共享包）、hsp（动态共享包）。
</details>

**42.** 【多选】resources 目录下使用限定词目录可以区分哪些资源维度？

- A. 语言与地区（如 zh_CN / en_US）
- B. 屏幕密度
- C. 设备类型
- D. 颜色模式（深色／浅色）

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：资源限定词支持国家地区、横竖屏、设备类型、屏幕密度、颜色模式等多维度组合，系统自动匹配。
</details>

**43.** 【多选】DevEco Studio 提供的能力包括？

- A. 工程创建与管理
- B. 代码编辑、智能补全与代码检查
- C. 编译构建、签名与打包
- D. 调试：本地模拟器／远程模拟器／本地真机

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：DevEco Studio 覆盖鸿蒙应用开发全流程：编写、构建、签名、调测。
</details>

**44.** 【多选】将鸿蒙应用上架到华为应用市场，通常需要准备？

- A. 完整的应用图标、名称与介绍
- B. 通过安全与隐私合规检测
- C. 使用发布证书签名的 App Pack（.app）
- D. 提供隐私声明与权限使用说明

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四项均为上架必备要素，缺一通常会被驳回。
</details>

## 2.3 判断题（45–52）

**45.** 【判断】module.json5 中需要配置 abilities 的 name、srcEntry、launchType 等信息。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：module.json5 的 `abilities` 字段用于描述每个 Ability 的名称（name）、源码入口（srcEntry）、启动模式（launchType）、图标标签、skills 等详细信息。注意区分：bundleName 和版本号在 app.json5 中。
</details>

**46.** 【判断】app.json5 用于配置应用级全局信息，如 bundleName、versionCode、versionName。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：app.json5 是应用级配置文件，位于 AppScope 下。
</details>

**47.** 【判断】同一应用的同一设备类型下，可以存在多个入口？即 entry 类型的 HAP 可以有多个。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：entry 类型的 HAP 在同一设备类型下只能有一个，它是应用的入口模块；feature 类型的 HAP 可以有多个。
</details>

**48.** 【判断】DevEco Studio 仅支持 Windows 平台，不支持 macOS。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：DevEco Studio 提供 Windows 与 macOS（含不同芯片架构）版本。
</details>

**49.** 【判断】使用 ohpm 可以添加、安装并管理鸿蒙三方依赖包。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：ohpm 是鸿蒙生态官方包管理器。
</details>

**50.** 【判断】调试签名生成的 HAP 只能用于调试，上架前必须用发布证书与 Profile 重新签名。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：debug 与 release 签名不可混用。
</details>

**51.** 【判断】resources/base 是缺省默认资源目录，工程创建后默认存在，当限定词目录无法命中时系统会回退到 base。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：base 是必存在的默认资源目录，也是资源回退的兜底。
</details>

**52.** 【判断】Stage 模型中，自定义 AbilityStage 需要在 module.json5 中通过 srcEntry 字段指向自定义类文件。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：module.json5 的 `srcEntry` 用于指定 AbilityStage／ExtensionAbility 等组件的实现入口路径。
</details>

---

# 三、方舟编程语言（ArkTS）

## 3.1 单选题（53–74）

**53.** 【单选】ArkTS 中，整数与浮点数值统一使用的类型关键字是？

- A. int
- B. double
- C. number
- D. float

<details><summary>答案与解析</summary>

**答案：C**

解析：ArkTS 用 `number` 统一表示整数与浮点数，不再区分 int/float/double。
</details>

**54.** 【单选】ArkTS 中被官方约束、不推荐继续使用的变量声明关键字是？

- A. let
- B. const
- C. var
- D. readonly

<details><summary>答案与解析</summary>

**答案：C**

解析：ArkTS 推荐使用 `let` / `const`，不支持使用 `var` 声明变量。
</details>

**55.** 【单选】关于 ArkTS 与 TypeScript 的关系，下列说法正确的是？

- A. ArkTS 完全等于 TypeScript，没有任何约束
- B. ArkTS 在 TypeScript 基础上强化了静态类型约束，不支持运行时动态增删对象属性
- C. ArkTS 是一种弱类型、动态类型语言
- D. ArkTS 不支持面向对象编程

<details><summary>答案与解析</summary>

**答案：B**

解析：ArkTS 是 TypeScript 的超集基础上做减法的静态类型语言，要求类型确定、对象布局在编译期固定，以支持更高的运行时性能。
</details>

**56.** 【单选】关于 `@State` 装饰的变量，下列说法正确的是？

- A. 必须由父组件通过构造参数传入初始化
- B. 是组件自身拥有的状态，必须在本地初始化，其变化会触发依赖该状态的 UI 刷新
- C. 只能在 `@Entry` 装饰的组件中使用
- D. 变化后需要手动调用刷新接口才能更新 UI

<details><summary>答案与解析</summary>

**答案：B**

解析：@State 是组件级状态，必须本地初始化；其值变化会自动驱动 UI 刷新，这是声明式 UI 的核心机制。
</details>

**57.** 【单选】`@Prop` 装饰的变量，其数据流向是？

- A. 父组件 → 子组件，单向同步
- B. 子组件 → 父组件，单向同步
- C. 父子双向同步
- D. 无任何同步关系

<details><summary>答案与解析</summary>

**答案：A**

解析：@Prop 实现父到子的单向传递；子组件本地可修改，但修改不会回传给父组件。
</details>

**58.** 【单选】父子组件之间使用 `@Link` 建立双向同步时，父组件传值应采用哪种写法？

- A. `Child({ count: this.count })`
- B. `Child({ count: $count })`
- C. `Child({ count: 'count' })`
- D. `Child({ count: @count })`

<details><summary>答案与解析</summary>

**答案：B**

解析：创建子组件使用 `$` 前缀创建状态的引用进行传值，`$count` 表示建立双向绑定。
</details>

**59.** 【单选】`@Provide` 与 `@Consume` 装饰器主要用于解决什么问题？

- A. 组件内部私有状态管理
- B. 跨组件层级（祖先与后代之间）的状态双向同步，无需逐层传递参数
- C. 应用级全局状态持久化
- D. 并发任务调度

<details><summary>答案与解析</summary>

**答案：B**

解析：`@Provide`（祖先）/ `@Consume`（后代）通过别名自动建立跨层级的双向同步，避免层层透传。
</details>

**60.** 【单选】`@Observed` 与 `@ObjectLink` 组合使用，主要用于？

- A. 实现页面路由跳转
- B. 观测嵌套对象或数组元素内部属性的变化并驱动 UI 刷新
- C. 发起网络请求
- D. 优化列表懒加载

<details><summary>答案与解析</summary>

**答案：B**

解析：普通 @State 无法观测到对象内部深层属性的变化。给类加 `@Observed`、在子组件中用 `@ObjectLink` 接收实例即可实现深层观测。
</details>

**61.** 【单选】`@Builder` 装饰器修饰的方法，其作用是？

- A. 定义可复用的 UI 描述片段（自定义构建函数），便于 UI 复用
- B. 定义全局常量
- C. 声明并发函数
- D. 注册网络监听

<details><summary>答案与解析</summary>

**答案：A**

解析：@Builder 将一段 UI 描述封装为可调用的构建函数，支持组件内与全局两种形式。
</details>

**62.** 【单选】关于 `@Styles` 与 `@Extend`，下列说法正确的是？

- A. `@Styles` 可抽取组件通用样式与事件，不支持传参；`@Extend` 用于扩展原生组件并支持传参
- B. 两者都只能定义在全局，不能在组件内
- C. `@Extend` 用于自定义组件，`@Styles` 用于页面
- D. 两者完全相同

<details><summary>答案与解析</summary>

**答案：A**

解析：@Styles 定义可复用样式集合（不支持参数），@Extend 用于给内置组件扩展属性/事件方法且支持传参。
</details>

**63.** 【单选】关于 `@Entry` 装饰的自定义组件，下列说法正确的是？

- A. 一个页面可以有多个 `@Entry`
- B. `@Entry` 标识该组件为此页面的入口组件，一个页面只能有一个
- C. `@Entry` 只能装饰在 `build()` 方法上
- D. `@Entry` 与 `@Component` 必须二选一

<details><summary>答案与解析</summary>

**答案：B**

解析：@Entry 表示页面入口；作为页面必须且只能有一个 @Entry 组件，且 @Entry 需与 @Component 同时使用。
</details>

**64.** 【单选】ArkTS 声明式 UI 中，条件渲染使用的语法是？

- A. `if / else if / else`
- B. `switch / case`
- C. `while`
- D. `for`

<details><summary>答案与解析</summary>

**答案：A**

解析：ArkUI 渲染控制提供 `if/else if/else`（条件渲染）、`ForEach`（循环渲染）、`LazyForEach`（懒加载渲染）。
</details>

**65.** 【单选】`ForEach(arr, itemGenerator, keyGenerator)` 中第三个参数的作用是？

- A. 指定数据源长度
- B. 为每一项生成唯一且稳定的 key，用于精确识别组件是否存在绑定差异更新
- C. 指定渲染方向
- D. 控制是否懒加载

<details><summary>答案与解析</summary>

**答案：B**

解析：keyGenerator 决定 diff 算法的识别粒度，key 必须唯一且稳定，切忌使用 index 作为 key 处理会增删的数据。
</details>

**66.** 【单选】关于 `LazyForEach`，下列说法正确的是？

- A. 可以脱离容器组件单独使用
- B. 必须提供实现了 `IDataSource` 接口的数据源，通常与 List/Grid 等容器配合实现按需加载
- C. 与 ForEach 完全等价，无性能差异
- D. 只能渲染固定数量的组件

<details><summary>答案与解析</summary>

**答案：B**

解析：LazyForEach 根据可视区域按需创建组件、滑出后回收，必须搭配 IDataSource 使用。
</details>

**67.** 【单选】关于 TaskPool，下列说法正确的是？

- A. 需要开发者自行创建并管理每一个线程的具体数量
- B. 由系统统一管理的任务池，任务函数需使用 `@Concurrent` 装饰，适合CPU密集型短任务
- C. 只能通过 C++ 侧调用
- D. 不支持返回值

<details><summary>答案与解析</summary>

**答案：B**

解析：TaskPool 提供线程池托管能力，开发者只需提交任务并用 `@Concurrent` 修饰任务函数；Worker 才是需要开发者自建管理与了解开销较大的方案。
</details>

**68.** 【单选】关于 Worker，下列说法**错误**的是？

- A. 拥有独立的线程与全局对象，与主线程互不干扰
- B. 适用于执行时间较长、需要长期驻留的耗时任务
- C. 创建与销毁开销较大，不适合频繁创建大量短任务
- D. 与 TaskPool 一样无需开发者关注线程数量

<details><summary>答案与解析</summary>

**答案：D**

解析：Worker 需要开发者自行创建、管理并销毁线程，存在数量上限和心跳；TaskPool 才由系统统一池化调度。
</details>

**69.** 【单选】关于 Promise，下列说法正确的是？

- A. Promise 可以在执行过程中被暂停
- B. Promise 的状态一旦变为已完成或已拒绝后不可逆，并支持 `.then()` 链式调用
- C. Promise 只能同步获取结果
- D. Promise 不支持 async/await 语法

<details><summary>答案与解析</summary>

**答案：B**

解析：Promise 三种状态不可逆，支持链式调用，配合 async/await 使用可写出类同步的异步代码。
</details>

**70.** 【单选】ArkTS 容器类库中，键有序、基于排序结构实现的 Map 是？

- A. HashMap
- B. TreeMap
- C. LightWeightMap
- D. PlainArray

<details><summary>答案与解析</summary>

**答案：B**

解析：TreeMap 按键有序存储与遍历；HashMap 无序、查询效率高；LightWeightMap 占用内存更少；PlainArray 下标均为整数。
</details>

**71.** 【单选】ArkTS 中定义类之间的继承关系使用的关键字是？

- A. `implements`
- B. `extends`
- C. `inherits`
- D. `super`

<details><summary>答案与解析</summary>

**答案：B**

解析：`extends` 用于类的继承，`implements` 用于实现接口，`super` 用于调用父类成员。
</details>

**72.** 【单选】ArkUI 中用来自定义组件的关键字是？

- A. `class`
- B. `struct`
- C. `interface`
- D. `enum`

<details><summary>答案与解析</summary>

**答案：B**

解析：ArkUI 声明式 UI 中使用 `struct` 配合 `@Component` 定义自定义组件，组件内需实现 `build()` 函数。
</details>

**73.** 【单选】`build()` 函数的作用是？

- A. 执行应用的编译打包
- B. 描述组件的 UI 结构，在其中声明组件及其属性与事件
- C. 初始化数据库
- D. 注册 Ability

<details><summary>答案与解析</summary>

**答案：B**

解析：build() 是声明式 UI 的入口，内含 UI 描述的完整性声明；build 中不允许做与 UI 无关的副作用操作。
</details>

**74.** 【单选】ArkTS 中表达「可能为空」的常见做法是？

- A. 使用 `null` 作为默认值即可
- B. 使用联合类型，如 `string | undefined`
- C. 使用 `any` 类型
- D. ArkTS不支持空值处理

<details><summary>答案与解析</summary>

**答案：B**

解析：ArkTS 通过联合类型与严格的空安全约束表达可空性，不推荐使用 any/unknown。
</details>

## 3.2 多选题（75–86）

**75.** 【多选】ArkTS 支持的基本数据类型包括？

- A. number
- B. string
- C. boolean
- D. Object 与 Array

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：ArkTS 支持 number、string、boolean、void、Object、Array、enum、Union 等类型。
</details>

**76.** 【多选】下列装饰器中，属于 ArkUI 状态管理相关装饰器的有？

- A. `@State`
- B. `@Prop`
- C. `@Link`
- D. `@Provide`

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四者均属于状态管理装饰器，分别对应组件内状态、父到子单向、父子双向、跨层级双向同步。
</details>

**77.** 【多选】下列可以用于复用 UI 描述或样式的装饰器／机制有？

- A. `@Builder`
- B. `@BuilderParam`
- C. `@Styles`
- D. `@Extend`

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：@Builder 抽取 UI 片段，@BuilderParam 用于接收外部传入的 @Builder 内容，@Styles/@Extend 抽取样式。
</details>

**78.** 【多选】ArkUI 提供的渲染控制能力包括？

- A. `if/else` 条件渲染
- B. `ForEach` 循环渲染
- C. `LazyForEach` 懒加载渲染
- D. `ContentSlot` 混合渲染（跨节点传递内容）

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四项均为官方列出的渲染控制语法。
</details>

**79.** 【多选】关于 TaskPool 与 Worker 的区别，下列说法正确的有？

- A. TaskPool 适合短时、CPU 密集型任务，由系统统一做线程池化调度
- B. Worker 适合长期驻留的耗时任务，需开发者自行创建、管理并销毁
- C. 两者都存在阈值约束：Worker 有数量上限，TaskPool 受任务数与优先级策略约束
- D. 耗时任务都不应放在主线程（UI 线程）执行，否则会阻塞 UI 造成卡顿

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：TaskPool 池化托管短任务（任务函数需 `@Concurrent` 装饰），Worker 长驻、创建销毁开销大且有数量上限；二者都用于把耗时工作从主线程剥离。
</details>

**80.** 【多选】ArkTS 容器类库中包含下列哪些容器？

- A. ArrayList、LinkedList、List
- B. Queue、Deque、Stack
- C. HashMap、HashSet、TreeMap、TreeSet
- D. LightWeightMap、LightWeightSet、PlainArray

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四组均属 @kit.ArkTS 容器类库的线性容器与非线性容器。
</details>

**81.** 【多选】关于 `ForEach` 的 key 生成函数，下列做法合理的有？

- A. 使用数据项自身的唯一 id 字符串
- B. 使用各字段拼接后能保证唯一的值
- C. 对会动态增删的数据直接使用数组下标 index
- D. 对每条数据都返回同一个常量 key

<details><summary>答案与解析</summary>

**答案：AB**

解析：key 必须唯一且稳定；使用 index 在列表发生插入/删除时会导致数据错绑，返回常量同样不可行。
</details>

**82.** 【多选】下列 ArkTS 语言特性描述正确的有？

- A. 支持类、接口、枚举、泛型
- B. 支持模块化的 `import` / `export`
- C. 支持 async/await 异步语法
- D. 支持 `interface` 定义接口

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四项均为 ArkTS 支持的基本语言能力。
</details>

**83.** 【多选】关于 `@State` 装饰的基本类型变量发生变化时的行为，下列说法正确的有？

- A. @State 观测的是该变量自身的赋值变化
- B. 变量变化后，依赖该状态的 UI 描述会被重新执行
- C. 嵌套对象的属性变化无需任何处理即可被自动观测
- D. 只有被该状态直接驱动的组件树部分会刷新，具备精准更新能力

<details><summary>答案与解析</summary>

**答案：ABD**

解析：@State 只观测自身赋值级别的变化；嵌套对象属性变化需 `@Observed` + `@ObjectLink` 才能被观测（C 错）；命中后会精准刷新依赖该状态的 UI 部分（D 对）。
</details>

**84.** 【多选】ArkTS 对 TypeScript 做了哪些典型约束（目的为何提升性能）？

- A. 强制静态类型，限制 any/unknown 的使用
- B. 禁止在运行时动态新增或删除对象属性
- C. 限制了部分运算符的动态语义
- D. 不再使用纯粹的结构化类型（structural typing）

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：这些约束让编译器能在编译期确定对象布局与类型，从而生成更高效的字节码。
</details>

**85.** 【多选】使用 `LazyForEach` 时，数据源需要实现 `IDataSource` 的哪些方法？

- A. `totalCount()`
- B. `getData(index)`
- C. `registerDataChangeListener(listener)`
- D. `unregisterDataChangeListener(listener)`

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：IDataSource 接口要求实现这四类方法，供容器按需取数与监听变更。
</details>

**86.** 【多选】关于 async/await，下列说法正确的有？

- A. `await` 只能在 `async` 函数中使用（或模块的顶层 await 场景）
- B. `async` 函数返回值会被包装为 Promise
- C. 可以使异步代码写起来像同步代码，提升可读性
- D. 可以把任意同步函数改为 async 而毫无代价

<details><summary>答案与解析</summary>

**答案：ABC**

解析：async/await 是 Promise 的语法糖；await 需位于 async 上下文中，返回值自动封装为 Promise。D 错在无端添加 async 会引入不必要的异步开销。
</details>

## 3.3 判断题（87–96）

**87.** 【判断】`@Prop` 装饰的变量与父组件之间是双向同步的。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：@Prop 为父到子单向同步；@Link 才是双向同步。
</details>

**88.** 【判断】`@Link` 装饰的变量发生变化时，父组件中对应的状态会同步更新。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：@Link 建立父子间数据的双向绑定，任一侧修改都会同步到另一侧。
</details>

**89.** 【判断】`ForEach` 的第三个参数若省略或返回不稳定的值，会导致列表数据错绑或渲染异常。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：key 是 diff 的依据，不稳定会引发错乱；官方强烈建议提供唯一稳定的 keyGenerator。
</details>

**90.** 【判断】`LazyForEach` 可以与任意容器组件配合使用，与 `ForEach` 没有搭配约束。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：LazyForEach 需在支持懒加载的容器（List、Grid、Swiper、WaterFlow 等）中使用，才能实现按需创建。
</details>

**91.** 【判断】TaskPool 中的任务函数不需要任何装饰器，直接传入普通函数即可。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：提交到 TaskPool 的函数通常需要用 `@Concurrent` 装饰，并遵守其使用限制。
</details>

**92.** 【判断】ArkTS 中不推荐使用 `var` 声明变量。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：ArkTS 规范不支持/不推荐使用 var，应使用 let 与 const。
</details>

**93.** 【判断】可以在运行时给一个 ArkTS 对象动态添加原本未在类/接口中声明的属性。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：ArkTS 要求对象布局编译期确定，不支持运行期动态增删属性。
</details>

**94.** 【判断】`@Observed` 装饰类、`@ObjectLink` 接收该类实例，可实现嵌套对象属性的观测刷新。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：这是处理深层嵌套数据变化的标准做法。
</details>

**95.** 【判断】`Promise` 的状态一经确定便不可再次改变，并且支持 `.then()` 链式调用。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：Promise 的 pending → fulfilled / rejected 不可逆，且支持链式调用。
</details>

**96.** 【判断】ArkTS 中 `build()` 函数内除了声明 UI 之外，还可以随意编写网络请求、数据库读写等副作用代码。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：build() 应保持纯粹的 UI 描述，副作用应放到生命周期回调（如 aboutToAppear）或事件回调中处理。
</details>

---

# 四、程序框架服务（Ability Kit）

## 4.1 单选题（97–118）

**97.** 【单选】Stage 模型中，提供 UI 绘制窗口并与用户交互的核心组件是？

- A. ServiceAbility
- B. UIAbility
- C. DataAbility
- D. FormAbility

<details><summary>答案与解析</summary>

**答案：B**

解析：Stage 模型的核心组件是 UIAbility（承载 UI 与生命周期）与各类 ExtensionAbility（无 UI 的后退服务，如 FormExtensionAbility）。ServiceAbility/DataAbility 属 FA 模型概念。
</details>

**98.** 【单选】下列回调中，**不属于** UIAbility 生命周期的是？

- A. `onCreate`
- B. `onWindowStageCreate`
- C. `onPageShow`
- D. `onDestroy`

<details><summary>答案与解析</summary>

**答案：C**

解析：`onPageShow` / `onPageHide` / `onBackPress` 属于**页面（@Entry 装饰的组件）**生命周期；UIAbility 的生命周期为 Create、WindowStageCreate、Foreground、Background、WindowStageDestroy、Destroy 六套回调。
</details>

**99.** 【单选】UIAbility 首次启动并被拉到前台时，回调的正确顺序是？

- A. onCreate → onWindowStageCreate → onForeground
- B. onForeground → onCreate → onWindowStageCreate
- C. onWindowStageCreate → onCreate → onForeground
- D. onCreate → onForeground → onWindowStageCreate

<details><summary>答案与解析</summary>

**答案：A**

解析：标准的启动流程：onCreate 创建实例 → onWindowStageCreate 创建 WindowStage 并 loadContent 加载页面 → onForeground 切到前台可见。
</details>

**100.** 【单选】用于在 UIAbility 中为 WindowStage 加载指定页面的 API 是？

- A. `windowStage.createSubWindow()`
- B. `windowStage.loadContent('pages/Index')`
- C. `windowStage.setUIContent()`
- D. `windowStage.show()`

<details><summary>答案与解析</summary>

**答案：B**

解析：`onWindowStageCreate(windowStage)` 中调用 `windowStage.loadContent('pages/Index', callback)` 完成页面加载。
</details>

**101.** 【单选】关于自定义组件的生命周期，下列说法**正确**的是？

- A. `aboutToAppear` 在组件实例创建后、`build()` 执行之前被调用
- B. `aboutToDisappear` 在组件创建前调用
- C. 自定义组件不具备生命周期回调
- D. `onPageShow` 是所有自定义组件都有的回调

<details><summary>答案与解析</summary>

**答案：A**

解析：自定义组件拥有 `aboutToAppear`（build 之前，用于初始化数据）与 `aboutToDisappear`（销毁前，用于释放资源）；`onPageShow` 仅 @Entry 页面组件有。
</details>

**102.** 【单选】UIAbility 的默认启动模式是？

- A. multiton
- B. singleton
- C. specified
- D. standard

<details><summary>答案与解析</summary>

**答案：B**

解析：三种启动模式为 singleton（默认，单实例复用）、multiton（每次新建实例）、specified（由业务在 onAcceptWant 中返回自定义 Key 决定实例）。
</details>

**103.** 【单选】某记账应用希望「同一个账单详情页可以被打开多次且各自独立」，应选择哪种启动模式？

- A. singleton
- B. multiton
- C. specified
- D. 以上均可

<details><summary>答案与解析</summary>

**答案：B**

解析：multiton 为多实例模式，每次 startAbility 都会创建新的 UIAbility 实例，适合可重复打开的页面。
</details>

**104.** 【单选】`specified` 启动模式下，需要通过哪个回调返回一个自定义 Key 来决定复用哪个实例？

- A. `UIAbility.onCreate`
- B. `AbilityStage.onAcceptWant`
- C. `UIAbility.onWindowStageCreate`
- D. `AbilityStage.onCreate`

<details><summary>答案与解析</summary>

**答案：B**

解析：specified 模式下，`AbilityStage.onAcceptWant(want)` 返回一个字符串 Key，系统据此匹配已有实例，命中则回调 `onNewWant`，未命中则新建。
</details>

**105.** 【单选】在 singleton 模式下，当 UIAbility 已存在时再次启动它，会回调哪个方法？

- A. `onCreate`
- B. `onNewWant`
- C. `onWindowStageCreate`
- D. `onBackground`

<details><summary>答案与解析</summary>

**答案：B**

解析：已存在实例的复用场景中，新的 Want 通过 `onNewWant(want, launchParam)` 传递，不会重新走 onCreate。
</details>

**106.** 【单选】应用层内启动另一个 UIAbility，通常使用哪个 API？

- A. `this.context.startAbility(want)`
- B. `router.pushUrl()`
- C. `formProvider.updateForm()`
- D. `windowStage.loadContent()`

<details><summary>答案与解析</summary>

**答案：A**

解析：UIAbilityContext 提供 `startAbility(want)` 启动应用内/跨应用的 UIAbility；router 只做页面内路由跳转。
</details>

**107.** 【单选】需要启动目标 UIAbility 并在其结束后取回返回结果，应使用的组合是？

- A. `startAbility` + `terminateSelf`
- B. `startAbilityForResult` + `terminateSelfWithResult`
- C. `startAbility` + `onDestroy`
- D. `router.pushUrl` + `router.back`

<details><summary>答案与解析</summary>

**答案：B**

解析：带结果启动用 `startAbilityForResult(want, callback)`；目标侧用 `terminateSelfWithResult(abilityResult)` 回传 resultCode 与 want 参数。
</details>

**108.** 【单选】Want 对象中用于指定目标 Ability 所在应用包名与 Ability 名的字段分别是？

- A. `deviceId` 与 `moduleName`
- B. `bundleName` 与 `abilityName`
- C. `action` 与 `entity`
- D. `uri` 与 `type`

<details><summary>答案与解析</summary>

**答案：B**

解析：显式 Want 通过 bundleName + abilityName 精确定位；action/entities/uri/type 用于隐式 Want 匹配。
</details>

**109.** 【单选】隐式 Want 跳转依赖目标 Ability 在 module.json5 中声明的哪个字段完成匹配？

- A. `skills`
- B. `requestPermissions`
- C. `metadata`
- D. `srcEntry`

<details><summary>答案与解析</summary>

**答案：A**

解析：目标 UIAbility 在 module.json5 的 `abilities.skills` 中声明 actions / entities / uris，系统据此与发起方传入的隐式 Want 做匹配。
</details>

**110.** 【单选】用于接收 UIAbility 与其 UI 页面之间事件通信的对象是？

- A. `AppStorage`
- B. `context.eventHub`
- C. `Preferences`
- D. `WindowStage`

<details><summary>答案与解析</summary>

**答案：B**

解析：UIAbilityContext 持有 EventHub，通过 `emit()` 发送、`on()` 订阅、`off()` 取消订阅，实现 Ability 与页面的解耦通信。
</details>

**111.** 【单选】关于 AppStorage，下列说法正确的是？

- A. 是页面级的状态存储，随页面销毁而释放
- B. 是应用级的全局状态中心，可与 @StorageProp/@StorageLink 配合在整个应用内共享
- C. 用于持久化存储大规模结构化数据
- D. 只能在 UIAbility 中使用

<details><summary>答案与解析</summary>

**答案：B**

解析：AppStorage 是应用级单例全局存储（内存态）；LocalStorage 才是页面级存储，@LocalStorageLink/@LocalStorageProp 与之配套。持久化请用 Preferences / RDB。
</details>

**112.** 【单选】Stage 模型中，`AbilityStage` 的作用是？

- A. 负责单个页面的 UI 绘制
- B. 作为 HAP 的运行时容器/初始化入口，可提供 AbilityStageContext 并处理应用级回调
- C. 负责网络请求
- D. 替代 UIAbility

<details><summary>答案与解析</summary>

**答案：B**

解析：AbilityStage 是 Module（HAP）级别的容器，提供 onCreate、onAcceptWant、onMemoryLevel、onConfigurationUpdate 等回调。
</details>

**113.** 【单选】下列哪个 **不** 属于 UIAbility 的常见回调？

- A. `onForeground`
- B. `onBackground`
- C. `onWindowStageDestroy`
- D. `aboutToAppear`

<details><summary>答案与解析</summary>

**答案：D**

解析：`aboutToAppear` 属自定义组件（UI）生命周期，非 UIAbility 回调。
</details>

**114.** 【单选】UIAbility 实例销毁自身应调用？

- A. `terminateSelf()`
- B. `finish()`
- C. `stopSelf()`
- D. `onDestroy()`

<details><summary>答案与解析</summary>

**答案：A**

解析：`this.context.terminateSelf()` 结束当前 UIAbility；`onDestroy` 是由系统调用的回调，不应主动调用。
</details>

**115.** 【单选】`UIAbility` 中获取上下文对象 `context` 的常见方式是？

- A. `getContext(this)`
- B. `this.context`
- C. `new Context()`
- D. `Ability.getContext()`

<details><summary>答案与解析</summary>

**答案：B**

解析：UIAbility 内部通过 `this.context` 拿到 UIAbilityContext，用于 startAbility、terminateSelf、eventHub 等。
</details>

**116.** 【单选】在 Stage 模型中，若希望在 UIAbility 与页面之间共享一组内存态数据且不希望污染应用全局，最适合选择？

- A. AppStorage
- B. LocalStorage
- C. 关系型数据库
- D. 分布式键值数据库

<details><summary>答案与解析</summary>

**答案：B**

解析：LocalStorage 是页面级/Ability 级的共享存储，作用范围可选地被限制，适合单页面内的多个子自定义组件共享。
</details>

**117.** 【单选】关于 `@StorageProp` 与 `@StorageLink`，下列说法**正确**的是？

- A. `@StorageProp` 为单向，AppStorage 中的键值变化会同步到组件，但组件本地修改不回写
- B. `@StorageLink` 为单向同步
- C. 两者均与 LocalStorage 绑定
- D. 两者都能实现持久化到磁盘

<details><summary>答案与解析</summary>

**答案：A**

解析：@StorageProp 单向（Storage → 组件），@StorageLink 双向。对应的 LocalStorage 版本为 @LocalStorageProp / @LocalStorageLink。
</details>

**118.** 【单选】ExtensionAbility 的典型派生类型中，Form Kit 卡片开发使用的是？

- A. `ServiceExtensionAbility`
- B. `FormExtensionAbility`
- C. `InputMethodExtensionAbility`
- D. `WorkSchedulerExtensionAbility`

<details><summary>答案与解析</summary>

**答案：B**

解析：FormExtensionAbility 提供卡片的创建、销毁、更新与事件处理能力。
</details>

## 4.2 多选题（119–130）

**119.** 【多选】UIAbility 的生命周期回调包括？

- A. `onCreate`
- B. `onWindowStageCreate`
- C. `onForeground`
- D. `onWindowStageDestroy`

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：完整六组为 Create、WindowStageCreate、Foreground、Background、WindowStageDestroy、Destroy。
</details>

**120.** 【多选】UIAbility 支持的启动模式（launchType）包括？

- A. singleton
- B. multiton
- C. specified
- D. standard

<details><summary>答案与解析</summary>

**答案：ABC**

解析：官方定义的三种为 singleton、multiton、specified；standard 是 router 页面路由的 RouterMode，不是 launchType。
</details>

**121.** 【多选】Want 对象中可以携带的信息包括？

- A. bundleName
- B. abilityName
- C. parameters
- D. deviceId

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：Want 作为信息传递载体，包含 deviceId、bundleName、abilityName、moduleName、uri、action、entities、type、parameters、flags 等。
</details>

**122.** 【多选】Stage 模型中可用于 UIAbility 与其 UI 页面之间数据同步／通信的方式有？

- A. `context.eventHub` 事件机制
- B. AppStorage
- C. LocalStorage
- D. 通过 Want 的 parameters 传递

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四种均为官方推荐的数据同步方式，分别适用于松耦合事件、应用级全局状态、页面级状态、一次性启动参数。
</details>

**123.** 【多选】AbilityStage 提供的回调包括？

- A. `onCreate`
- B. `onAcceptWant`
- C. `onMemoryLevel`
- D. `onConfigurationUpdate`

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：AbilityStage 负责 Module 级初始化、specified 模式的 Key 分配、内存动态调节与配置变更响应。
</details>

**124.** 【多选】下列组件中，属于 ExtensionAbility 派生类型的有？

- A. FormExtensionAbility
- B. ServiceExtensionAbility
- C. 输入法与无障碍类后台服务能力（相应 ExtensionAbility 派生）
- D. UIAbility

<details><summary>答案与解析</summary>

**答案：ABC**

解析：UIAbility 并非 ExtensionAbility 的派生类，二者是 Stage 模型下并列的系统组件形态。
</details>

**125.** 【多选】隐式 Want 跳转时，目标 Ability 可在 skills 标签中声明哪些信息供匹配？

- A. actions
- B. entities
- C. uris
- D. launchType

<details><summary>答案与解析</summary>

**答案：ABC**

解析：skills 中包含 actions、entities、uris 用于与发起方 Want 匹配；launchType 为 Ability 自身的启动模式配置。
</details>

**126.** 【多选】关于 `startAbilityForResult`，下列说法正确的有？

- A. 可以获取目标 UIAbility 返回的结果数据
- B. 目标侧通过 `terminateSelfWithResult` 回传 AbilityResult
- C. AbilityResult 中可携带 resultCode 与 want
- D. 只能在同一应用中跨 Ability 使用，绝对不能跨应用

<details><summary>答案与解析</summary>

**答案：ABC**

解析：startAbilityForResult 支持跨应用；D 说法过于绝对，错误。
</details>

**127.** 【多选】下列哪些场景适合把一个复杂应用拆分为多个 UIAbility？

- A. 需要独立在任务／任务列表中呈现的不同业务模块
- B. 需要被其他应用通过 Want 单独拉起的独立功能
- C. 简单的同一页面内的两个 Tab
- D. 希望模块间互相隔离、独立管理生命周期

<details><summary>答案与解析</summary>

**答案：ABD**

解析：同一页内的 Tab 切换用 ArkUI 组件即可，无需拆分为 UIAbility（C 错）。
</details>

**128.** 【多选】关于 `@StorageLink` 与 `@LocalStorageLink`，下列说法正确的有？

- A. 前者绑定 AppStorage，后者绑定 LocalStorage
- B. 两者均实现双向同步
- C. 两者都用于持久化磁盘数据
- D. LocalStorage 的作用域仅限于当前页面／组件树

<details><summary>答案与解析</summary>

**答案：ABD**

解析：二者均为双向绑定；C 错在它们只处理内存态状态，不涉及磁盘持久化。
</details>

**129.** 【多选】关于 `onWindowStageCreate`，下列说法正确的有？

- A. 可用于设置 WindowStage 的主页 `loadContent`
- B. 可在其中订阅 WindowStage 的事件
- C. 对应销毁回调是 `onWindowStageDestroy`
- D. 它是 UIAbility 拥有窗口的起点

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四个描述均符合 UIAbility 窗口回调的职责。
</details>

**130.** 【多选】下列可用于应用跳转（跨应用拉起）的方式有？

- A. 显式 Want（指定 bundleName + abilityName）
- B. 隐式 Want（由 skills 匹配）
- C. 使用 `context.startAbility(want, options)`
- D. 通过 App Linking（应用链接）跳转

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：应用间跳转的常规手段包括：显式 Want（精确定位）、隐式 Want + skills（解耦匹配）、`context.startAbility()` 携带 Want 发起、以及 App Linking 应用链接（通过标准 URL 拉起目标应用或元服务的指定页面）。
</details>

## 4.3 判断题（131–140）

**131.** 【判断】`onPageShow` 属于 UIAbility 的生命周期回调。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：onPageShow / onPageHide / onBackPress 是**页面**（@Entry 组件）的生命周期，不是 UIAbility 的。这是最常考的陷阱题。
</details>

**132.** 【判断】`aboutToAppear` 在创建自定义组件实例之后、`build()` 执行之前调用。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：aboutToAppear 常用于在这一阶段初始化数据或发起一次性请求。
</details>

**133.** 【判断】一个应用中只能存在一个 UIAbility。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：一个应用可以包含多个 UIAbility，各自独立管理生命周期与任务栈。
</details>

**134.** 【判断】singleton 启动模式下，已存在实例时再次启动会新建一个新的 UIAbility 实例。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：singleton 为单实例模式，会复用已有实例并回调 onNewWant；multiton 才会新建。
</details>

**135.** 【判断】multiton 启动模式下，每次调用 startAbility 都会创建一个新的 UIAbility 实例。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：multiton 即多实例模式，每次启动生成新实例。
</details>

**136.** 【判断】`specified` 启动模式需要 AbilityStage 的 `onAcceptWant` 返回不同的 Key 来决定实例复用策略。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：specified 由开发者自行控制 Key，是三种模式中最灵活的一种。
</details>

**137.** 【判断】WindowStage 只在 FA 模型中存在，Stage 模型中不需要窗口概念。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：Stage 模型正是引入了 WindowStage 来管理窗口，Ability 与窗口解耦。
</details>

**138.** 【判断】使用 `startAbilityForResult` 可以获取目标 UIAbility 返回的结果数据。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：目标侧 `terminateSelfWithResult` 回传，发起侧在回调中接收 AbilityResult。
</details>

**139.** 【判断】隐式 Want 可以不指定具体的 abilityName，而由系统根据 action/entities/uri 与 skills 做匹配。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：这正是隐式 Want 的设计目的——解耦调用方与目标。
</details>

**140.** 【判断】通过 `context.eventHub` 可以实现 UIAbility 与其所在页面之间的解耦事件通信。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：EventHub 是 UIAbilityContext 内置的事件中枢，配合 emit/on/off 使用。
</details>

---

# 五、方舟 UI 框架（ArkUI）

## 5.1 单选题（141–162）

**141.** 【单选】ArkUI 声明式开发范式的六大基本组成中，不包括下列哪一项？

- A. 装饰器
- B. 自定义组件
- C. UI 描述
- D. XML 布局文件

<details><summary>答案与解析</summary>

**答案：D**

解析：声明式开发范式由装饰器、自定义组件、UI 描述、系统内置组件、属性方法、事件方法构成；XML 布局是安卓时代的做法。
</details>

**142.** 【单选】Column 容器的主轴方向是？

- A. 水平方向
- B. 垂直方向
- C. 由子组件自身的需求决定
- D. 无固定的主轴

<details><summary>答案与解析</summary>

**答案：B**

解析：Column 主轴为垂直方向（子组件自上而下排列），Row 主轴为水平方向。
</details>

**143.** 【单选】控制 Column 内子组件在主轴（垂直方向）上的对齐方式，应使用的属性是？

- A. `alignItems`
- B. `justifyContent`
- C. `alignSelf`
- D. `alignContent`

<details><summary>答案与解析</summary>

**答案：B**

解析：`justifyContent(FlexAlign.Xxx)` 作用于主轴，`alignItems(XxxAlign)` 作用于交叉轴。
</details>

**144.** 【单选】需要把多个元素层叠放置、后写的盖在上层，应选用哪种容器？

- A. Row
- B. Column
- C. Stack
- D. Flex

<details><summary>答案与解析</summary>

**答案：C**

解析：Stack 为层叠布局容器，配合 alignContent 或 zIndex 控制层级与位置。
</details>

**145.** 【单选】关于 Row / Column 是否可滚动，下列说法正确的是？

- A. Row 与 Column 默认都支持滚动
- B. Row 与 Column 本身不具备滚动能力，需要 Scroll、List 等滚动容器
- C. 只要子组件超出高度就自动滚动
- D. 设置 `height: '100%'` 即可滚动

<details><summary>答案与解析</summary>

**答案：B**

解析：这是经典考点——Row/Column 不可滚动，需外层套 Scroll（或与 List/Grid 搭配）。
</details>

**146.** 【单选】关于 `layoutWeight`，下列说法正确的是？

- A. 在任意容器上都生效
- B. 需要父容器为 Row / Column / Flex 线性容器时才生效，按权重分配主轴剩余空间
- C. 用于控制层叠优先级
- D. 等价于宽度的百分比取值

<details><summary>答案与解析</summary>

**答案：B**

解析：`layoutWeight(n)` 仅在 Row/Column/Flex 容器中生效，占据父容器剩余空间的比例。
</details>

**147.** 【单选】GridRow 与 GridCol 构成的栅格布局中，默认把一行划分为多少列？

- A. 4
- B. 8
- C. 12
- D. 16

<details><summary>答案与解析</summary>

**答案：C**

解析：栅格布局默认 12 列（columns 默认值为 12），GridCol 通过 span 指定占用列数。
</details>

**148.** 【单选】响应式布局的断点体系中，HarmonyOS 通常不包含下列哪个断点？

- A. xs
- B. md
- C. lg
- D. hv

<details><summary>答案与解析</summary>

**答案：D**

解析：断点为 xs、sm、md、lg、xl、xxl 六档（部分场景还会有组合使用），不存在 hv。
</details>

**149.** 【单选】下列哪个组件**不能**包含子组件？

- A. Text
- B. Column
- C. Image
- D. Stack

<details><summary>答案与解析</summary>

**答案：C**

解析：Image 是基础展示组件，不支持子组件；Text 内可写 Span 子组件。
</details>

**150.** 【单选】在 Text 内实现一段文字中的多种字号／颜色混排，应使用？

- A. 多个 Text 横向排列
- B. Text 内嵌套 Span 子组件
- C. RichText
- D. 自定义 Canvas 绘制

<details><summary>答案与解析</summary>

**答案：B**

解析：`Text() { Span('普通').fontSize(16) Span('强调').fontSize(20).fontWeight(FontWeight.Bold) }` 是标准做法。
</details>

**151.** 【单选】TextInput 需要用于输入密码并自动隐藏明文，应设置的属性是？

- A. `type(InputType.Password)`
- B. `password(true)`
- C. `obscure(true)`
- D. `secure(true)`

<details><summary>答案与解析</summary>

**答案：A**

解析：`TextInput({ placeholder }).type(InputType.Password)`；普通文本为 InputType.Normal，电话号码为 InputType.PhoneNumber。
</details>

**152.** 【单选】关于 `router.pushUrl` 与 `router.replaceUrl`，下列说法正确的是？

- A. 两者都会把目标页压栈
- B. `pushUrl` 保留当前页并压栈，`replaceUrl` 替换并销毁当前页
- C. `replaceUrl` 会在栈中保留原页面
- D. 两者行为完全相同

<details><summary>答案与解析</summary>

**答案：B**

解析：pushUrl 支持返回上一页；replaceUrl 后原页面被销毁，`router.back()` 不会再回到该页。
</details>

**153.** 【单选】`router.pushUrl` 的第二个路由模式参数中，表示「目标已在栈顶则复用」的是？

- A. `router.RouterMode.Standard`
- B. `router.RouterMode.Single`
- C. `router.RouterMode.Reuse`
- D. `router.RouterMode.Top`

<details><summary>答案与解析</summary>

**答案：B**

解析：RouterMode.Standard（默认，多实例）与 RouterMode.Single（单实例，命中则复用并回调）两种。
</details>

**154.** 【单选】在「一次开发，多端部署」场景中，官方更推荐的导航方案是？

- A. `router` 页面路由
- B. `Navigation` + `NavPathStack` 组件导航
- C. 直接修改 UIAbility 的 mainElement
- D. 使用 `windowStage.loadContent`

<details><summary>答案与解析</summary>

**答案：B**

解析：Navigation 组件导航在自适应分栏、多端形态切换（平板左右分栏）上能力更强，是官方推荐演进方向。
</details>

**155.** 【单选】下列 API 中，属于属性动画写法的是？

- A. `animateTo({}, () => {})`
- B. `.animation({ duration: 1000, curve: Curve.Ease })`
- C. `.transition(TransitionEffect.OPACITY)`
- D. `animateToImmediately()`

<details><summary>答案与解析</summary>

**答案：B**

解析：属性动画在组件属性链上直接调用 `.animation()`；闭包内的状态变化则配合 `animateTo` 做显式动画。
</details>

**156.** 【单选】需要在点击后弹出一个完全自定义的对话框布局，应使用？

- A. `AlertDialog.show()`
- B. `CustomDialogController`
- C. `promptAction.showToast()`
- D. `bindPopup()`

<details><summary>答案与解析</summary>

**答案：B**

解析：自定义弹窗通过 `@CustomDialog` 装饰的组件 + `CustomDialogController` 控制显隐与样式。
</details>

**157.** 【单选】字体大小推荐使用的单位是？

- A. px
- B. vp
- C. fp
- D. dpi

<details><summary>答案与解析</summary>

**答案：C**

解析：vp（虚拟像素）用于尺寸，`fp` 专用于字体并跟随系统字号缩放设置变化。
</details>

**158.** 【单选】List 组件的子组件必须是？

- A. 任意组件
- B. `ListItem` 或 `ListItemGroup`
- C. `Stack`
- D. `Column`

<details><summary>答案与解析</summary>

**答案：B**

解析：List 仅接受 ListItem / ListItemGroup 作为直接子组件，其余组件需包一层 ListItem。
</details>

**159.** 【单选】下列容器中，专门用于列表子项按需／懒加载渲染的是？

- A. Scroll
- B. Column
- C. List（配合 LazyForEach）
- D. Stack

<details><summary>答案与解析</summary>

**答案：C**

解析：List/Grid/WaterFlow/Swiper 等支持 LazyForEach 实现按需加载与组件回收。
</details>

**160.** 【单选】关于 Tabs 与 TabContent，下列说法正确的是？

- A. 一个 Tabs 可以包含多个 TabContent 作为标签页
- B. Tabs 必须嵌套在 List 中
- C. TabContent 支持通过 barPosition 属性单独控制自身位置
- D. Tabs 不能绑定控制器

<details><summary>答案与解析</summary>

**答案：A**

解析：Tabs 下每个 TabContent 代表一个标签页，通过 tabBar 指定标签样式；控制器TabsController 用于切换。
</details>

**161.** 【单选】希望某个子组件在 Stack 中显示得更靠上层，可调整的属性是？

- A. `opacity`
- B. `zIndex`
- C. `offset`
- D. `visibility`

<details><summary>答案与解析</summary>

**答案：B**

解析：`zIndex(number)` 越大越靠上层；配合 position/offset 可实现悬浮效果。
</details>

**162.** 【单选】关于 `Scroll` 容器，下列说法正确的是？

- A. Scroll 内部只能放一个子组件
- B. Scroll 不能滚动
- C. Scroll 的子组件高度必须小于等于 Scroll 高度
- D. Scroll 只能横向滚动

<details><summary>答案与解析</summary>

**答案：A**

解析：Scroll 为单子组件容器，通常内部只包一个 Column/Row，由内容超出滚动区域产生滚动。
</details>

## 5.2 多选题（163–174）

**163.** 【多选】ArkUI 声明式开发范式的基本组成包括？

- A. 装饰器
- B. 自定义组件与 UI 描述
- C. 系统内置组件、属性方法、事件方法
- D. XML 布局文件

<details><summary>答案与解析</summary>

**答案：ABC**

解析：六大组成：装饰器、自定义组件、UI 描述、内置组件、属性方法、事件方法。无 XML。
</details>

**164.** 【多选】下列属于容器类组件的有？

- A. Row、Column、Stack
- B. Flex、RelativeContainer
- C. List、Grid、Swiper、Scroll
- D. Tabs、Refresh、WaterFlow

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四组均属布局／滚动容器类组件。
</details>

**165.** 【多选】响应式布局的常见断点有？

- A. xs、sm
- B. md、lg
- C. xl、xxl
- D. hd、uhd

<details><summary>答案与解析</summary>

**答案：ABC**

解析：官方断点为 xs/sm/md/lg/xl/xxl 六档；hd/uhd 非此体系。
</details>

**166.** 【多选】`router` 模块常用的 API 包括？

- A. `pushUrl` / `replaceUrl`
- B. `back`
- C. `clear`
- D. `getParams` / `getState`

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：还有 `showAlertBeforeBackPage`（返回前弹确认框）等常用接口。
</details>

**167.** 【多选】ArkUI 支持的动画能力包括？

- A. 属性动画 `.animation()`
- B. 显式动画 `animateTo`
- C. 转场动画 `transition`
- D. 路径动画、关键帧动画

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四类均为 ArkUI 提供的动画实现方式。
</details>

**168.** 【多选】常见的弹窗/浮层实现方式有？

- A. `AlertDialog` / `ActionSheet`
- B. `CustomDialogController` 自定义弹窗
- C. `bindPopup` / `bindMenu` / `bindContextMenu`
- D. `promptAction.showToast` 提示气泡

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四类均属 ArkUI 提供的提示／交互浮层手段。
</details>

**169.** 【多选】关于 Image 组件，下列说法正确的有？

- A. 支持本地资源、网络资源、Rawfile 资源
- B. 网络图片需要申请 `ohos.permission.INTERNET` 权限
- C. 可以包含子组件
- D. 可通过 objectFit 控制内容填充模式

<details><summary>答案与解析</summary>

**答案：ABD**

解析：Image 不支持子组件（C 错），其余描述均正确。
</details>

**170.** 【多选】容器组件通用的尺寸类属性包括？

- A. `width` / `height`
- B. `padding` / `margin`
- C. `borderRadius` / `backgroundColor`
- D. `visibility` / `opacity`

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：A～D 均为组件通用属性。补充说明：`justifyContent` / `alignItems` **不属于**通用属性，它们是 Row / Column / Flex 等线性布局容器专有的布局属性，Stack、List 等容器并不具备。
</details>

**171.** 【多选】关于 Navigation 组件导航，下列说法正确的有？

- A. 由 Navigation（根容器）与 NavDestination（子页）构成
- B. 通过 NavPathStack 管理跳转栈
- C. 支持单栏/分栏自适应，适合多端部署
- D. 只能用于手机竖屏场景

<details><summary>答案与解析</summary>

**答案：ABC**

解析：Navigation 具备多端形态自适应能力，D 错误。
</details>

**172.** 【多选】关于 List 的性能优化，下列说法正确的有？

- A. 大数据集使用 LazyForEach 实现按需加载
- B. 可使用cachedCount设置预加载数量
- C. 合理设置 keyGenerator 保证 diff 精确
- D. 层级嵌套越深越有利于渲染性能

<details><summary>答案与解析</summary>

**答案：ABC**

解析：过度嵌套会增加测量与渲染开销，应尽量减少布局层级（D 错）。
</details>

**173.** 【多选】下列属于 ArkUI 通用事件的有？

- A. `onClick`
- B. `onTouch`
- C. `onAppear` / `onDisAppear`
- D. `onKeyEvent`

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四者均属组件通用事件/通用回调。
</details>

**174.** 【多选】关于 Swiper，下列说法正确的有？

- A. 用于实现轮播／滑动切换
- B. 可设置自动播放 loop、interval、indicator
- C. 常与 Image 搭配做 Banner
- D. 只能横向滑动，不能纵向

<details><summary>答案与解析</summary>

**答案：ABC**

解析：Swiper 支持通过 vertical 属性切换纵／横方向，D 错误。
</details>

## 5.3 判断题（175–184）

**175.** 【判断】Row 与 Column 容器默认支持内容超出时的滚动。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：二者不具备滚动能力，需由 Scroll / List / Grid 等滚动容器承载。
</details>

**176.** 【判断】Image 组件可以像 Column 一样在其中嵌套其他子组件。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：Image 不支持子组件。
</details>

**177.** 【判断】`router.pushUrl` 会把目标页面压入页面栈，用户返回时可回到原页面。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：push 为入栈操作，back 时出栈回到上一页。
</details>

**178.** 【判断】`router.replaceUrl` 会替换并销毁当前页面。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：replace 后原页面不再存在于栈中，返回不再经过它。常用于登录成功后跳转主页。
</details>

**179.** 【判断】无限层级的 Row/Column 嵌套对界面渲染性能没有影响。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：嵌套层级过深会显著增加测量、布局与绘制开销，应尽量扁平化（可用 RelativeContainer / GridRow 优化）。
</details>

**180.** 【判断】相比 `router`，`Navigation` 组件导航在「一次开发，多端部署」场景中更容易实现形态自适应。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：Navigation 支持单双栏自适应与其 Routing 栈管理，是官方推荐的演进方向。
</details>

**181.** 【判断】在 `animateTo` 的闭包中修改被 @State 装饰的变量，相关 UI 变化会以动画形式过渡。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：animateTo 内的状态变更会被纳入该次动画时序，产生平滑过渡效果。
</details>

**182.** 【判断】Column 的主轴为垂直方向，Row 的主轴为水平方向。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：这是线性布局最基本的方向约定。
</details>

**183.** 【判断】Text 组件中可以嵌套 Span 子组件实现富文本混排。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：Text 是少数支持子组件的基础组件之一，Span 用于设置片段级样式。
</details>

**184.** 【判断】字体大小使用 fp 单位，可以在用户调整系统字号时同步响应。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：fp 会随系统字体缩放系数变化，vp 则不会，这是 fp 与 vp 的核心差异。
</details>

---

# 六、网络服务与数据管理

## 6.1 单选题（185–198）

**185.** 【单选】在 HarmonyOS 中发起 HTTP 数据请求，应使用哪个模块？

- A. `@ohos.net.http`
- B. `@ohos.net.socket`
- C. `@ohos.data.preferences`
- D. `@ohos.net.webSocket`

<details><summary>答案与解析</summary>

**答案：A**

解析：`@ohos.net.http`（新版 Kit 化为 `@kit.NetworkKit`）提供 createHttp / HttpRequest / request 等能力。
</details>

**186.** 【单选】使用 HTTP 请求访问网络，需要在 module.json5 中申请哪项权限？

- A. `ohos.permission.GET_NETWORK_INFO`
- B. `ohos.permission.INTERNET`
- C. `ohos.permission.DISTRIBUTED_DATASYNC`
- D. `ohos.permission.READ_MEDIA`

<details><summary>答案与解析</summary>

**答案：B**

解析：`ohos.permission.INTERNET` 是网络访问的必需权限；DISTRIBUTED_DATASYNC 用于分布式数据同步。
</details>

**187.** 【单选】创建 HTTP 请求对象的正确方式是？

- A. `const req = http.HttpRequest()`
- B. `const req = http.createHttp()`
- C. `const req = http.newRequest()`
- D. `const req = http.request()`

<details><summary>答案与解析</summary>

**答案：B**

解析：`createHttp()` 返回 HttpRequest 实例，随后调用 `request(url, options)` 发起请求。
</details>

**188.** 【单选】HttpRequest 对象使用完毕后应当？

- A. 无需处理，系统自动回收
- B. 调用 `destroy()` 销毁
- C. 调用 `close()`
- D. 调用 `cancel()` 即可

<details><summary>答案与解析</summary>

**答案：B**

解析：一个 HttpRequest 对象同一时刻只能处理一个请求，使用结束必须 `request.destroy()` 释放资源。
</details>

**189.** 【单选】请求选项中用于指定 POST / GET 方法的字段是？

- A. `method`
- B. `type`
- C. `verb`
- D. `action`

<details><summary>答案与解析</summary>

**答案：A**

解析：`options.method = http.RequestMethod.POST`，枚举值包括 GET / POST / PUT / DELETE / OPTIONS / HEAD 等。
</details>

**190.** 【单选】POST 提交 JSON 数据时，通常需要在 header 中设置？

- A. `'Content-Type': 'text/html'`
- B. `'Content-Type': 'application/json'`
- C. `'Accept': 'image/png'`
- D. `'Authorization': 'json'`

<details><summary>答案与解析</summary>

**答案：B**

解析：服务端据此识别请求体格式；extraData 传入对应的 JSON 字符串。
</details>

**191.** 【单选】希望 http 模块直接把响应体解析为 JavaScript 对象，应设置？

- A. `expectDataType: http.HttpDataType.OBJECT`
- B. `expectDataType: http.HttpDataType.STRING`
- C. `expectDataType: http.HttpDataType.ARRAY_BUFFER`
- D. `expectDataType: http.HttpDataType.JSON`

<details><summary>答案与解析</summary>

**答案：A**

解析：`HttpDataType` 可选值为 STRING、OBJECT、ARRAY_BUFFER；期望解析成对象时用 OBJECT。
</details>

**192.** 【单选】ArkData 体系中的「用户首选项」指的是？

- A. Preferences
- B. KV Store
- C. RDB Store
- D. DistributedObject

<details><summary>答案与解析</summary>

**答案：A**

解析：Preferences（用户首选项）以键值对形式保存轻量配置数据，数据缓存在内存中、适时落盘。
</details>

**193.** 【单选】关于 Preferences，下列说法**错误**的是？

- A. 适合保存少量的配置类数据，如记住登录状态
- B. 适合保存大量复杂结构的业务数据
- C. 通过 putSync / getSync 读写
- D. 修改后建议调用 flush 持久化

<details><summary>答案与解析</summary>

**答案：B**

解析：Preferences 定位轻量键值存储，不适用于大量或强关系数据，此类场景应选关系型数据库（RDB）。
</details>

**194.** 【单选】Preferences 中把内存修改持久化到磁盘的方法是？

- A. `commit()`
- B. `flush()`
- C. `save()`
- D. `persist()`

<details><summary>答案与解析</summary>

**答案：B**

解析：`preferences.flush()` 将缓存改动写入文件；若不调用，改动可能随内存释放而丢失。
</details>

**195.** 【单选】HarmonyOS 中操作关系型数据库应使用哪个模块？

- A. `@ohos.data.preferences`
- B. `@ohos.data.relationalStore`
- C. `@ohos.data.distributedKVStore`
- D. `@ohos.fileio`

<details><summary>答案与解析</summary>

**答案：B**

解析：relationalStore 提供 SQLite 能力封装：getRdbStore、executeSql、insert、update、delete、query 等。
</details>

**196.** 【单选】relationalStore 中用于承载一行数据的键值容器类型是？

- A. `ContentValues`
- B. `ValuesBucket`
- C. `Bundle`
- D. `Record`

<details><summary>答案与解析</summary>

**答案：B**

解析：ValuesBucket 以 map 形式承载字段与值的映射，用于 insert / update；查询条件用 RdbPredicates 构造。
</details>

**197.** 【单选】关系型数据库查询返回的结果集类型是？

- A. `ResultSet`
- B. `Cursor`
- C. `RecordSet`
- D. `QueryResult`

<details><summary>答案与解析</summary>

**答案：A**

解析：ResultSet 提供 goToFirstRow / goToNextRow / getString(getColumnIndex('name')) 等遍历取值方法，使用完应关闭。
</details>

**198.** 【单选】需要在多设备之间同步键值形式的数据，最合适的 ArkData 能力是？

- A. Preferences
- B. 键值型数据库（KV Store）
- C. 关系型数据库（RDB Store）本地模式
- D. 文件存储

<details><summary>答案与解析</summary>

**答案：B**

解析：分布式键值数据库（KV Store）支持跨设备键值同步，是「自由流转」场景下常用形态。
</details>

## 6.2 多选题（199–204）

**199.** 【多选】ArkData（方舟数据管理）提供的主要能力包括？

- A. 用户首选项 Preferences
- B. 键值型数据库 KV Store
- C. 关系型数据库 RDB Store
- D. 分布式数据对象

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：ArkData 覆盖端侧持久化与分布式同步的一整套数据管理能力。
</details>

**200.** 【多选】构造 `request(url, options)` 时，常用的 options 字段包括？

- A. `method`
- B. `header`
- C. `extraData`
- D. `expectDataType` / `connectTimeout` / `readTimeout`

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：这些字段共同决定请求方式、请求体、期望返回类型及超时控制。
</details>

**201.** 【多选】关于 Preferences 的使用约束，下列说法正确的有？

- A. Key 为 string 类型，要求非空且长度有限制
- B. Value 为 string 时长度存在上限，不宜存超大文本
- C. 建议存储的数据量不要过大（如控制在万级以内）
- D. 不适合高并发、复杂查询与事务场景

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：Preferences 定位于轻量配置读写，四项均为其使用边界。
</details>

**202.** 【多选】关于关系型数据库 RDB，下列说法正确的有？

- A. 通过 `getRdbStore` 获取库句柄并配置 StoreConfig
- B. 支持通过 `executeSql` 执行建表 SQL
- C. 通过 RdbPredicates 构造条件的查询更新
- D. 支持事务

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四项均为 relationalStore 的标准用法。
</details>

**203.** 【多选】HarmonyOS 提供的常见网络通信能力模块包括？

- A. HTTP 数据请求
- B. WebSocket 连接
- C. Socket 连接（TCP / UDP）
- D. 网络状态与连接管理

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四类均属 Network Kit 提供的能力范围。
</details>

**204.** 【多选】数据持久化方案选型时，下列说法合理的有？

- A. 记住登录状态、夜间模式开关 → Preferences
- B. 订单、消息列表等结构复杂且需条件查询的数据 → RDB Store
- C. 多设备间需要同步的小量键值数据 → 分布式 KV Store
- D. 任意场景都可以用 Preferences 替代其他方案

<details><summary>答案与解析</summary>

**答案：ABC**

解析：D 过于绝对，Preferences 不适合大体量与复杂结构数据。
</details>

## 6.3 判断题（205–210）

**205.** 【判断】应用访问网络前必须在 module.json5 中申请 `ohos.permission.INTERNET` 权限。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：缺少该权限会导致网络请求失败。
</details>

**206.** 【判断】一个 HttpRequest 对象可以并发发起多个互不干扰的请求。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：每个 HttpRequest 只能处理一个请求，多个并发请求需各自 createHttp。
</details>

**207.** 【判断】Preferences 适合用于存储大量、结构复杂的业务数据。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：大体量结构化数据应选 RDB Store。
</details>

**208.** 【判断】调用 Preferences 的 putSync 后，为保证落盘应调用 flush。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：putSync 仅更新内存缓存，flush 才写入持久化文件。
</details>

**209.** 【判断】关系型数据库的查询条件可以通过 RdbPredicates 进行构造。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：RdbPredicates 封装 equalTo、like、orderByDesc、limitAs 等常用谓词。
</details>

**210.** 【判断】网络请求属于耗时操作，不应放在主线程执行以免影响 UI 流畅度。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：http 接口本身为异步 Promise 形态不会阻塞 UI 线程，但若在此基础上做大量解析运算，应放入 TaskPool / Worker。
</details>

---

# 七、卡片开发服务（Form Kit）

## 7.1 单选题（211–222）

**211.** 【单选】ArkTS 卡片的「提供方侧」核心组件是？

- A. `UIAbility`
- B. `FormExtensionAbility`
- C. `ServiceExtensionAbility`
- D. `AbilityStage`

<details><summary>答案与解析</summary>

**答案：B**

解析：FormExtensionAbility 负责卡片的创建、更新、事件处理与销毁，本身不提供 UI 页面。
</details>

**212.** 【单选】在 Form Kit 三方关系中，直接负责渲染卡片页面内容的是？

- A. 卡片提供方
- B. 卡片使用方（如桌面）
- C. 卡片渲染服务方
- D. 应用市场

<details><summary>答案与解析</summary>

**答案：C**

解析：Form Kit 涉及卡片提供方、卡片使用方、以及系统侧的卡片管理服务/渲染服务；卡片 UI 由渲染服务载入并展示在使用方（桌面）内。
</details>

**213.** 【单选】用户首次添加一个 ArkTS 卡片时，FormExtensionAbility 会回调哪个方法？

- A. `onUpdateForm`
- B. `onFormEvent`
- C. `onAddForm`
- D. `onRemoveForm`

<details><summary>答案与解析</summary>

**答案：C**

解析：`onAddForm(want)` 在卡片被添加时触发，需返回 `formBindingData.createFormBindingData(obj)` 作为初始数据。
</details>

**214.** 【单选】`onAddForm` 需要返回的数据对象是？

- A. `FormInfo`
- B. `FormBindingData`
- C. `CardResult`
- D. `WantParams`

<details><summary>答案与解析</summary>

**答案：B**

解析：通过 `formBindingData.createFormBindingData({...})` 构造并返回供卡片页面渲染的数据。
</details>

**215.** 【单选】`onFormEvent` 主要用于处理？

- A. 卡片定时更新
- B. 卡片页面通过 postCardAction 发送的 message 事件
- C. 卡片的删除请求
- D. 应用安装事件

<details><summary>答案与解析</summary>

**答案：B**

解析：卡片页面 `postCardAction({ action: 'message', params, formId })` 触发提供方的 onFormEvent。
</details>

**216.** 【单选】ArkTS 卡片的 UI 语法声明位于哪个配置文件中？

- A. `app.json5`
- B. `module.json5` 的 abilities 中
- C. `form_config.json`（由 profile 资源引用）的 uiSyntax 字段
- D. `oh-package.json5`

<details><summary>答案与解析</summary>

**答案：C**

解析：`form_config.json` 中的 `uiSyntax: "arkts"` 声明卡片采用 ArkTS 卡片语法。
</details>

**217.** 【单选】在 module.json5 中注册 FormExtensionAbility 时，type 字段应填写？

- A. `service`
- B. `form`
- C. `widget`
- D. `card`

<details><summary>答案与解析</summary>

**答案：B**

解析：`"extensionAbilities": [{ "type": "form", "metadata": [{ "name": "ohos.extension.form", "resource": "$profile:form_config" }] }]`。
</details>

**218.** 【单选】卡片页面中获取自身的 formId，推荐做法是？

- A. 通过网络请求获取
- B. 通过 `@LocalStorageProp('formId')` 从卡片页面 LocalStorage 中读取
- C. 读取全局变量
- D. 读取 build-profile.json5

<details><summary>答案与解析</summary>

**答案：B**

解析：卡片页面框架会把 formId 写入页面 LocalStorage，使用 `@LocalStorageProp('formId')` 即可取得。
</details>

**219.** 【单选】卡片页面需要跳转到提供方应用的指定页面，应调用？

- A. `router.pushUrl`
- B. `postCardAction({ action: 'router' })`
- C. `startAbility`
- D. `Navigation`

<details><summary>答案与解析</summary>

**答案：B**

解析：卡片运行环境受限，不支持页面路由跳转，统一通过 postCardAction 的 router / message / call 三种 action 与提供方交互。
</details>

**220.** 【单选】`form_config.json` 中用于控制「卡片是否能周期性刷新」的字段是？

- A. `updateEnabled`
- B. `updateDuration`
- C. `scheduledUpdateTime`
- D. `isDefault`

<details><summary>答案与解析</summary>

**答案：A**

解析：`updateEnabled` 为 false 时不支持周期性更新；updateDuration 定间隔刷新（单位 30 分钟），scheduledUpdateTime 定点刷新。
</details>

**221.** 【单选】提供方主动刷新指定卡片的数据，应调用？

- A. `formProvider.updateForm(formId, bindingData)`
- B. `FormExtensionAbility.onUpdateForm`
- C. `formBindingData.refresh()`
- D. `context.refreshCard()`

<details><summary>答案与解析</summary>

**答案：A**

解析：`formProvider.updateForm(formId, data)` 由提供方主动推送最新数据给指定 formId 卡片。
</details>

**222.** 【单选】卡片支持多种尺寸时的标准规格中，**不包含**下列哪一项？

- A. 2×2（小尺寸）
- B. 2×4（中尺寸）
- C. 4×4（大尺寸）
- D. 3×5（超大）

<details><summary>答案与解析</summary>

**答案：D**

解析：常见规格为 1×2（微）、2×2（小）、2×4（中）、4×4（大），不存在 3×5 这一档。
</details>

## 7.2 多选题（223–228）

**223.** 【多选】FormExtensionAbility 的常用生命周期／事件回调包括？

- A. `onAddForm`
- B. `onCastToNormalForm`
- C. `onUpdateForm` / `onFormEvent`
- D. `onRemoveForm` / `onAcquireFormState`

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：四项均为 Form Kit 定义的标准回调。
</details>

**224.** 【多选】卡片页面 `postCardAction` 支持的 action 类型包括？

- A. `message`
- B. `router`
- C. `call`
- D. `update`

<details><summary>答案与解析</summary>

**答案：ABC**

解析：message（触发 onFormEvent）、router（拉起应用页面）、call（调用提供方指定 UIAbility），无 update 类型。
</details>

**225.** 【多选】`form_config.json` 中常见的配置字段包括？

- A. `name` / `description` / `src`
- B. `uiSyntax` / `window`
- C. `isDefault` / `supportDimensions` / `defaultDimension`
- D. `updateEnabled` / `updateDuration` / `scheduledUpdateTime`

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：这些字段分别描述卡片名称、页面路径、预览尺寸与更新策略。
</details>

**226.** 【多选】关于 ArkTS 卡片的能力限制，下列说法正确的有？

- A. 不支持所有 ArkUI 组件，仅支持受限组件集合
- B. 不支持直接进行页面路由跳转
- C. 不支持复杂属性动画与自定义弹窗
- D. 与提供方的数据交互须通过既定机制（postCardAction、formProvider 等）

<details><summary>答案与解析</summary>

**答案：ABCD**

解析：卡片运行在受限沙箱环境中，组件、动效、跳转能力均受约束以保证性能与安全。
</details>

**227.** 【多选】关于卡片更新方式，下列说法正确的有？

- A. 可配置 `updateDuration` 实现定时更新
- B. 可配置 `scheduledUpdateTime` 实现定点更新
- C. 提供方调用 `formProvider.updateForm` 主动更新
- D. 卡片页面可自行访问远程数据库刷新

<details><summary>答案与解析</summary>

**答案：ABC**

解析：卡片页面不具备直接访问网络与数据库的能力，需经由提供方完成数据获取（D 错）。
</details>

**228.** 【多选】卡片 form_config.json 的 window 配置中可以声明的属性有？

- A. `designWidth`
- B. `autoDesignWidth`
- C. `colorMode`
- D. `backgroundColor`

<details><summary>答案与解析</summary>

**答案：AB**

解析：`window` 对象下主要使用 `designWidth`（设计宽度基准）与 `autoDesignWidth`（是否自动适配）。其余字段如 name、description、src、uiSyntax、colorMode、isDefault、supportDimensions、updateEnabled 等位于 profile 的顶层层级，不属于 window 内部。
</details>

## 7.3 判断题（229–234）

**229.** 【判断】FormExtensionAbility 本身继承自 ExtensionAbility，不负责直接渲染 UI 页面。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：卡片 UI 由独立的卡片渲染服务加载 ArkTS 卡片页面完成，提供方只负责数据与事件。
</details>

**230.** 【判断】ArkTS 卡片可以使用 ArkUI 的全部组件与全部能力。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：受运行环境限制，仅支持受限的组件与动效集合。
</details>

**231.** 【判断】卡片页面可以通过 `router.pushUrl` 实现应用内页面跳转。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：卡片不支持页面路由，必须用 `postCardAction({ action: 'router' })` 交由提供方拉起页面。
</details>

**232.** 【判断】`onAddForm` 必须返回 FormBindingData 数据，否则卡片添加可能失败。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：onAddForm 的返回值作为卡片初始渲染数据，是接口约定的返回内容。
</details>

**233.** 【判断】卡片只能展示在桌面上，无法出现在负一屏、服务中心等其他位置。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：B（错误）**

解析：卡片可出现在桌面、负一屏、服务中心等多种宿主位置。
</details>

**234.** 【判断】提供方通过 `formProvider.updateForm` 可以主动向指定 formId 的卡片推送最新数据。

- A. 正确
- B. 错误

<details><summary>答案与解析</summary>

**答案：A（正确）**

解析：这是最灵活的一种刷新方式，常用于后台任务完成后的即时刷新。
</details>

---

# 附录 · 答题卡速查表

> 供批改／自查使用。题目完整解析见各章节。

| 题号 | 题型 | 答案 | 题号 | 题型 | 答案 | 题号 | 题型 | 答案 |
| --- | :---: | :---: | ---: | :---: | :---: | ---: | :---: | :---: |
| 1 | 单选 | B | 2 | 单选 | A | 3 | 单选 | B |
| 4 | 单选 | D | 5 | 单选 | B | 6 | 单选 | D |
| 7 | 单选 | A | 8 | 单选 | B | 9 | 单选 | A |
| 10 | 单选 | B | 11 | 单选 | A | 12 | 单选 | B |
| 13 | 多选 | ABC | 14 | 多选 | ABCD | 15 | 多选 | ABC |
| 16 | 多选 | ABC | 17 | 多选 | ABCD | 18 | 多选 | ABD |
| 19 | 判断 | A | 20 | 判断 | B | 21 | 判断 | A |
| 22 | 判断 | B | 23 | 判断 | B | 24 | 判断 | A |
| 25 | 判断 | A | 26 | 判断 | A | 27 | 单选 | B |
| 28 | 单选 | B | 29 | 单选 | A | 30 | 单选 | B |
| 31 | 单选 | D | 32 | 单选 | B | 33 | 单选 | B |
| 34 | 单选 | B | 35 | 单选 | A | 36 | 单选 | B |
| 37 | 单选 | B | 38 | 单选 | B | 39 | 多选 | ABCD |
| 40 | 多选 | ABC | 41 | 多选 | ABCD | 42 | 多选 | ABCD |
| 43 | 多选 | ABCD | 44 | 多选 | ABCD | 45 | 判断 | A |
| 46 | 判断 | A | 47 | 判断 | B | 48 | 判断 | B |
| 49 | 判断 | A | 50 | 判断 | A | 51 | 判断 | A |
| 52 | 判断 | A | 53 | 单选 | C | 54 | 单选 | C |
| 55 | 单选 | B | 56 | 单选 | B | 57 | 单选 | A |
| 58 | 单选 | B | 59 | 单选 | B | 60 | 单选 | B |
| 61 | 单选 | A | 62 | 单选 | A | 63 | 单选 | B |
| 64 | 单选 | A | 65 | 单选 | B | 66 | 单选 | B |
| 67 | 单选 | B | 68 | 单选 | D | 69 | 单选 | B |
| 70 | 单选 | B | 71 | 单选 | B | 72 | 单选 | B |
| 73 | 单选 | B | 74 | 单选 | B | 75 | 多选 | ABCD |
| 76 | 多选 | ABCD | 77 | 多选 | ABCD | 78 | 多选 | ABCD |
| 79 | 多选 | ABCD | 80 | 多选 | ABCD | 81 | 多选 | AB |
| 82 | 多选 | ABCD | 83 | 多选 | ABD | 84 | 多选 | ABCD |
| 85 | 多选 | ABCD | 86 | 多选 | ABC | 87 | 判断 | B |
| 88 | 判断 | A | 89 | 判断 | A | 90 | 判断 | B |
| 91 | 判断 | B | 92 | 判断 | A | 93 | 判断 | B |
| 94 | 判断 | A | 95 | 判断 | A | 96 | 判断 | B |
| 97 | 单选 | B | 98 | 单选 | C | 99 | 单选 | A |
| 100 | 单选 | B | 101 | 单选 | A | 102 | 单选 | B |
| 103 | 单选 | B | 104 | 单选 | B | 105 | 单选 | B |
| 106 | 单选 | A | 107 | 单选 | B | 108 | 单选 | B |
| 109 | 单选 | A | 110 | 单选 | B | 111 | 单选 | B |
| 112 | 单选 | B | 113 | 单选 | D | 114 | 单选 | A |
| 115 | 单选 | B | 116 | 单选 | B | 117 | 单选 | A |
| 118 | 单选 | B | 119 | 多选 | ABCD | 120 | 多选 | ABC |
| 121 | 多选 | ABCD | 122 | 多选 | ABCD | 123 | 多选 | ABCD |
| 124 | 多选 | ABC | 125 | 多选 | ABC | 126 | 多选 | ABC |
| 127 | 多选 | ABD | 128 | 多选 | ABD | 129 | 多选 | ABCD |
| 130 | 多选 | ABCD | 131 | 判断 | B | 132 | 判断 | A |
| 133 | 判断 | B | 134 | 判断 | B | 135 | 判断 | A |
| 136 | 判断 | A | 137 | 判断 | B | 138 | 判断 | A |
| 139 | 判断 | A | 140 | 判断 | A | 141 | 单选 | D |
| 142 | 单选 | B | 143 | 单选 | B | 144 | 单选 | C |
| 145 | 单选 | B | 146 | 单选 | B | 147 | 单选 | C |
| 148 | 单选 | D | 149 | 单选 | C | 150 | 单选 | B |
| 151 | 单选 | A | 152 | 单选 | B | 153 | 单选 | B |
| 154 | 单选 | B | 155 | 单选 | B | 156 | 单选 | B |
| 157 | 单选 | C | 158 | 单选 | B | 159 | 单选 | C |
| 160 | 单选 | A | 161 | 单选 | B | 162 | 单选 | A |
| 163 | 多选 | ABC | 164 | 多选 | ABCD | 165 | 多选 | ABC |
| 166 | 多选 | ABCD | 167 | 多选 | ABCD | 168 | 多选 | ABCD |
| 169 | 多选 | ABD | 170 | 多选 | ABCD | 171 | 多选 | ABC |
| 172 | 多选 | ABC | 173 | 多选 | ABCD | 174 | 多选 | ABC |
| 175 | 判断 | B | 176 | 判断 | B | 177 | 判断 | A |
| 178 | 判断 | A | 179 | 判断 | B | 180 | 判断 | A |
| 181 | 判断 | A | 182 | 判断 | A | 183 | 判断 | A |
| 184 | 判断 | A | 185 | 单选 | A | 186 | 单选 | B |
| 187 | 单选 | B | 188 | 单选 | B | 189 | 单选 | A |
| 190 | 单选 | B | 191 | 单选 | A | 192 | 单选 | A |
| 193 | 单选 | B | 194 | 单选 | B | 195 | 单选 | B |
| 196 | 单选 | B | 197 | 单选 | A | 198 | 单选 | B |
| 199 | 多选 | ABCD | 200 | 多选 | ABCD | 201 | 多选 | ABCD |
| 202 | 多选 | ABCD | 203 | 多选 | ABCD | 204 | 多选 | ABC |
| 205 | 判断 | A | 206 | 判断 | B | 207 | 判断 | B |
| 208 | 判断 | A | 209 | 判断 | A | 210 | 判断 | A |
| 211 | 单选 | B | 212 | 单选 | C | 213 | 单选 | C |
| 214 | 单选 | B | 215 | 单选 | B | 216 | 单选 | C |
| 217 | 单选 | B | 218 | 单选 | B | 219 | 单选 | B |
| 220 | 单选 | A | 221 | 单选 | A | 222 | 单选 | D |
| 223 | 多选 | ABCD | 224 | 多选 | ABC | 225 | 多选 | ABCD |
| 226 | 多选 | ABCD | 227 | 多选 | ABC | 228 | 多选 | AB |
| 229 | 判断 | A | 230 | 判断 | B | 231 | 判断 | B |
| 232 | 判断 | A | 233 | 判断 | B | 234 | 判断 | A |

---

## 题型统计

| 题型 | 题号区间 | 题量 | 建议备考权重 |
| --- | :---: | ---: | ---: |
| 单选题 | 散布各章 | 116 | 建议按每题 1 分计 |
| 多选题 | 散布各章 | 60 | 建议按每题 2 分计（漏选通常给部分分） |
| 判断题 | 散布各章 | 58 | 建议按每题 1 分计 |
| **合计** | — | **234** | — |

**分章明细**

| 章节 | 单选 | 多选 | 判断 | 小计 |
| --- | :---: | :---: | :---: | :---: |
| 一、HarmonyOS 介绍 | 12 | 6 | 8 | 26 |
| 二、应用开发入门 | 12 | 6 | 8 | 26 |
| 三、方舟编程语言（ArkTS） | 22 | 12 | 10 | 44 |
| 四、程序框架服务（Ability Kit） | 22 | 12 | 10 | 44 |
| 五、方舟 UI 框架（ArkUI） | 22 | 12 | 10 | 44 |
| 六、网络服务与数据管理 | 14 | 6 | 6 | 26 |
| 七、卡片开发服务（Form Kit） | 12 | 6 | 6 | 24 |
| **合计** | **116** | **60** | **58** | **234** |

## 高频陷阱清单（最后 5 分钟必看）

1. **`onPageShow` / `onPageHide` / `onBackPress` 是页面生命周期**，不是 UIAbility 生命周期；`aboutToAppear` / `aboutToDisappear` 是自定义组件生命周期。
2. **`app.json5` vs `module.json5`**：bundleName / 版本号在前，abilities / deviceTypes / requestPermissions 在后。
3. **Row / Column 不可滚动**，滚动要用 Scroll / List / Grid。
4. **Image 不支持子组件**，Text 支持 Span 子组件。
5. **`router.pushUrl` 压栈保留当前页，`replaceUrl` 替换并销毁当前页**。
6. **@Prop 单向、@Link 双向（`$` 传引用）、@Provide/@Consume 跨层级双向**。
7. **ForEach 的 keyGenerator 必须唯一稳定**，别用 index 处理会增删的列表。
8. **TaskPool 短任务 + `@Concurrent`；Worker 长驻任务、有数量上限**。
9. **Preferences 轻量配置 + `flush()` 落盘；RDB 用 ValuesBucket + RdbPredicates**。
10. **卡片不支持 `router.pushUrl`**，只能用 `postCardAction` 的 message / router / call。

