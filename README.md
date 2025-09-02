# crm-app

基于 uni-app 开发的跨平台 CRM APP。

## 技术栈

- uni-app (Vue 3)
- Vite
- pnpm
- uni-ui

## 项目结构

```
crm-app/
├── api/                 # API 接口
├── components/          # 自定义组件
├── pages/               # 页面文件
│   ├── index/           # 首页 (主包)
│   ├── login/           # 登录页 (主包)
│   ├── my/              # 我的页面 (主包)
│   └── settings/        # 设置页面 (分包)
├── store/               # 状态管理
├── static/              # 静态资源
├── utils/               # 工具函数
├── uni_modules/         # uni-app 组件库
├── App.vue              # 应用入口
├── main.js              # 主入口文件
├── manifest.json        # 应用配置
├── pages.json           # 页面配置
└── vite.config.js       # Vite 配置
```

## 分包说明

项目采用分包加载策略，提高应用启动速度：

### 主包 (pages/)

- 登录页面 (`pages/login/`)
- 首页 (`pages/index/`)
- 我的页面 (`pages/my/`)

### 设置分包 (pages/settings/)

- 基本设置 (`pages/settings/basic/`)
- 更改密码 (`pages/settings/password/`)

### 预加载配置

- 当用户进入"我的"页面时，自动预加载设置分包
- 提升页面跳转速度和用户体验

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发运行

```bash
# 微信小程序
pnpm dev:mp-weixin

# H5
pnpm dev:h5
```

### 构建发布

```bash
# 微信小程序
pnpm build:mp-weixin

# H5
pnpm build:h5
```

## 功能模块

- 用户登录
- 首页功能
- 个人中心
- 设置功能

## 配置说明

微信小程序 AppID 已配置在 `manifest.json` 中。
