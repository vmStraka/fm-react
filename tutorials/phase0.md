# Phase 0：项目初始化 + GitHub + TypeScript 基础

> **目标：** 搭建完整的开发环境，理解项目脚手架结构，掌握 TypeScript 核心概念，让空项目在浏览器中跑起来。
>
> **预计时间：** 3–4 小时
>
> **完成标志：**
> - ⬜ `npm run dev` 启动，浏览器显示 Vite + React 默认页
> - ⬜ TypeScript 报错会在编辑器中实时显示红线
> - ⬜ Tailwind 自定义颜色 `bg-navy-900` 生效（页面背景变深色）
> - ⬜ Git 仓库已推送到 GitHub，可在网页上看到代码
> - ⬜ `npm run lint` 执行无报错
- ⬜ Husky pre-commit 阻断带 lint 错误的提交
- ⬜ commitlint 阻断不规范的 commit 信息

---

## 步骤 1：创建 Vite + React + TypeScript 项目

### 1.1 为什么选 Vite？

| 工具 | 启动速度 | 原理 |
|------|---------|------|
| Create React App (CRA) | 慢（10–30s） | Webpack 全量打包后启动 |
| **Vite** | 极快（< 1s） | 利用浏览器原生 ES Module，按需编译 |

Vite 在开发时不打包，直接把 `.tsx` 文件通过 ESM 发给浏览器，只编译当前访问的文件。

### 1.2 执行初始化命令

```bash
# 进入你的 git 工作目录
cd ~/git/react-learn

# 创建项目（react-ts 模板自动配置 TypeScript）
npm create vite@latest fm-react -- --template react-ts

# 进入项目目录
cd fm-react

# 安装默认依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器打开 `http://localhost:5173`，看到 Vite + React 的默认欢迎页即成功。

### 1.3 理解 Vite 项目入口链

```
index.html
  └── <script type="module" src="/src/main.tsx">
        └── main.tsx
              └── ReactDOM.createRoot(document.getElementById('root'))
                    └── <App />
                          └── App.tsx（你写的组件从这里开始）
```

**关键文件：**

| 文件 | 作用 |
|------|------|
| `index.html` | 唯一的 HTML 文件，有 `<div id="root">` 挂载点 |
| `src/main.tsx` | React 入口，把 App 挂载到 `#root` |
| `src/App.tsx` | 根组件，从这里开始写你的页面 |
| `src/vite-env.d.ts` | 声明 Vite 特有的类型（如 `import.meta.env`） |
| `tsconfig.json` | TypeScript 编译配置 |
| `vite.config.ts` | Vite 构建配置 |

---

## 步骤 2：安装项目依赖

一次性安装所有后续阶段需要的包，避免后续频繁 install：

```bash
# 核心 UI 库
npm install lucide-react

# 路由（阶段 10 使用）
npm install react-router-dom

# 状态管理（阶段 9 使用）
npm install @reduxjs/toolkit react-redux

# 虚拟列表（阶段 8 使用）
npm install @tanstack/react-virtual

# 工具函数（Tailwind 条件类名合并）
npm install clsx tailwind-merge

# Tailwind CSS（开发依赖）
npm install -D tailwindcss postcss autoprefixer

# 初始化 Tailwind 配置文件
npx tailwindcss init -p
```

安装完成后 `package.json` 的 dependencies 应该包含这些包。

---

## 步骤 3：配置 Tailwind CSS

### 3.1 修改 `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  // 告诉 Tailwind 扫描哪些文件，生成对应的 CSS 类
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // 开启 class 模式的暗色主题（阶段 6 使用）
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // FM 游戏的深色系（对应截图左侧深紫色侧边栏）
        navy: {
          700: "#1e2740",
          800: "#161e30",
          900: "#0e1520",
        },
        // FM 游戏的主题色
        fm: {
          gold:   "#f59e0b",  // 金色：激活状态、高亮
          purple: "#4f46e5",  // 紫色：主色调
          green:  "#22c55e",  // 绿色：正面信息
          red:    "#ef4444",  // 红色：警告、未读徽标
        },
      },
    },
  },
  plugins: [],
};
```

### 3.2 修改 `src/index.css`

替换全部内容为：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3.3 验证 Tailwind 生效

修改 `src/App.tsx`，测试自定义颜色：

```tsx
function App() {
  return (
    <div className="bg-navy-900 h-screen flex items-center justify-center">
      <h1 className="text-fm-gold text-4xl font-bold">
        FM Dashboard
      </h1>
    </div>
  );
}

