---
title: 毛玻璃效果的三次返工
date: 2026-10-22
tags: [CSS, 设计, 前端]
summary: 同一个 `backdrop-filter: blur()`，写了三遍才做出"玻璃"的感觉。记录踩过的三个坑：被父元素背景盖住、模糊半径和透明度的配比、以及深色模式下的对比度。
---

玻璃拟态（glassmorphism）看起来简单：半透明背景 + 模糊。真做起来，我返工了三次。

## 第一次：完全没效果

第一版是这样写的：

```css
.card {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
}
```

结果卡片就是一块半透明白色，**没有任何磨砂感**。

原因不在 `backdrop-filter`，而在它背后什么都没有——背景是纯色 `#f8f8f8`，模糊一块纯色等于没模糊。

玻璃需要背后有东西可模糊。我加了三层色斑：

```css
body::before {
  content: "";
  position: fixed;
  inset: -20%;
  z-index: -2;
  background:
    radial-gradient(closest-side at 20% 25%, rgba(110, 130, 255, 0.5), transparent 70%),
    radial-gradient(closest-side at 80% 20%, rgba(190, 110, 255, 0.4), transparent 70%),
    radial-gradient(closest-side at 60% 80%, rgba(90, 200, 230, 0.4), transparent 70%);
  filter: blur(30px);
}
```

## 第二次：色斑看不见

加完色斑，画面还是一片淡色。查了半天，问题出在 `body` 自己身上：

```css
body {
  background: linear-gradient(180deg, #f4f7fe, #e6ebf9);  /* ← 凶手 */
}
```

`body::before` 设了 `z-index: -2`，按层叠顺序它画在 `body` 的**背景之后**。而 body 的背景是不透明的渐变，正好把色斑整个盖住。

改法只有一行：

```css
body { background: transparent; }
html { background: #eff3fc; }
```

让 html 承担底色，body 透明，色斑就透出来了。

> 记一条：**负 z-index 的伪元素，会被父元素自己的背景盖住**。这不是 bug，是层叠顺序。

## 第三次：像塑料，不像玻璃

色斑能看见了，但卡片还是一块"糊掉的白色塑料"。差别在三个参数：

| 参数 | 塑料感 | 玻璃感 |
|---|---|---|
| 背景透明度 | `0.85` 太实 | `0.42 ~ 0.58` |
| 模糊半径 | `8px` 太轻 | `20 ~ 30px` |
| 饱和度 | 不设 | `saturate(180%)` |

关键是最后一项。`backdrop-filter` 只做模糊的话，背后的颜色会变得灰扑扑；补一个 `saturate()` 把颜色拉回来，才有"透过玻璃看东西"的质感。

```css
.glass {
  background: rgba(255, 255, 255, 0.52);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.7);   /* 高光边 */
  box-shadow: 0 10px 34px rgba(38, 48, 84, 0.1);
}
```

那条 1px 的白色半透明边框很重要——它模拟玻璃边缘的反光，没有它，卡片会显得像一张纸。

## 深色模式要重算，不是反色

浅色的 `rgba(255,255,255,0.52)` 直接换成 `rgba(0,0,0,0.52)`，会得到一块死黑。

深色下玻璃的配方是**"深色底 + 更低的透明度 + 更弱的边"**：

```css
[data-theme="dark"] .glass {
  background: rgba(22, 26, 38, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 34px rgba(0, 0, 0, 0.45);
}
```

底色不能纯黑（`#000`），带一点蓝紫更接近夜晚的观感；边框不能没有，否则面板会糊在背景里分不清边界。

## 性能：别滥用

`backdrop-filter` 是合成层操作，成本不低。我的经验：

- 一屏内控制在 **10 个以内**的模糊元素
- 不要给滚动容器加，滚动时会持续重绘
- 移动端把半径降到 `12 ~ 16px`，肉眼差别不大，帧率差别明显

```css
@media (max-width: 760px) {
  .glass { backdrop-filter: blur(14px) saturate(160%); }
}
```

## 最后的效果

现在的文章页：背景是模糊过的插画，正文放在一块半透明面板里，目录是一列更小的胶囊。层次是这么分的：

1. 最远：插画 + 色斑（`z-index: -3 ~ -2`）
2. 中间：半透明蒙版，负责压暗和统一色调
3. 最近：玻璃面板，`blur(26px)` + 白色高光边

三层叠加才有纵深感。单独一层玻璃，放在纯色背景上，永远做不出效果——这是我返工三次才真正记住的事。
