# FM Dashboard 前端教学大纲 v2

## React 18 + TypeScript + Tailwind + Redux + Router

---

## 一、项目目标

以 Football Manager 游戏主界面为蓝本，从零构建完整仪表盘。
每个阶段 = 核心概念 + 可见 UI 成果 + 面试题验收。

**技术栈：**
React 18 · TypeScript · Vite · Tailwind CSS v3 · shadcn/ui · Redux Toolkit · React Router v6 · TanStack Virtual

**面试题来源：** `top-reactjs-interview-questions`（50题，greatfrontend.com）
**shadcn 引入时机：** 阶段 3 起
**核心设计哲学：** Type-Driven Development（Boris Cherny）— 先设计类型签名，再填充实现

---

## 二、界面拆解（对应截图）

```
┌──────────────────────────────────────────────────────────────┐
│ [Sidebar w-52]  │ [Header: 搜索 + Mon 09:00 3Jul + INBOX 🔴] │
│  Home           ├──────────────────────────────────────────── │
│  Inbox 🔴7      │ [TabNav: Home/Profile/Contract/Targets/...] │
│  Squad Planner  ├──────────────────────────────────────────── │
│  Dynamics       │ [NextMatchCard]  │ [TeamNews + FixtureList] │
│  Tactics        ├──────────────────────────────────────────── │
│  Squad          │ [TEAM COMPETITIONS▼][PLAYER STATS▼][INBOX▼] │
│  ...            │  • 7 Unread Messages                        │
│  ─────────      │  • English transfer window...               │
│  Settings       │  • Squad Selection Rules                    │
│  Exit           │  • ...（虚拟滚动）                           │
└──────────────────────────────────────────────────────────────┘
```

---

## 三、学习进度总览

| 阶段 | 核心概念                          | 构建 UI                     | TypeScript 要点                   | 面试题                  | 状态 |
| ---- | --------------------------------- | --------------------------- | --------------------------------- | ----------------------- | ---- |
| 0    | 项目初始化 + GitHub               | 空项目跑起来                | TS 基础类型 + tsconfig            | —                       | ✅   |
| 1    | JSX + Tailwind + **Flexbox**      | 静态侧边栏                  | interface / type / Props类型      | Q1 Q3                   | 🔄   |
| 2    | useState + 事件                   | 侧边栏折叠+激活             | 泛型useState / 事件类型           | Q4 Q9 Q10 Q50           | ⬜   |
| 3    | Props + 组件组合 + **Responsive** | Header + TabNav + Card      | Props interface / children类型    | Q2 Q5 Q6 Q20 Q35        | ⬜   |
| 4    | useEffect + 异步                  | NextMatchCard + FixtureList | async/await类型 / AbortController | Q11 Q13 Q36 Q40         | ⬜   |
| 5    | useRef + useId                    | 搜索框 + 表单控件           | RefObject类型 / 受控vs非受控      | Q7 Q14 Q18              | ⬜   |
| 6    | useContext + 主题                 | 暗色/亮色切换               | Context泛型 / 自定义Hook类型      | Q8 Q32 Q43              | ⬜   |
| 7    | useReducer + 复杂状态             | 收件箱过滤+排序             | Discriminated Union / Action类型  | Q12 Q17 Q23             | ⬜   |
| 8    | memo + useMemo + useCallback      | 虚拟列表性能优化            | FC类型 / 函数类型签名             | Q15 Q16 Q19 Q31         | ⬜   |
| 9    | Redux Toolkit                     | 收件箱全局状态同步          | RootState / AppDispatch类型       | Q34 Q43                 | ⬜   |
| 10   | React Router v6 + 懒加载          | 多页面导航                  | RouteObject / lazy类型            | Q29 Q49                 | ⬜   |
| 11   | 高级模式 + 虚拟DOM深度            | HOC + Error Boundary        | 泛型组件 / 高级类型               | Q21 Q24 Q33 Q41 Q44–Q48 | ⬜   |
| 12   | Canvas + AI（扩展）               | 战术白板 + 手绘识别         | —                                 | —                       | ⬜   |

---

## 四、阶段 0：项目初始化 + GitHub + TypeScript 基础

详见 `phase0.md`

**核心内容：**

- Vite + React + TypeScript 脚手架
- Tailwind CSS 自定义色板
- ESLint 配置（Vite 内置）
- **Husky + lint-staged + commitlint**（Git 提交守卫）
- TypeScript 基础 + Type-Driven Development 思想
- GitHub 初始化 + Conventional Commits

**完成标志：**