export default App;
```

页面应显示深色背景上的金色大标题。

---

## 步骤 4：配置 TypeScript

### 4.1 理解 `tsconfig.json`

Vite 模板生成的 tsconfig 已经很好，了解关键配置：

```json
{
  "compilerOptions": {
    "target": "ES2020",          // 编译到 ES2020 语法
    "lib": ["ES2020", "DOM"],    // 可用的内置类型（浏览器 DOM API）
    "module": "ESNext",          // 使用 ESModule
    "moduleResolution": "bundler", // Vite 的模块解析模式
    "jsx": "react-jsx",          // React 17+ 新 JSX transform（不需要 import React）
    "strict": true,              // ⭐ 开启所有严格检查，是学习的关键
    "noUnusedLocals": true,      // 未使用的变量报错
    "noUnusedParameters": true,  // 未使用的参数报错
    "noFallthroughCasesInSwitch": true  // switch 必须有 break/return
  }
}
```

> **`"strict": true` 的意义：** 开启后 TypeScript 会帮你发现潜在 bug，包括可能为 null 的变量、隐式 any 类型等。初学时可能会有很多红线，但这是在帮你学习正确写法。

### 4.2 TypeScript 核心概念

**① 基本类型标注**

```typescript
// 变量后面加 `: 类型`
const managerName: string = 'Kuma Mon';
const teamRating: number = 78;
const isHomeGame: boolean = true;

// 函数参数和返回值
function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

// TypeScript 可以自动推断，不需要每个变量都写类型
const year = 2024;         // 推断为 number
const greeting = 'Hello';  // 推断为 string
```

**② interface — 定义对象形状**

```typescript
// interface 描述一个对象有哪些属性
interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  overall: number;
  contract?: Date;    // ? 表示可选属性（可以不传）
}

// 使用 interface
const player: Player = {
  id: 1,
  name: 'Marcus Rashford',
  age: 26,
  position: 'LW',
  overall: 84,
  // contract 可以不写，因为是可选的
};

// 数组
const squad: Player[] = [player];    // 等价于 Array<Player>
```

**③ type — 定义类型别名**

```typescript
// 联合类型：只能是这几个值之一
type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'CM' | 'CAM' | 'LW' | 'RW' | 'ST';
type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

// 使用
const pos: Position = 'ST';         // ✅ 合法
const pos2: Position = 'Midfielder'; // ❌ TS 报错：不在联合类型中

// interface vs type 使用规则（记住这个）
// - 定义对象形状 → 用 interface（支持扩展 extends）
// - 定义联合类型、字面量类型 → 用 type
```

**④ 泛型 — 类型的参数**

```typescript
// 泛型让函数/接口适用于多种类型
// <T> 是类型参数，调用时确定具体类型

// 泛型函数
function getFirst<T>(array: T[]): T | undefined {
  return array[0];
}

const firstPlayer = getFirst<Player>(squad);   // T = Player
const firstNumber = getFirst<number>([1,2,3]); // T = number

// 泛型接口
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const response: ApiResponse<Player[]> = {
  data: squad,
  status: 200,
  message: 'ok'
};
```

**⑤ 在 React 组件中使用 TS**

```tsx
// Props 用 interface 定义
interface WelcomeProps {
  name: string;
  teamName: string;
  isAdmin?: boolean;    // 可选
}

// 函数组件：参数类型是 Props interface
function Welcome({ name, teamName, isAdmin = false }: WelcomeProps) {
  return (
    <div>
      <h1>Welcome, {name}</h1>
      <p>Managing: {teamName}</p>
      {isAdmin && <span>Admin</span>}
    </div>
  );
}

