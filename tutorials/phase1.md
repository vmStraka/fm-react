# 阶段 1：JSX + Tailwind + Flexbox → 静态侧边栏

**核心概念：** JSX 语法 · Tailwind 工具类 · Flexbox 布局 · lucide-react 图标
**构建内容：** 18 个导航项的深色静态侧边栏
**面试题：** Q1（What is React）· Q3（What is JSX）

---

## 目标效果

```
┌─────────────────┐
│ ⚽ FM React      │  ← Logo 区域
│─────────────────│
│ 🏠 Home         │
│ 📥 Inbox    [7] │  ← 未读徽标
│ 📋 Squad Planner│
│ 👥 Dynamics     │
│ 🎯 Tactics      │
│ 👤 Squad        │
│ 📊 Stats        │
│ 🏆 Competitions │
│ 💰 Finances     │
│ 🔄 Transfers    │
│ 📅 Schedule     │
│ 📰 News         │
│─────────────────│  ← 分隔线（底部项推到底）
│ ⚙️ Settings     │
│ 🚪 Exit         │
└─────────────────┘
```

---

## 知识点 1：什么是 JSX？

JSX 是 JavaScript 的语法扩展，让你在 JS 文件里写类似 HTML 的标签。

```tsx
// 这不是 HTML，是 JSX
const element = <h1 className="text-gold">Hello FM</h1>;

// Babel 编译后变成：
const element = React.createElement(
  "h1",
  { className: "text-gold" },
  "Hello FM",
);
```

**JSX vs HTML 关键区别：**

| HTML                | JSX                        | 原因                 |
| ------------------- | -------------------------- | -------------------- |
| `class`             | `className`                | `class` 是 JS 保留字 |
| `for`               | `htmlFor`                  | `for` 是 JS 保留字   |
| `<img>`             | `<img />`                  | JSX 所有标签必须闭合 |
| `onclick`           | `onClick`                  | 事件用驼峰命名       |
| `style="color:red"` | `style={{ color: 'red' }}` | style 接收对象       |

**JSX 中嵌入表达式（`{}` 大括号）：**

```tsx
const name = 'Arsenal';
const unread = 7;

// {} 里可以放任意 JS 表达式
<span>{name}</span>                    // 变量
<span>{unread > 0 ? '🔴' : ''}</span>  // 三元表达式
<span>{unread * 2}</span>              // 运算
```

> **面试题 Q3：** JSX 不是浏览器原生支持的，Vite/Babel 在构建时将其转换为 `React.createElement()` 调用。

---

## 知识点 2：Tailwind CSS 工具类思路

Tailwind 的核心思想：**不写自定义 CSS，直接用预设类名组合样式。**

```tsx
// 传统 CSS 写法
<div className="sidebar">...</div>
// sidebar { background: #0e1520; height: 100vh; display: flex; }

// Tailwind 写法：样式直接在类名里
<div className="bg-navy-900 h-screen flex flex-col">...</div>
```

**本阶段常用类速查：**

| 类名            | 效果                |
| --------------- | ------------------- |
| `bg-navy-900`   | 背景色（自定义色）  |
| `text-gray-300` | 文字颜色            |
| `h-screen`      | 高度 100vh          |
| `w-52`          | 宽度 13rem（208px） |
| `px-2 py-1`     | 水平/垂直内边距     |
| `rounded`       | 圆角                |
| `text-sm`       | 字体大小            |
| `font-medium`   | 字重                |

---

## 知识点 3：Flexbox 布局基础

Tailwind 的 flex 类直接映射 CSS Flexbox 属性。

### 纵向排列（侧边栏整体）

```tsx
<div className="flex flex-col h-screen">{/* 子元素从上到下排列 */}</div>
```

### 横向对齐（每个导航项）

```tsx
<div className="flex items-center gap-3">
  <Icon size={18} /> {/* 图标 */}
  <span>Home</span> {/* 文字 */}
</div>
```

`items-center` = 交叉轴居中（纵向 flex 里是水平居中，横向 flex 里是垂直居中）

### 把底部项推到最下方

```tsx
<nav className="flex flex-col h-screen">
  <div>Logo</div>
  <div>主导航项...</div>
  <div className="mt-auto">
    {" "}
    {/* ← 这里 */}
    Settings / Exit
  </div>
</nav>
```

`mt-auto` = `margin-top: auto`，消耗所有剩余空间，把元素推到底部。

### Flex 常用类对照表

