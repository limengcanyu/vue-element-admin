
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

## 更换登录页面背景颜色

``````
src\views\login\index.vue

``````

## 更换页签背景

``````
src\layout\components\TagsView\index.vue

.tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #000000; // 激活页签背景
        color: #fff;
        border-color: #000000; // 激活页签边界背景
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

``````

## 权限

src\router\index.js

前端路由总表，包含所有路由定义

src\permission.js

负责项目路由跳转

src\store\modules\permission.js

根据后台获取的用户路由生成前端用户路由

src\store\modules\user.js

用户相关操作

src\api\user.js

mock获取用户数据

src\api\role.js

mock获取用户角色

## 切换mock模式到后端调用

.env.development

VUE_APP_BASE_API = 'http://localhost:8080'

src\main.js

注释以下内容

// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

mock\index.js

注释以下内容

// import user from './user'
// import role from './role'
// import article from './article'
// import search from './remote-search'

const mocks = [
  // ...user,
  // ...role,
  // ...article,
  // ...search
]