// 使用
<Welcome name="Kuma Mon" teamName="Man UFC" />
<Welcome name="Kuma Mon" teamName="Man UFC" isAdmin={true} />
```

---

## 步骤 5：清理 Vite 默认模板

Vite 自带了一些演示内容，清理它们：

```bash
# 删除不需要的默认文件
rm src/assets/react.svg
rm public/vite.svg
```

**清空 `src/App.css`**（或直接删除，在 `main.tsx` 中移除引用）

**修改 `src/App.tsx`** 为最简版本：

```tsx
function App() {
  return (
    <div className="bg-navy-900 min-h-screen text-gray-100">
      <p className="p-4 text-fm-gold">FM Dashboard — 开始构建</p>
    </div>
  );
}

export default App;
```

---

## 步骤 6：GitHub 仓库初始化

### 6.1 创建 GitHub 仓库

1. 打开 [github.com](https://github.com)，点击右上角 `+` → `New repository`
2. 仓库名：`fm-react`
3. 不勾选 `Add a README file`（本地已有文件）
4. 点击 `Create repository`

### 6.2 本地 Git 初始化并推送

```bash
# 确保在项目目录
cd ~/git/react-learn/fm-react

# 初始化 git
git init

# 查看 .gitignore 是否包含 node_modules（Vite 模板已自动配置）
cat .gitignore

# 第一次提交
git add .
git commit -m "chore: init vite react-ts project"

# 关联远程仓库（替换 YOUR_NAME 为你的 GitHub 用户名）
git remote add origin git@github.com:YOUR_NAME/fm-react.git

# 推送到 main 分支
git push -u origin main
```

### 6.3 验证推送成功

刷新 GitHub 页面，应看到所有文件已上传。

### 6.4 好的 Commit 习惯（Conventional Commits）

```bash
# 格式：type: 描述
git commit -m "chore: install tailwind and configure colors"
git commit -m "feat: add static sidebar component"
git commit -m "fix: correct sidebar width on collapse"
git commit -m "docs: add phase0 tutorial notes"

# type 类型说明
# feat    新功能
# fix     修复 bug
# chore   工程配置（不影响业务代码）
# docs    文档更新
# style   代码格式（不影响逻辑）
# refactor 重构
```

---

## 步骤 7：建立项目文件结构

现在建立所有目录，后续阶段直接往里加文件：

```bash
mkdir -p src/types
mkdir -p src/lib
mkdir -p src/data
mkdir -p src/components/layout
mkdir -p src/components/ui
mkdir -p src/components/home
mkdir -p src/components/inbox
mkdir -p src/components/stats
mkdir -p src/context
mkdir -p src/store
mkdir -p src/hooks
mkdir -p src/pages
```

**创建 `src/lib/utils.ts`**（shadcn 需要的工具函数，阶段3使用）：

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// cn() 函数：合并 Tailwind 类名，解决类名冲突
// 用法：cn('px-4 py-2', isActive && 'bg-blue-500', className)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 步骤 8：配置 Lint 工具

Lint 是静态代码分析工具，在运行前发现代码问题——不规范的写法、潜在 bug、未使用的变量等。和 TypeScript 的类型检查互补：**TS 管类型，Lint 管代码风格与最佳实践**。

### 8.1 主流工具横向对比

| 工具 | 定位 | 速度 | 特点 |
|------|------|------|------|
| **ESLint** | Linter | 中 | 生态最成熟，插件最多，React 项目标配 |
| **Biome** | Linter + Formatter 二合一 | 极快（Rust） | 无需 ESLint + Prettier，配置简单，2024 崛起 |
| **oxlint** | Linter（ESLint 替代） | 极快（Rust） | 只做 Lint，常和 ESLint 搭配加速 |
| **Prettier** | Formatter（格式化） | 快 | 只管代码格式，不检查逻辑 |

**本项目推荐：ESLint**

理由：Vite `react-ts` 模板已内置 ESLint，开箱可用。ESLint 有专门的 `eslint-plugin-react-hooks` 规则集，能捕获 `useEffect` 依赖遗漏等真实 bug，是学习 React 的最佳搭档。

> **何时选 Biome？** 非 React 项目（纯 TS 工具库、Node.js 服务），或希望零配置一套工具搞定 Lint + Format。React Hooks 插件目前 ESLint 生态更完整。

---

### 8.2 ESLint 配置（Vite 已内置）

Vite `react-ts` 模板已生成 `eslint.config.js`：

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,       // ⭐ 检查 Hook 使用规则
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,  // useEffect 依赖检查等
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
)
```

