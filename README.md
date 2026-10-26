# MERN-Stack-Job-Seeking-Web-Application-web

Git 地址：git@github.com:rick-peng-li/MERN-Stack-Job-Seeking-Web-Application-web.git

JobZee 是一个基于 MERN 技术栈的全栈求职招聘平台。平台将用户分为「求职者（Job Seeker）」与「雇主（Employer）」两种角色：雇主可以发布、编辑、删除职位并查看收到的求职申请；求职者可以浏览职位、查看职位详情、上传简历投递申请并管理自己的申请记录。

## 技术与架构

- **前端 client/**：React 19 + Vite 6（SWC 加速）、React Router 7（createBrowserRouter 数据路由）、Ant Design 5 组件库、Axios、dayjs
- **后端 server/**：Node.js 20+、Express 5（ES Module）、Mongoose 8、jsonwebtoken、bcryptjs、express-fileupload
- **数据库**：MongoDB（Docker 镜像内置，开箱即用）
- **认证**：JWT + HttpOnly Cookie，路由守卫（前端 ProtectedRoute / 后端 protect 中间件）双重校验
- **文件存储**：简历图片优先上传 Cloudinary；未配置 Cloudinary 时自动降级为本地磁盘存储（`/uploads` 静态目录）

前后端分离架构：开发模式下前端 Vite Dev Server（5173 端口）通过代理将 `/api`、`/uploads` 转发到后端（4000 端口）；生产/Docker 模式下由后端统一托管前端构建产物，同源对外提供服务。

## 目录结构

```
├── client/                     # 前端应用
│   ├── public/                 # 静态资源（Logo、Banner 等）
│   └── src/
│       ├── api/                # axios 实例与接口服务（authApi / jobApi / applicationApi）
│       ├── components/         # 通用组件
│       │   ├── home/           # 首页区块（Hero、流程、分类、公司）
│       │   ├── job/            # 职位卡片
│       │   ├── layout/         # 导航栏、页脚、整体布局
│       │   ├── GuestRoute.jsx  # 已登录访问登录/注册页时重定向
│       │   └── ProtectedRoute.jsx  # 未登录访问受限页时重定向
│       ├── context/            # 全局登录态（AuthContext）
│       ├── hooks/              # 自定义 Hooks（useAuth / useMessage）
│       ├── pages/              # 页面组件
│       │   ├── auth/           # 登录、注册
│       │   ├── home/           # 首页
│       │   ├── job/            # 职位列表、详情、发布、我的职位
│       │   ├── application/    # 投递申请、我的申请
│       │   └── NotFoundPage.jsx # 404 页面
│       ├── router/             # 路由配置（createBrowserRouter）
│       └── utils/              # 常量与工具函数（分类、公司、薪资格式化等）
├── server/                     # 后端服务
│   ├── config/                 # 环境变量（env.js）与数据库连接（db.js）
│   ├── controllers/            # 业务逻辑（认证 / 职位 / 申请）
│   ├── middleware/             # 鉴权、统一错误处理、异步捕获
│   ├── models/                 # Mongoose 数据模型
│   ├── routes/                 # 路由定义
│   ├── uploads/                # 简历本地存储目录
│   ├── utils/                  # Cookie Token、简历上传、自动种子数据
│   ├── app.js                  # Express 应用（中间件、路由、静态托管）
│   └── server.js               # 服务入口（连接数据库 → 种子数据 → 监听端口）
└── Dockerfile                  # 单镜像构建（MongoDB + Node + 前端产物）
```

## 角色与页面功能

| 页面 | 路由 | 功能 |
| --- | --- | --- |
| 登录 | `/login` | 按角色（Employer / Job Seeker）登录 |
| 注册 | `/register` | 注册账号并选择角色 |
| 首页 | `/` | 平台数据概览、使用流程、热门职位分类、热门公司 |
| 全部职位 | `/job/getall` | 浏览所有未过期职位 |
| 职位详情 | `/job/:id` | 查看职位完整信息，求职者可申请该职位 |
| 发布职位 | `/job/post` | 雇主发布职位（支持固定薪资或薪资区间），仅雇主可用 |
| 我的职位 | `/job/me` | 雇主查看、在线编辑（弹窗表单）、删除自己发布的职位 |
| 投递申请 | `/application/:id` | 求职者填写信息并上传简历（PNG/JPG/WEBP） |
| 我的申请 | `/applications/me` | 求职者查看/撤回自己的申请；雇主查看收到的申请并预览简历 |

## 接口设计

统一前缀 `/api/v1`，认证方式为 HttpOnly Cookie 中的 JWT。

**用户 `/user`**

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/register` | 注册（姓名、邮箱、手机号、密码、角色） |
| POST | `/login` | 登录（邮箱、密码、角色） |
| GET | `/logout` | 退出登录，清除 Cookie（需登录） |
| GET | `/getuser` | 获取当前登录用户信息（需登录） |

**职位 `/job`**

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| GET | `/getall` | 获取所有未过期职位（按发布时间倒序） |
| GET | `/:id` | 获取职位详情（需登录） |
| GET | `/getmyjobs` | 获取当前雇主发布的职位（仅雇主） |
| POST | `/post` | 发布职位（仅雇主） |
| PUT | `/update/:id` | 更新职位（仅雇主） |
| DELETE | `/delete/:id` | 删除职位（仅雇主） |

**申请 `/application`**

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/post` | 投递申请（multipart/form-data 上传简历，仅求职者） |
| GET | `/employer/getall` | 雇主查看收到的全部申请（仅雇主） |
| GET | `/jobseeker/getall` | 求职者查看自己的全部申请（仅求职者） |
| DELETE | `/delete/:id` | 求职者撤回申请（仅求职者） |

## 启动方式

### 方式一：Docker 一键启动（推荐）

```bash
cd environment
docker build -t jobzee-dms .
docker run -d --name jobzee-instance -p 4000:4000 jobzee-dms
```

容器内会自动启动 MongoDB 与后端服务，并由后端托管前端构建产物。首次启动时若数据库为空，会自动写入演示账号与示例职位。访问 http://localhost:4000 即可使用。

### 方式二：本地开发

前置要求：Node.js 20+，本机已启动 MongoDB（默认连接 `mongodb://127.0.0.1:27017`）。

```bash
# 启动后端（4000 端口，node --watch 热重载）
cd server
npm install
npm run dev

# 另开终端启动前端（5173 端口，/api 与 /uploads 已代理到后端）
cd client
npm install
npm run dev
```

后端环境变量（均有默认值，不配置也可运行，可写入 `server/config/config.env` 覆盖）：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `PORT` | `4000` | 后端端口 |
| `MONGO_URI` | `mongodb://127.0.0.1:27017` | MongoDB 连接串 |
| `JWT_SECRET_KEY` | `jobzee_jwt_secret_key_2024` | JWT 密钥 |
| `JWT_EXPIRES` | `7d` | JWT 有效期 |
| `COOKIE_EXPIRE` | `7` | Cookie 有效期（天） |
| `FRONTEND_URL` | 空（同源） | 跨域部署时的前端地址，多个用逗号分隔 |
| `CLOUDINARY_CLIENT_NAME` / `CLOUDINARY_CLIENT_API` / `CLOUDINARY_CLIENT_SECRET` | 空 | 配置后简历上传至 Cloudinary，否则存本地 `server/uploads` |

## 演示账号

首次启动自动初始化以下账号（密码均为 `Password123`）：

| 角色 | 邮箱 |
| --- | --- |
| 雇主 | `employer@jobzee.com` |
| 求职者 | `seeker@jobzee.com` |

登录时需在下拉框中选择与账号一致的角色。