- ✅ `npm run dev` 启动，深色背景金色标题显示
- ✅ `npm run lint` 无报错
- ✅ Husky 阻断带 lint 错误的 commit
- ✅ commitlint 阻断不规范的 commit 信息
- ✅ 代码已推送到 GitHub

---

## 五、阶段 1：JSX + Tailwind → 静态侧边栏

详见 `phase1.md`

**核心概念：** JSX 语法 · Tailwind 工具类 · lucide-react 图标 · **Flexbox 布局基础**
**构建内容：** 18 个导航项的深色静态侧边栏
**TypeScript：** `interface NavItem` · `LucideIcon` 类型 · 数组类型
**Flex 要点：**

- `flex flex-col` — 侧边栏纵向排列
- `flex items-center gap-3` — 每项图标 + 文字横向对齐
- `mt-auto` — Settings / Exit 推到底部
- `w-52` 固定宽度（桌面）预留折叠变量
  **面试题：** Q1（What is React）· Q3（What is JSX）
  **完成标志：** ⬜ 18 项正确显示，TS 无报错

---

## 六、阶段 2：useState + 事件 → 侧边栏交互

详见 `phase2.md`

**核心概念：** useState · onClick · 条件类名 · 更新函数模式
**构建内容：** 折叠/展开 · 激活高亮 · 徽标点击消失
**TypeScript：** `useState<string>` · `React.MouseEvent` · `??` 空值合并
**面试题：** Q4（State vs Props）· Q9（Benefits of hooks）· Q10（Rules of hooks）· Q50（useState setter）
**完成标志：** ⬜ 折叠宽 `w-14`；⬜ 激活项金色左边框

---

## 七、阶段 3：Props + 组件组合 → Header + TabNav + Card

详见 `phase3.md`

**⭐ 此阶段引入 shadcn/ui**
**⭐ 此阶段引入 Responsive Design + Mobile 布局**
**核心概念：** Props · children · 状态提升 · .map() 渲染列表
**构建内容：** Header · TabNav · Card 复合组件
**TypeScript：** Props interface · `React.ReactNode` · 字面量联合类型
**Responsive 要点：**

- Tailwind 移动端优先原则：无前缀 = 手机，`md:` = 平板，`lg:` = 桌面
- 侧边栏：手机隐藏 `hidden md:flex`，桌面显示
- 主布局：`flex-col md:flex-row`（手机纵排 → 桌面横排）
- Header：`flex-col sm:flex-row`，手机时搜索框换行
- TabNav：`overflow-x-auto`，手机横向滚动
- 断点速查：`sm:640px` · `md:768px` · `lg:1024px` · `xl:1280px`
  **面试题：** Q2 · Q5 · Q6 · Q20 · Q35
  **完成标志：** ⬜ Header 显示日期时间；⬜ TabNav 激活下划线；⬜ 手机端侧边栏隐藏，主内容全宽

---

## 八、阶段 4：useEffect + 异步 → 比赛卡片 + 赛程

详见 `phase4.md`

**核心概念：** useEffect 三种模式 · 三态加载 · 骨架屏 · 自定义 Hook · AbortController
**构建内容：** NextMatchCard · FixtureList · `useFetch<T>` Hook
**TypeScript：** 泛型 Hook · `Promise<T>` · `FetchState<T>` 接口
**面试题：** Q11 · Q13 · Q36 · Q40
**完成标志：** ⬜ 骨架屏 800ms；⬜ AbortController 清理

---

## 九、阶段 5：useRef + useId → 搜索框 + 表单

详见 `phase5.md`

**核心概念：** useRef DOM 访问 · useId 无障碍 · 受控 vs 非受控
**构建内容：** SearchBar（Cmd+K 聚焦）
**TypeScript：** `useRef<HTMLInputElement>` · `React.ChangeEvent`
**面试题：** Q7 · Q14 · Q18
**完成标志：** ⬜ Cmd+K 聚焦；⬜ useRef 不触发重渲染

---

## 十、阶段 6：useContext + 主题 → FM 暗色/亮色

详见 `phase6.md`

**核心概念：** createContext · Provider · useContext · localStorage 持久化
**构建内容：** ThemeProvider · ThemeToggle
**TypeScript：** `createContext<T | null>` · 自定义 Hook 类型守卫
**面试题：** Q8 · Q32 · Q43
**完成标志：** ⬜ 刷新保持主题；⬜ Provider 外调用报错

---

## 十一、阶段 7：useReducer → 收件箱复杂状态

详见 `phase7.md`