**关键规则说明：**

| 规则来源 | 作用 |
|---------|------|
| `typescript-eslint` | TS 代码规范（禁止隐式 `any`、未使用变量等） |
| `eslint-plugin-react-hooks` | Hook 调用顺序、`useEffect` 缺少依赖时警告 |
| `eslint-plugin-react-refresh` | Vite HMR 热更新兼容性检查 |

---

### 8.3 运行 Lint

```bash
# 检查所有文件，输出问题列表
npm run lint

# 自动修复可修复的问题
npm run lint -- --fix
```

**示例输出：**
```
src/components/layout/Sidebar.tsx
  12:5  warning  React Hook useEffect has a missing dependency: 'items'
                 react-hooks/exhaustive-deps

  23:7  error    'unusedVar' is assigned a value but never used
                 @typescript-eslint/no-unused-vars
```

第一条警告是学习 `useEffect` 时最常遇到的：**忘记把依赖项加入数组**。ESLint 会直接告诉你缺了什么。

---

### 8.4 VS Code 实时显示 Lint 错误

安装插件：**ESLint**（作者：Microsoft）

安装后错误会在编辑器中实时显示波浪线，不需要每次手动运行 `npm run lint`。

---

### 8.5 自定义规则

在 `eslint.config.js` 的 `rules` 区域按需调整：

```js
rules: {
  ...reactHooks.configs.recommended.rules,

  // 学习阶段先设 warn，不阻断开发；熟练后改为 error
  '@typescript-eslint/no-explicit-any': 'warn',

  // console.log 开发时允许，上线前记得清理
  'no-console': 'warn',

  // 允许空函数（占位时有用）
  '@typescript-eslint/no-empty-function': 'off',
}
```

---

### 8.6 Biome 速览（了解，备用）

如果将来想试 Biome（一个命令替代 ESLint + Prettier）：

```bash
npm install -D @biomejs/biome
npx @biomejs/biome init          # 生成 biome.json
npx @biomejs/biome check src/    # 检查
npx @biomejs/biome check --write src/  # 修复
```

`biome.json` 核心配置：
```json
{
  "linter": { "enabled": true, "rules": { "recommended": true } },
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2
  },
  "javascript": {
    "formatter": { "quoteStyle": "single", "trailingCommas": "es5" }
  }
}
```

---

### 8.7 三者职责分工（记住这个）

```
TypeScript（tsc）  → 类型错误
                     例：传了 string 给 number 参数

ESLint             → 逻辑问题 + 最佳实践
                     例：useEffect 缺少依赖、使用废弃 API

Prettier / Biome   → 代码格式统一
                     例：双引号统一改单引号、末尾逗号

三者互补，缺一不可。
```

---

## 步骤 9：认识开发工具

打开 VS Code，安装以下插件（搜索插件名安装）：

| 插件 | 用途 |
|------|------|
| `Tailwind CSS IntelliSense` | Tailwind 类名自动补全 + 颜色预览 |
| `ES7+ React/Redux/React-Native snippets` | 快捷创建组件（输入 `rafce` + Tab） |
| `Pretty TypeScript Errors` | 让 TS 错误信息更易读 |
| `Auto Rename Tag` | 自动同步修改 JSX 开闭标签 |
| `ESLint` | 实时显示 Lint 错误波浪线 |

### 9.2 安装 Chrome 扩展

| 扩展 | 用途 | 安装 |
|------|------|------|
| `React Developer Tools` | 查看组件树、props、state、Profiler | Chrome 应用商店 |
| `Redux DevTools` | 查看 Redux action 历史（阶段9使用） | Chrome 应用商店 |

### 9.3 VS Code 快捷键（常用）

| 快捷键 | 功能 |
|--------|------|
| `Cmd+.` | 快速修复（TS / ESLint 报错时出现灯泡） |
| `F12` | 跳转到定义 |
| `Shift+Option+F` | 格式化当前文件（Prettier） |
| `Cmd+Shift+P` → `Organize Imports` | 自动整理 import 顺序 |

---

