
## Getting started

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 本地开发 启动项目
npm run dev

```

This will automatically open http://localhost:9527

## Build

```bash
# 打包正式环境
npm run build:prod

# 打包预发布环境
npm run build:stage
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

## 更换默认主题

``````
src/styles/element-variables.scss

$--color-primary: #000000; // 更换颜色值为期望的值即可
``````

## 更换 Sidebar Logo 默认值

``````
src\settings.js

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false,
``````

## 更换浏览器标题显示名称

``````
src\settings.js

  title: 'Vue Element Admin',
``````

## 更换错误日志组件显示

``````
src\settings.js

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  // errorLog: 'production'
  errorLog: 'development'
``````

## 更换菜单栏颜色

``````
src\styles\variables.scss

// sidebar
$menuText:#bfcbd9; // 菜单文本颜色
$menuActiveText:#409EFF; // 菜单激活颜色
$subMenuActiveText:#f4f4f5; // https://github.com/ElemeFE/element/issues/12951 // 子菜单激活颜色

//$menuBg:#304156; // 菜单背景
//$menuHover:#263445; // 菜单鼠标悬停背景

$menuBg: #000000; // 菜单背景
$menuHover: #cd2a02; // 菜单鼠标悬停背景

//$subMenuBg:#1f2d3d; // 子菜单背景
//$subMenuHover:#001528; // 子菜单鼠标悬停背景

$subMenuBg: #000000; // 子菜单背景
$subMenuHover: #e06201; // 子菜单鼠标悬停背景

//$sideBarWidth: 210px; // 菜单栏宽度

$sideBarWidth: 300px; // 菜单栏宽度

``````