| Tailwind 类       | CSS 属性                         | 效果             |
| ----------------- | -------------------------------- | ---------------- |
| `flex`            | `display: flex`                  | 开启 flex 容器   |
| `flex-col`        | `flex-direction: column`         | 纵向排列         |
| `flex-row`        | `flex-direction: row`            | 横向排列（默认） |
| `items-center`    | `align-items: center`            | 交叉轴居中       |
| `justify-between` | `justify-content: space-between` | 两端对齐         |
| `justify-center`  | `justify-content: center`        | 主轴居中         |
| `gap-3`           | `gap: 0.75rem`                   | 子元素间距       |
| `flex-1`          | `flex: 1`                        | 占满剩余空间     |
| `mt-auto`         | `margin-top: auto`               | 推到底部         |

---

## 知识点 4：TypeScript Interface

Phase 1 的核心 TS 要点：用 `interface` 描述数据形状。

```tsx
import { LucideIcon } from "lucide-react";

// 定义导航项的"形状"
interface NavItem {
  icon: LucideIcon; // lucide 图标组件类型
  label: string; // 显示文字
  path: string; // 路由路径（后面阶段用）
  badge?: number; // ? 表示可选，未读数徽标
}
```

**`interface` vs `type` 选择原则：**

- 描述对象形状 → 用 `interface`（可扩展、更语义化）
- 联合类型 / 简单别名 → 用 `type`

```tsx
type Position = "GK" | "CB" | "CM" | "ST"; // 联合类型用 type
interface Player {
  name: string;
  position: Position;
} // 对象用 interface
```

---

## 动手实践：构建侧边栏

### 步骤 1：创建文件

```bash
mkdir -p src/components/layout
touch src/components/layout/Sidebar.tsx
```

### 步骤 2：定义导航数据

新建 `src/components/layout/Sidebar.tsx`：

```tsx
import {
  Home,
  Inbox,
  ClipboardList,
  Users,
  Target,
  UserSquare,
  BarChart2,
  Trophy,
  DollarSign,
  ArrowLeftRight,
  Calendar,
  Newspaper,
  Settings,
  LogOut,
} from "lucide-react";
import { LucideIcon } from "lucide-react";

// ① 先定义类型（Type-Driven Development）
interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  badge?: number;
}

// ② 用类型约束数据（TS 会检查每一项是否符合 NavItem 形状）
const mainNavItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Inbox, label: "Inbox", path: "/inbox", badge: 7 },
  { icon: ClipboardList, label: "Squad Planner", path: "/planner" },
  { icon: Users, label: "Dynamics", path: "/dynamics" },
  { icon: Target, label: "Tactics", path: "/tactics" },
  { icon: UserSquare, label: "Squad", path: "/squad" },
  { icon: BarChart2, label: "Stats", path: "/stats" },
  { icon: Trophy, label: "Competitions", path: "/competitions" },
  { icon: DollarSign, label: "Finances", path: "/finances" },
  { icon: ArrowLeftRight, label: "Transfers", path: "/transfers" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: Newspaper, label: "News", path: "/news" },
];

const bottomNavItems: NavItem[] = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: LogOut, label: "Exit", path: "/exit" },
];
```

### 步骤 3：构建单个导航项组件

```tsx
// NavItem 组件的 Props 类型
interface NavItemProps {
  item: NavItem;
}

function NavItemRow({ item }: NavItemProps) {
  const Icon = item.icon; // LucideIcon 是组件，需要大写变量名才能用 <Icon />

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded text-gray-400 hover:text-gray-100 hover:bg-navy-800 cursor-pointer">
      <Icon size={18} />
      <span className="text-sm font-medium">{item.label}</span>
      {/* 只有 badge 存在且大于 0 时才渲染 */}
      {item.badge && item.badge > 0 && (
        <span className="ml-auto bg-fm-red text-white text-xs rounded-full px-1.5 py-0.5">
          {item.badge}
        </span>
      )}
    </div>
  );
}
```

### 步骤 4：组装 Sidebar 组件

```tsx
export default function Sidebar() {
  return (
    <aside className="flex flex-col h-screen w-52 bg-navy-900 px-2 py-3 shrink-0">
      {/* Logo 区域 */}
      <div className="flex items-center gap-2 px-3 py-2 mb-4">
        <span className="text-fm-gold text-lg font-bold">⚽ FM React</span>
      </div>

      {/* 主导航 */}
      <nav className="flex flex-col gap-0.5">
        {mainNavItems.map((item) => (
          <NavItemRow key={item.path} item={item} />
        ))}
      </nav>

      {/* 分隔线 + 底部项 */}
      <div className="mt-auto flex flex-col gap-0.5 border-t border-navy-700 pt-2">
        {bottomNavItems.map((item) => (
          <NavItemRow key={item.path} item={item} />
        ))}
      </div>
    </aside>
  );
}
```