## 步骤 10：配置 Husky + lint-staged + commitlint

Husky 是 Git Hooks 管理工具。Git 本身支持 hooks，但配置文件在 `.git/hooks/` 下，**不被 git 追踪**，团队成员无法共享。Husky 把 hooks 放在 `.husky/` 目录，随代码一起提交，团队统一规则。

### 10.1 完整工具链作用

```
git commit
    ↓
Husky pre-commit 触发
    ↓
lint-staged（只扫描本次 git add 的文件，不全量扫描）
    ├── ESLint --fix     ← 自动修复可修复问题
    └── Prettier         ← 统一代码格式
    ↓ 通过
Husky commit-msg 触发
    ↓
commitlint              ← 检查 commit 信息是否符合 Conventional Commits
    ↓ 通过
提交成功 ✅

有任何一步失败 → 提交被阻断，必须修复后重新 commit
```

### 10.2 安装依赖

```bash
npm install -D husky lint-staged @commitlint/cli @commitlint/config-conventional
```

### 10.3 初始化 Husky

```bash
# 初始化：自动在 package.json 添加 prepare 脚本，并创建 .husky/ 目录
npx husky init
```

执行后 `.husky/` 目录会生成一个默认的 `pre-commit` 文件。

### 10.4 配置 pre-commit hook

覆盖默认内容，改为运行 lint-staged：

```bash
# .husky/pre-commit
npx lint-staged
```

### 10.5 配置 lint-staged

在 `package.json` 中添加：

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  }
}
```

### 10.6 配置 commit-msg hook

```bash
# 创建 commit-msg hook 文件
echo 'npx --no -- commitlint --edit $1' > .husky/commit-msg
```

### 10.7 配置 commitlint

创建 `commitlint.config.js`：

```js
export default {
  extends: ['@commitlint/config-conventional'],
};
```

### 10.8 验证效果

**测试 pre-commit（故意引入 lint 错误）：**
```tsx
// 在任意 .tsx 文件加入
const unused = 'this will be caught';  // 未使用变量

git add .
git commit -m "test"
# → ESLint 报错，提交被阻断 ✅
```

**测试 commitlint（故意写错格式）：**
```bash
git commit -m "update stuff"
# → commitlint 报错：subject may not be empty / type must be one of [feat, fix, chore...]
# 提交被阻断 ✅

git commit -m "chore: configure husky and lint-staged"
# → 通过 ✅
```

### 10.9 常用 commit type 速查

| type | 含义 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `chore` | 工程配置（不影响业务代码） |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响逻辑） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |

### 10.10 对比：有无 Husky

| 场景 | 没有 Husky | 有 Husky |
|------|-----------|---------|
| 忘记跑 lint | 带着错误提交进仓库 | 自动检查，有错阻断 |
| commit 信息随意 | `fix bug`、`update` | 强制规范格式 |
| 团队协作 | 每人配置不同 | 统一规则随代码共享 |
| CI 失败率 | 高（本地没检查） | 低（本地已过关） |
| `Redux DevTools` | 查看 Redux action 历史（阶段9使用） | Chrome 应用商店 |

### 9.3 VS Code 快捷键（常用）

| 快捷键 | 功能 |
|--------|------|
| `Cmd+.` | 快速修复（TS / ESLint 报错时出现灯泡） |
| `F12` | 跳转到定义 |
| `Shift+Option+F` | 格式化当前文件（Prettier） |
| `Cmd+Shift+P` → `Organize Imports` | 自动整理 import 顺序 |


---

## 知识点验收

完成本阶段后，尝试回答以下问题（不查资料）：

**概念理解：**
1. Vite 和 Create React App 的主要区别是什么？
2. `interface` 和 `type` 各自适合什么场景？
3. TypeScript 的泛型 `<T>` 解决了什么问题？
4. `"strict": true` 在 tsconfig 中开启了什么？

**动手练习：**

```typescript
// 练习 1：定义一个 Match interface
// 要求：homeTeam(string), awayTeam(string), date(Date),
//       type('Friendly'|'League'|'Cup'), venue(string), attendance(可选 number)
interface Match {
  // 在这里填写...
}