**核心概念：** useReducer · Discriminated Union Action · 不可变更新
**构建内容：** 收件箱过滤/排序/多选
**TypeScript：** `type Action = | { type: 'X' } | { type: 'Y'; payload: Z }` · switch 穷举
**面试题：** Q12 · Q17 · Q23
**完成标志：** ⬜ 过滤排序正确；⬜ TS switch 穷举检查

---

## 十二、阶段 8：memo + useMemo + useCallback → 性能优化

详见 `phase8.md`

**核心概念：** React.memo · useMemo · useCallback · TanStack Virtual · React DevTools Profiler
**构建内容：** Inbox 虚拟滚动（500条消息）· NavItem 优化
**TypeScript：** `React.memo<Props>` · 函数类型签名 · `useMemo<T[]>`
**面试题：** Q15 · Q16 · Q19 · Q31
**完成标志：** ⬜ Elements 面板同时 ≤17 个 DOM 节点；⬜ Profiler 验证 memo 效果

---

## 十三、阶段 9：Redux Toolkit → 全局状态同步

详见 `phase9.md`

**核心概念：** createSlice · configureStore · useSelector · useDispatch · createSelector
**构建内容：** 侧边栏徽标 + Header + Inbox 三处同步
**TypeScript：** `RootState` · `AppDispatch` · `TypedUseSelectorHook` · `PayloadAction<T>`
**面试题：** Q34 · Q43
**完成标志：** ⬜ Redux DevTools action 日志；⬜ 三处未读数实时同步

---

## 十四、阶段 10：React Router v6 + 懒加载

详见 `phase10.md`

**核心概念：** BrowserRouter · Routes · Outlet · useNavigate · React.lazy · Suspense · useSearchParams
**构建内容：** 嵌套路由 · 代码分包 · Vercel 部署
**TypeScript：** `useParams<{id: string}>` · `React.ComponentType` · lazy 类型
**面试题：** Q29 · Q49
**完成标志：** ⬜ Network 出现独立 chunk；⬜ Vercel 子路由不 404

---

## 十五、阶段 11：高级模式 + 虚拟 DOM 深度

详见 `phase11.md`

**核心概念：** HOC · Render Props · Compound Components · Error Boundary · forwardRef · Portals · Virtual DOM · Fiber · Reconciliation
**TypeScript：** 泛型 HOC · `React.Component<P,S>` · 条件类型
**面试题：** Q21 Q24 Q27 Q33 Q39 Q41 Q44 Q45 Q46 Q47 Q48
**完成标志：** ⬜ HOC 保持 TS 类型；⬜ Error Boundary 捕获错误

---

## 十六、阶段 12：Canvas 战术白板 + AI（扩展）

详见 `phase12.md`

**构建内容：** 三层叠加战术白板（球场SVG + Excalidraw手绘 + AI建议层）
**完成标志：** ⬜ 手绘 → AI 识别 → 流式返回；⬜ 三层合并导出 PNG

---

## 十七、面试题索引（50题映射）

| Q#  | 题目                               | 阶段 |
| --- | ---------------------------------- | ---- |
| Q1  | What is React? Benefits            | 1    |
| Q2  | React Node vs Element vs Component | 3    |
| Q3  | What is JSX?                       | 1    |
| Q4  | State vs Props                     | 2    |
| Q5  | Purpose of key prop                | 3    |
| Q6  | Array index as key - pitfalls      | 3    |
| Q7  | Controlled vs uncontrolled         | 5    |
| Q8  | Context pitfalls                   | 6    |
| Q9  | Benefits of hooks                  | 2    |
| Q10 | Rules of hooks                     | 2    |
| Q11 | useEffect vs useLayoutEffect       | 4    |
| Q12 | setState callback format           | 7    |
| Q13 | useEffect dependency array         | 4    |
| Q14 | useRef hook                        | 5    |
| Q15 | useCallback hook                   | 8    |
| Q16 | useMemo hook                       | 8    |
| Q17 | useReducer hook                    | 7    |
| Q18 | useId hook                         | 5    |
| Q19 | What is re-rendering?              | 8    |
| Q20 | React Fragments                    | 3    |
| Q21 | forwardRef()                       | 11   |
| Q22 | Reset component state              | 2    |
| Q23 | Why not mutate state               | 7    |
| Q24 | Error boundaries                   | 11   |
| Q25 | Testing React apps                 | 扩展 |
| Q26 | React hydration                    | 扩展 |
| Q27 | React Portals                      | 11   |
| Q28 | Debug React apps                   | 全程 |
| Q29 | React strict mode                  | 10   |
| Q30 | Localize React apps                | 扩展 |
| Q31 | Code splitting                     | 8    |
| Q32 | Optimize context rerenders         | 6    |
| Q33 | Higher order components            | 11   |
| Q34 | Flux pattern                       | 9    |
| Q35 | One-way data flow                  | 3    |
| Q36 | Async data loading                 | 4    |
| Q37 | Server-side rendering              | 扩展 |
| Q38 | Static generation                  | 扩展 |
| Q39 | Presentational vs container        | 11   |
| Q40 | Data fetching pitfalls             | 4    |
| Q41 | Render props                       | 11   |
| Q42 | React anti-patterns                | 全程 |
| Q43 | State vs Context vs Redux          | 6, 9 |
| Q44 | Composition pattern                | 11   |
| Q45 | What is virtual DOM?               | 11   |
| Q46 | Virtual DOM benefits & downsides   | 11   |
| Q47 | React Fiber                        | 11   |
| Q48 | Reconciliation                     | 11   |
| Q49 | React Suspense                     | 10   |
| Q50 | useState setter behavior           | 2    |