### 步骤 5：在 App.tsx 使用

```tsx
import Sidebar from "./components/layout/Sidebar";

function App() {
  return (
    <div className="flex h-screen bg-navy-800">
      <Sidebar />
      {/* 主内容区（后续阶段填充） */}
      <main className="flex-1 p-6 text-gray-300">主内容区</main>
    </div>
  );
}

export default App;
```

---

## 知识点 5：`.map()` 渲染列表

```tsx
// 手写重复 → 不可维护
<NavItemRow item={mainNavItems[0]} />
<NavItemRow item={mainNavItems[1]} />
// ...12 行

// .map() → 数据驱动渲染
{mainNavItems.map((item) => (
  <NavItemRow key={item.path} item={item} />
))}
```

**`key` 是必须的：** React 用 key 追踪列表中哪些元素变化了。

- ✅ 用稳定唯一的值：`item.path`、`item.id`
- ❌ 不要用数组索引：`key={index}`（元素重排时会出 bug）

> **面试题 Q5：** key 帮助 React 在列表更新时最小化 DOM 操作。
> **面试题 Q6：** 用 index 作 key 的问题：当列表排序或插入时，React 会错误地复用组件状态。

---

## 面试题验收

### Q1: What is React? Describe its benefits.

**要点：**

- React 是用于构建用户界面的 JavaScript **库**（不是框架）
- 核心思想：UI = f(state)，状态变化驱动 UI 更新
- 主要优点：
  - **组件化**：UI 拆分为可复用的独立单元
  - **声明式**：描述"界面应该是什么样子"，而非"如何操作 DOM"
  - **虚拟 DOM**：批量计算差异，减少真实 DOM 操作（Phase 11 深入）
  - **单向数据流**：数据从父到子流动，易于追踪

### Q3: What is JSX and how does it work?

**要点：**

- JSX 是 JavaScript 的语法糖，允许在 JS 中写类似 HTML 的结构
- 构建工具（Vite/Babel）在编译时将 JSX 转换为 `React.createElement()` 调用
- JSX 不是字符串，不是 HTML，是描述 UI 结构的 JS 表达式
- 浏览器本身不理解 JSX，必须经过编译

---

## 知识点 6：为什么要测试？

写完组件，立刻为它写测试。这个习惯在 Phase 1 建立，之后每个阶段都沿用。

**测试的价值：**

- 重构时防止回归：改了 Sidebar 内部实现，测试能保证"Home 还在"
- 充当活文档：测试描述了组件的预期行为
- CI 自动把关：push 代码时自动跑测试，问题在合并前暴露

**本项目测试工具栈：**

| 工具                            | 作用                                                |
| ------------------------------- | --------------------------------------------------- |
| **Vitest**                      | 测试运行器，Vite 原生，速度极快                     |
| **@testing-library/react**      | 渲染组件 + 按用户视角查询 DOM                       |
| **@testing-library/user-event** | 模拟真实用户操作（点击、输入等）                    |
| **@testing-library/jest-dom**   | 扩展断言：`toBeInTheDocument()`、`toHaveClass()` 等 |
| **jsdom**                       | 在 Node.js 里模拟浏览器 DOM 环境                    |

**核心原则（Testing Library 哲学）：**

> 测试"用户能看到什么"，而不是"组件内部怎么实现"。

```tsx
// ❌ 测试实现细节（脆弱，重构后容易挂）
expect(wrapper.state("isCollapsed")).toBe(false);

// ✅ 测试用户视角（健壮）
expect(screen.getByText("Home")).toBeInTheDocument();
```

---

## 步骤 6：安装测试依赖

```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
```

---

## 步骤 7：配置 Vitest

修改 `vite.config.ts`：

```ts
/// <reference types="vitest" />   ← 顶部加这一行，让 TS 识别 test 配置类型
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom", // 用 jsdom 模拟浏览器环境
    globals: true, // 全局使用 describe/it/expect，无需 import
    setupFiles: "./src/test/setup.ts",
  },
});
```

新建 `src/test/setup.ts`：

```ts
import "@testing-library/jest-dom"; // 注册扩展断言（toBeInTheDocument 等）
```

在 `package.json` 的 `scripts` 中加入：

```json
"test": "vitest",
"test:run": "vitest run"
```

> `test` 是 watch 模式（文件改动自动重跑），`test:run` 是单次运行（CI 用）。

---

## 步骤 8：写第一个测试