// 练习 2：定义一个泛型函数 findById
// 接受 id: number 和 items: T[]（T 有 id: number 属性），返回找到的 T 或 undefined
function findById<T extends { id: number }>(id: number, items: T[]): T | undefined {
  // 在这里填写...
}
```

**参考答案：**
```typescript
// 练习 1
interface Match {
  homeTeam: string;
  awayTeam: string;
  date: Date;
  type: 'Friendly' | 'League' | 'Cup';
  venue: string;
  attendance?: number;
}

// 练习 2
function findById<T extends { id: number }>(id: number, items: T[]): T | undefined {
  return items.find(item => item.id === id);
}
```

---

## 阶段总结

完成本阶段你已拥有：

```
✅ Vite + React + TypeScript 开发环境
✅ Tailwind CSS + FM 自定义颜色
✅ ESLint 配置 + npm run lint 可运行
✅ Husky + lint-staged + commitlint 工程守卫
✅ GitHub 仓库 + Conventional Commits 工作流
✅ TypeScript 基础：类型标注 / interface / type / 泛型
✅ Type-Driven Development 思维方式建立
✅ 项目文件结构（为后续12个阶段准备好位置）
✅ 开发工具配置（VS Code 插件 + Chrome 扩展）
```

**下一步：** [Phase 1 →](./phase1.md) JSX + Tailwind → 构建静态侧边栏

---

## 附录 A：Type-Driven Development（类型驱动开发）

> 思想来源：Boris Cherny《Programming TypeScript》
> 核心原则：**先设计精确的类型签名，再填充实现代码。**
> 类型是"契约"，实现只是"履行契约"。

---

### A.1 为什么要类型驱动？

传统写法（实现驱动）：
```typescript
// 先写实现，类型是事后补的
function getPlayer(id) {
  return fetch(`/api/players/${id}`).then(r => r.json());
}
// 问题：返回什么类型？调用者不知道。出错了运行时才发现。
```

类型驱动写法：
```typescript
// 先写签名（契约）
async function getPlayer(id: PlayerId): Promise<Player>;

// 签名一写完，三件事同时发生：
// 1. 调用者知道如何使用（看签名即文档）
// 2. 实现者知道要返回什么
// 3. 编译器帮你检查实现是否符合契约
```

**结论：** 类型签名 = 函数的说明书。好的类型让代码自文档化。

---

### A.2 在 FM 项目中实践：先建 types/ 目录

**开发顺序（类型驱动）：**
```
1. 设计数据类型（src/types/）
      ↓
2. 设计函数签名（hooks、utils）
      ↓
3. 填充实现（组件、逻辑）
      ↓
4. 编译器检查一致性
```

**先创建 `src/types/player.ts`：**
```typescript
// 第一步：设计精确的数据类型，不是上来就写组件

// Brand Type：防止不同 ID 类型混用
type PlayerId = number & { readonly _brand: 'PlayerId' };
type TeamId   = number & { readonly _brand: 'TeamId' };

type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'ST';
type Foot     = 'Left' | 'Right' | 'Both';

interface PlayerAttributes {
  pace:      number;  // 1–20
  shooting:  number;
  passing:   number;
  dribbling: number;
  defending: number;
  physical:  number;
}

interface Player {
  id:         PlayerId;
  name:       string;
  age:        number;
  position:   Position;
  overall:    number;      // 综合评分 1–99
  potential:  number;
  preferredFoot: Foot;
  attributes: PlayerAttributes;
  teamId:     TeamId;
  value:      number;      // 市场价值（欧元）
  wage:       number;      // 周薪
  contractEnd: Date;
}

// 转会目标（不是完整球员，只有部分信息）
type TransferTarget = Pick<Player, 'id' | 'name' | 'position' | 'overall' | 'value'>;

// 球探报告（只读，不可修改）
type ScoutReport = Readonly<{
  player:   TransferTarget;
  rating:   1 | 2 | 3 | 4 | 5;   // 字面量类型，只能是这5个值
  comment:  string;
  scoutedAt: Date;
}>;
```

**再创建 `src/types/match.ts`：**
```typescript
type MatchId    = number & { readonly _brand: 'MatchId' };
type Competition = 'Premier League' | 'FA Cup' | 'Champions League' | 'Friendly';

