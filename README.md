# CRM App

基于 uni-app 开发的跨平台 CRM 应用。

## 技术栈

- uni-app (Vue 3)
- Vite
- uni-ui

## 项目结构

```
crm-app/
├── api/                     # API 接口
├── components/              # 自定义组件
├── pages/                   # 页面文件
│   ├── login/               # 登录页面
│   ├── register/            # 注册页面
│   ├── forget-password/     # 忘记密码
│   ├── home/                # 首页
│   ├── profile/             # 个人中心
│   └── index.js             # 页面入口
├── packageA/                # 工单分包
├── packageB/                # 设置分包
├── store/                   # 状态管理
├── static/                  # 静态资源
├── utils/                   # 工具函数
├── uni_modules/             # uni-app 组件库
├── App.vue                  # 应用入口
├── main.js                  # 主入口文件
├── manifest.json            # 应用配置
├── pages.json               # 页面配置
└── vite.config.js           # Vite 配置
```

## 功能模块

- **认证系统** - 登录、注册、忘记密码
- **首页导航** - 应用入口
- **工单管理** - 保内、保外工单（分包 A）
- **个人中心** - 用户信息
- **设置功能** - 基本设置、密码修改（分包 B）

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发运行
pnpm dev:mp-weixin

# 构建发布
pnpm build:mp-weixin
```