新建 `src/components/layout/Sidebar.test.tsx`：

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("渲染后显示 Home 导航项", () => {
    render(<Sidebar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("显示所有 12 个主导航项", () => {
    render(<Sidebar />);
    const labels = [
      "Home",
      "Inbox",
      "Squad Planner",
      "Dynamics",
      "Tactics",
      "Squad",
      "Stats",
      "Competitions",
      "Finances",
      "Transfers",
      "Schedule",
      "News",
    ];
    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("Inbox 显示未读徽标 7", () => {
    render(<Sidebar />);
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("底部显示 Settings 和 Exit", () => {
    render(<Sidebar />);
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Exit")).toBeInTheDocument();
  });
});
```

运行测试：

```bash
npm test          # watch 模式，开发时用
npm run test:run  # 单次运行，CI 用
```

**常用查询方法速查：**

| 方法                    | 用途                   | 找不到时  |
| ----------------------- | ---------------------- | --------- |
| `getByText('Home')`     | 按文字查找，必须存在   | 抛错      |
| `queryByText('Home')`   | 按文字查找，可以不存在 | 返回 null |
| `getByRole('button')`   | 按语义角色查找         | 抛错      |
| `getAllByText(/Home/i)` | 查找所有匹配项         | 返回数组  |

---

## 步骤 9：配置 GitHub Actions CI

新建 `.github/workflows/ci.yml`：

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Test
        run: npm run test:run
```

**触发时机：**

- push 到 `main` 分支时自动运行
- 创建 PR 时自动运行，合并前必须 CI 绿色

**`npm ci` vs `npm install` 的区别：**

- `npm ci` 严格按 `package-lock.json` 安装，速度快，适合 CI 环境
- `npm install` 会更新 lock 文件，适合本地开发

push 到 GitHub 后，在仓库的 **Actions** 标签页可以看到 workflow 运行状态。

### 步骤 10：在 README.md 加 CI Badge

CI workflow 跑通后，把状态 Badge 加到 `README.md` 顶部，让项目状态一眼可见：

```markdown
# FM React

![CI](https://github.com/你的用户名/fm-react/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue)
```

把 `你的用户名` 替换成你的 GitHub 用户名即可。

**Badge 工作原理：**

- CI Badge 直接读 GitHub Actions 运行结果，CI 绿 → Badge 绿，CI 红 → Badge 红，零维护
- License Badge 是静态的，`shields.io` 渲染，手动填写

**两类 Badge 策略：**

| 类型             | 示例                                | 维护方式                                   |
| ---------------- | ----------------------------------- | ------------------------------------------ |
| 动态（自动同步） | Stars、Forks、CI 状态、最后提交时间 | shields.io / GitHub API 实时拉取，无需维护 |
| 静态（手动维护） | License、技术栈版本、功能数量       | 手动更新或写 CI 脚本自动替换               |

---

## 面试题验收

### Q1: What is React? Describe its benefits.

**要点：**

- React 是用于构建用户界面的 JavaScript **库**（不是框架）
- 核心思想：UI = f(state)，状态变化驱动 UI 更新
- 主要优点：
  - **组件化**：UI 拆分为可复用的独立单元
  - **声明式**：描述"界面应该是什么样子"，而非"如何操作 DOM"
  - **虚拟 DOM**：批量计算差异，减少真实 DOM 操作（Phase 11 深入）
  - **单向数据流**：数据从父到子流动，易于追踪

### Q3: What is JSX and how does it work?

**要点：**

- JSX 是 JavaScript 的语法糖，允许在 JS 中写类似 HTML 的结构
- 构建工具（Vite/Babel）在编译时将 JSX 转换为 `React.createElement()` 调用
- JSX 不是字符串，不是 HTML，是描述 UI 结构的 JS 表达式
- 浏览器本身不理解 JSX，必须经过编译

---

## 完成检查

- ⬜ 侧边栏在深色背景上正确显示 18 个导航项
- ⬜ Inbox 项显示红色数字徽标 `7`
- ⬜ Settings / Exit 在侧边栏最底部
- ⬜ `npm run lint` 无报错，TS 无红线
- ⬜ `npm run test:run` 4 个测试全部通过
- ⬜ push 到 GitHub 后 Actions 标签页 CI 绿色
- ⬜ README.md 顶部 CI Badge 显示绿色
- ⬜ 能解释 `interface NavItem` 中每个字段的类型含义
- ⬜ 能解释为什么 `key={item.path}` 比 `key={index}` 好
- ⬜ 能解释 `getByText` 和 `queryByText` 的区别

---

## 延伸思考

1. `LucideIcon` 类型是什么？尝试把鼠标悬停在 `icon: LucideIcon` 上，看 VS Code 显示的类型定义。
2. 如果要给每个导航项加一个 `isActive: boolean` 字段，需要修改哪里？
3. `shrink-0` 加在侧边栏上有什么作用？（提示：去掉后看看布局有什么变化）