---

## 十八、TypeScript 进阶路径

```
阶段 0–1  基础类型
          string / number / boolean / null / undefined
          Array<T> / T[] / tuple / enum
          interface vs type alias（何时用哪个）
          联合类型 A | B · 交叉类型 A & B
          ⭐ Type-Driven Development 入门：先写类型签名再实现

阶段 2–4  React 中的 TS
          useState<T> 泛型
          React.MouseEvent / React.ChangeEvent 事件类型
          Props interface · children: React.ReactNode
          Promise<T> · async/await 返回类型
          ⭐ TDD 实践：先定义 Player / Match / Fixture interface，再写组件

阶段 5–7  中级类型
          泛型函数 <T> · 泛型约束 T extends object
          可选链 ?. · 非空断言 ! · 空值合并 ??
          类型守卫 typeof / instanceof / is
          ⭐ Discriminated Union ADT（Action 类型 = 函数式 sealed trait 思想）
          Partial<T> · Required<T> · Pick<T,K> · Omit<T,K>
          Brand Types（防止 UserId/Email 混用）

阶段 8–10 高级类型
          ReturnType<T> · Parameters<T>
          TypedUseSelectorHook（Redux 类型安全）
          React.ComponentType<P> · React.FC<P>
          ⭐ Option<T> 模式：显式处理 null/undefined（替代随意的 ?）

阶段 11   专家级
          条件类型 T extends U ? X : Y
          infer 关键字
          映射类型 { [K in keyof T]: ... }
          模板字面量类型 `${string}Id`
          ⭐ 泛型 HOC 类型穿透（MakeRequired、DeepPartial 等工具类型）
```

**参考书目：** Boris Cherny《Programming TypeScript》— 尤其"Type-Driven Development"章节

---

## 十九、快速依赖速查

```bash
# 阶段 0（全部一次安装）
npm create vite@latest fm-react -- --template react-ts
cd fm-react
npm install lucide-react react-router-dom @reduxjs/toolkit react-redux @tanstack/react-virtual clsx tailwind-merge
npm install -D tailwindcss @tailwindcss/vite

# 阶段 0 — Git 工程守卫
npm install -D husky lint-staged @commitlint/cli @commitlint/config-conventional
npx husky init

# 阶段 3（shadcn/ui）
npx shadcn@latest init
npx shadcn@latest add button badge card tabs separator skeleton scroll-area

# 阶段 12（战术白板）
npm install @excalidraw/excalidraw
```

---

## 二十、文件对照索引

| 文件                   | 内容                         |
| ---------------------- | ---------------------------- |
| `tutorials/plan.md`    | 本文件，总大纲               |
| `tutorials/phase0.md`  | 项目初始化 + TypeScript 基础 |
| `tutorials/phase1.md`  | JSX + Tailwind + 静态侧边栏  |
| `tutorials/phase2.md`  | useState + 事件处理          |
| `tutorials/phase3.md`  | Props + 组件组合 + shadcn    |
| `tutorials/phase4.md`  | useEffect + 异步数据         |
| `tutorials/phase5.md`  | useRef + useId + 表单        |
| `tutorials/phase6.md`  | useContext + 主题系统        |
| `tutorials/phase7.md`  | useReducer + 复杂状态        |
| `tutorials/phase8.md`  | 性能优化 + 虚拟列表          |
| `tutorials/phase9.md`  | Redux Toolkit                |
| `tutorials/phase10.md` | React Router + 懒加载        |
| `tutorials/phase11.md` | 高级模式 + 虚拟DOM           |
| `tutorials/phase12.md` | Canvas + AI 战术白板         |