interface MatchResult {
  homeGoals: number;
  awayGoals: number;
}

// Discriminated Union：比赛的三种状态
type MatchState =
  | { status: 'upcoming'; kickoff: Date }
  | { status: 'live';     minutePlayed: number; result: MatchResult }
  | { status: 'finished'; result: MatchResult; attendance: number };

interface Match {
  id:          MatchId;
  homeTeam:    string;
  awayTeam:    string;
  competition: Competition;
  venue:       string;
  state:       MatchState;    // 包含所有状态信息
}
```

**再创建 `src/types/inbox.ts`：**
```typescript
type MessageId  = string & { readonly _brand: 'MessageId' };
type MessageCategory = 'transfer' | 'injury' | 'contract' | 'media' | 'board' | 'general';
type Priority = 'urgent' | 'normal' | 'low';

interface Message {
  id:         MessageId;
  subject:    string;
  sender:     string;
  category:   MessageCategory;
  priority:   Priority;
  read:       boolean;
  receivedAt: Date;
  body?:      string;   // 可选：预览时不需要正文
}

// API 分页响应（泛型，可复用）
interface PaginatedResponse<T> {
  items:      T[];
  total:      number;
  page:       number;
  pageSize:   number;
  hasMore:    boolean;
}

type MessageListResponse = PaginatedResponse<Message>;
```

---

### A.3 Discriminated Union：精确建模状态

这是 Boris Cherny 最强调的模式，来自函数式编程的代数数据类型（ADT）。

**问题：传统写法状态混乱**
```typescript
// ❌ 不好：所有字段都可能是 undefined，状态不清晰
interface FetchState {
  loading: boolean;
  data?: Player[];
  error?: string;
  // 什么时候 data 有值？什么时候 error 有值？不清楚
  // 可能出现 loading=true 且 error 有值的矛盾状态
}
```

**Boris 风格：用 Discriminated Union 精确建模**
```typescript
// ✅ 好：每种状态是独立的类型，不可能出现矛盾
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error';   error: string };

// 使用时，TypeScript 强制你处理每种情况
function renderPlayerList(state: FetchState<Player[]>) {
  switch (state.status) {
    case 'idle':    return <Placeholder />;
    case 'loading': return <Skeleton />;
    case 'success': return <List players={state.data} />;  // TS 知道这里有 data
    case 'error':   return <ErrorBanner message={state.error} />;
    // 如果漏写了一种情况，TS 报错（穷举检查）
  }
}
```

**在 FM 项目中的应用：**
```typescript
// 比赛状态（回顾 match.ts 中的设计）
type MatchState =
  | { status: 'upcoming'; kickoff: Date }
  | { status: 'live';     minutePlayed: number; result: MatchResult }
  | { status: 'finished'; result: MatchResult; attendance: number };

function renderMatchStatus(state: MatchState) {
  switch (state.status) {
    case 'upcoming':
      return `Kicks off ${state.kickoff.toLocaleDateString()}`;
    case 'live':
      return `${state.minutePlayed}' — ${state.result.homeGoals}:${state.result.awayGoals}`;
    case 'finished':
      return `FT ${state.result.homeGoals}:${state.result.awayGoals}`;
  }
}
```

---

### A.4 Brand Types：防止 ID 类型混用

这是一个小技巧，防止把 `PlayerId` 传给需要 `TeamId` 的参数：

```typescript
// 没有 Brand Type 时（不安全）
function getPlayer(id: number): Player { ... }
function getTeam(id: number): Team { ... }

const playerId = 42;
getTeam(playerId);  // ✅ TS 不报错，但语义上是错误的！

// 有 Brand Type 时（安全）
type PlayerId = number & { readonly _brand: 'PlayerId' };
type TeamId   = number & { readonly _brand: 'TeamId' };

function getPlayer(id: PlayerId): Player { ... }
function getTeam(id: TeamId): Team { ... }

const playerId = 42 as PlayerId;
getTeam(playerId);  // ❌ TS 报错：PlayerId 不能赋值给 TeamId
```

> Brand Type 的 `_brand` 字段只存在于类型系统中，运行时完全不存在，零性能开销。

---

### A.5 工具类型（Utility Types）

TypeScript 内置了很多"类型变换工具"，避免重复定义：

```typescript
interface Player {
  id: PlayerId;
  name: string;
  overall: number;
  value: number;
  contractEnd: Date;
}

