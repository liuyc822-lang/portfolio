# CLAUDE.md

## 回复规则

- 使用中文回复
- 简洁高效，不要多余解释
- 直接给出解决方案和代码，跳过原理讲解
- 修改代码时只展示改动部分，不要输出完整文件
- 不要重复我的问题
- **严格只修改我指定的部分**：如果我要求修改某个项目页面（如 Project 3），只动该项目对应的 openProjectN() 函数和相关代码，不要触碰其他项目、全局样式、导航、画廊、Hero 区或任何未提及的部分
- 修改前先确认影响范围，如果改动可能影响其他部分，先告知我再动手

## 项目概述

Jasmine Liu 的个人设计作品集网站，单页应用（SPA），所有内容在一个 index.html 文件中。

## 技术栈

- 纯 HTML / CSS / JavaScript（无框架、无构建工具）
- GSAP 3.12 + ScrollTrigger（动画和滚动驱动效果）
- Lenis（平滑滚动）
- Google Fonts：Funnel Display、Michroma、Inter、Cormorant Garamond
- 无包管理器，通过 CDN 引入外部库

## 项目结构

```
index.html         — 主文件（HTML + CSS + JS 全部内联，约2060行）
portfolio.js       — 部分 JS 逻辑（光标、Lenis、Hero动画）
patch_projects.py  — Python脚本，批量更新 Project 2-7 详情页样式
project1/          — 项目1素材（图片、视频）
project2/          — 项目2素材
project3/ ~ project6/  — 其他项目素材
```

## 关键架构

- **导航**：固定顶部 nav，含锚点跳转
- **Hero 区**：字符拆分动画（splitTextToChars），GSAP stagger 进场
- **画廊**：横向滚动画廊（GSAP ScrollTrigger pin + scrub），磁性悬浮效果
- **项目详情**：点击画廊项目 → 打开全屏 overlay（#project-detail），通过 openProjectN() 函数动态注入 innerHTML
- **自定义光标**：外圈平滑跟随 + 内点即时跟随
- **联系区**：滚动触发的渐入动画
- **Flipbook**：项目详情内的翻页图片查看器

## 样式约定

- 主背景色：#f5f5f0（米白）
- 主文字色：#1a1a1a
- 标签类：.p1-lbl（Georgia, 0.68rem, 大写, letter-spacing 0.36em）
- 正文类：.p1-txt（系统字体, clamp(0.78rem, 0.95vw, 0.9rem)）
- 图片边框类：.p1-fr（1.5px solid #1a1a1a, border-radius 8px）
- 项目详情页 CSS 类以 p1- 前缀命名

## 调试注意事项

- 所有 JS 内联在 index.html 的 <script> 标签中，部分代码在 setTimeout 中执行
- Lenis 初始化有重试机制（最多20次，间隔100ms）
- 项目详情通过 innerHTML 动态注入，修改时注意模板字符串中的反引号
- patch_projects.py 通过字符串查找替换 innerHTML，修改函数签名会导致脚本失效
- Flipbook 依赖固定 DOM ID：#flipbook-image, #prev-btn, #next-btn, #page-counter

## 常用操作

- 直接用浏览器打开 index.html 预览
- 修改项目详情样式：编辑 patch_projects.py 后运行 python3 patch_projects.py
- 添加新项目：新增 openProjectN() 函数 + 画廊入口
