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
├── api/                     # API 接口
│   ├── main/               # 主包API
│   └── subpackages/        # 分包API
├── components/              # 自定义组件
│   ├── main/               # 主包组件
│   └── subpackages/        # 分包组件
├── pages/                   # 页面文件
│   ├── main/               # 主包页面
│   │   ├── auth/           # 认证页面
│   │   ├── home/           # 首页
│   │   └── profile/        # 个人中心
│   └── subpackages/        # 分包页面
│       ├── order/          # 工单分包
│       └── settings/       # 设置分包
├── store/                   # 状态管理
├── static/                  # 静态资源
├── utils/                   # 工具函数
│   ├── main/               # 主包工具
│   └── subpackages/        # 分包工具
├── uni_modules/             # uni-app 组件库
├── App.vue                  # 应用入口
├── main.js                  # 主入口文件
├── manifest.json            # 应用配置
├── pages.json               # 页面配置
└── vite.config.js           # Vite 配置
```

## 分包说明

项目采用标准分包加载策略，提高应用启动速度和代码维护性：

### 主包 (pages/main/)

- **认证页面** (`pages/main/auth/`) - 登录、注册、忘记密码
- **首页** (`pages/main/home/`) - 应用导航入口
- **个人中心** (`pages/main/profile/`) - 用户信息管理

### 工单分包 (pages/subpackages/order/)

- **保内工单** - 列表、新增、详情、编辑
- **保外工单** - 列表、新增、详情、编辑

### 设置分包 (pages/subpackages/settings/)

- **基本设置** - 用户信息修改
- **密码设置** - 密码修改功能

### 分包优势

1. **代码分离** - 主包和分包代码完全分离，便于维护
2. **按需加载** - 分包按需加载，减少主包体积
3. **团队协作** - 不同团队可以独立开发不同的分包
4. **性能优化** - 分包预加载策略优化用户体验
5. **扩展性强** - 新增功能可以独立分包，不影响现有代码

### 预加载配置

- 当用户进入"首页"时，自动预加载工单分包
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

- 用户认证（登录、注册、忘记密码）
- 首页导航
- 工单管理（保内、保外工单）
- 个人中心
- 设置功能

## 配置说明

微信小程序 AppID 已配置在 `manifest.json` 中。