// Pick：只保留指定字段
type PlayerCard = Pick<Player, 'id' | 'name' | 'overall'>;
// → { id: PlayerId; name: string; overall: number }

// Omit：删除指定字段
type PlayerWithoutId = Omit<Player, 'id'>;
// → 除了 id 的所有字段

// Partial：所有字段变可选（常用于更新操作）
type PlayerUpdate = Partial<Player>;
// → { id?: PlayerId; name?: string; ... }

// Required：所有字段变必填
type CompletePlayer = Required<Player>;

// Readonly：所有字段变只读（防止误修改）
type FrozenPlayer = Readonly<Player>;

// Record：快速定义键值映射
type PositionMap = Record<Position, Player[]>;
// → { GK: Player[]; CB: Player[]; ... }
```

**在 FM 项目中的实际用法：**
```typescript
// 创建球员时不需要 id（服务器生成）
type CreatePlayerInput = Omit<Player, 'id'>;

// 更新球员时所有字段可选
type UpdatePlayerInput = Partial<Omit<Player, 'id'>>;

// 转会目标只显示关键信息
type TransferTarget = Pick<Player, 'id' | 'name' | 'position' | 'overall' | 'value'>;
```

---

### A.6 函数签名优先工作流（在本项目中落地）

**每次写新功能，遵循这个顺序：**

```
Step 1: 定义数据类型（types/ 目录）
Step 2: 写函数/Hook 签名（只写类型，不写实现）
Step 3: 填充实现
Step 4: TypeScript 帮你验证
```

**示例：开发 useFetch Hook（阶段4）**

```typescript
// Step 1：数据类型已在 types/ 定义好

// Step 2：先写签名
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// 签名：接受一个返回 Promise<T> 的函数，返回 FetchState<T>
function useFetch<T>(fetchFn: () => Promise<T>): FetchState<T>;

// Step 3：填充实现（有了签名，实现几乎是"填空"）
function useFetch<T>(fetchFn: () => Promise<T>): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: 'idle' });

  useEffect(() => {
    setState({ status: 'loading' });
    fetchFn()
      .then(data => setState({ status: 'success', data }))
      .catch(err => setState({ status: 'error', error: err.message }));
  }, [fetchFn]);

  return state;
}

// Step 4：使用时，TS 自动推断类型
const state = useFetch<Match[]>(fetchFixtures);
if (state.status === 'success') {
  state.data;  // TS 知道这里是 Match[]
}
```

---

### A.7 与 React 的结合总结

| 场景 | Boris TDD 应用 |
|------|---------------|
| 组件 Props | 先写 `interface XxxProps`，再写组件函数 |
| 状态设计 | 用 Discriminated Union 代替 `loading/data/error` 三个 boolean |
| API 数据 | 先定义 `interface`，再写 `fetch` 调用 |
| useReducer | Action 用 Discriminated Union，reducer 类型签名先写 |
| Redux | `RootState` / `AppDispatch` 类型先导出，再写 selector |
| 工具函数 | 函数签名（输入/输出类型）先写，实现后填 |

**核心记忆点：**
> "类型签名是最好的文档，也是最好的测试。写代码之前先想好类型，实现就是填空题。"
> — Boris Cherny 思想精华

---

## 附录 B：常见 TS 错误解读

| 错误信息 | 含义 | 解决方法 |
|---------|------|---------|
| `Type 'string' is not assignable to type 'number'` | 类型不匹配 | 检查变量类型，或用 `Number()` 转换 |
| `Object is possibly 'null'` | 变量可能为 null | 用 `?.` 可选链或先判断 `if (x !== null)` |
| `Property 'X' does not exist on type 'Y'` | 访问了不存在的属性 | 检查 interface 定义，或添加该属性 |
| `Parameter 'X' implicitly has an 'any' type` | 参数缺少类型标注 | 给参数加上类型：`(x: string)` |
| `Cannot find module 'X'` | 找不到模块 | 检查 `npm install X` 是否执行，或路径是否正确 |
