# canvas-preview

本仓库的 **方案 B** 本地宿主：Vite + React，把 `cursor/canvas` alias 到 `@thisismydesign/cursor-canvas-web`，在浏览器里预览 `.canvas.tsx`。

外观是 Mantine 近似实现，**不是** Cursor IDE 里的官方渲染。`.canvas.tsx` 源文件不要改 import。

## 启动

在仓库根目录、Windows PowerShell：

```powershell
cd canvas-preview
pnpm install
pnpm dev
```

浏览器打开终端里给出的地址（默认 `http://localhost:5173`）。

## 会扫描哪些文件

启动时只递归收集 `*.canvas.tsx`（跳过 `node_modules` / `.git` / `dist` 等）。每个 canvas 源码里出现的 `.md` 路径会做定点解析（相对 canvas、上一级目录、仓库根），命中的文件挂到该 canvas 分组下；**不会**遍历整个 Markdown 目录。

| 根目录 | 用途 |
|--------|------|
| `autosar/dm/analysis/` | 仓库里的分析 canvas（含 `canvases/`） |
| `canvas-preview/drop-in/` | 任意临时文件：拷进来即可出现在列表 |
| `%USERPROFILE%\.cursor\projects\d-Project-Cursor-AP-DM\canvases\` | Cursor 托管 canvas 目录（若存在） |

额外目录可在侧栏 **Scanned Path** 里逐行编辑（铅笔图标进入编辑，`+` / `-` 增删，刷新图标重扫）。支持仓库相对路径与 `~/`。结果保存在本地 `canvas-preview/.scan-roots.json`（不进 Git）。也仍可用环境变量：

```powershell
$env:CANVAS_EXTRA_DIRS = "D:\other\canvases;D:\tmp"
pnpm dev
```

侧栏编辑结果保存在本地 `canvas-preview/.scan-roots.json`（不进 Git），下次启动沿用。

左侧分两组：**Canvas Files** 列出扫描到的全部 `.canvas.tsx`（搜索框只过滤这一组）；**Linked Files** 固定贴在列表底部，列出当前 canvas 源码里解析成功的 `.md`，没有有效文件时仍显示该分组。URL hash 会记住当前文件。在已监视目录里**新增、修改或删除** `.canvas.tsx` / 已关联 `.md` 会刷新列表。Canvas 的 `openFile` 动作、canvas 正文里的 `.md` 路径、以及 Markdown 内的 `.md` 链接都会跳到对应 Markdown 预览（`react-markdown` + `remark-gfm`，含表格）；源码里写了路径但磁盘上不存在时右上角提示「未收录该文件」。

同名且内容 SHA-256 相同的 canvas 只保留一份（优先仓库 `analysis/`，其次 `drop-in/`，再次 Cursor 托管目录）。同名但内容不同会同时列出。

单独打印 canvas → markdown 关联（同样只解析源码路径，不扫全量 `.md`）：

```powershell
pnpm associate
```

## 限制

- 必须是可被 Vite 编译的 TSX：`import` 只能来自 `cursor/canvas`，且 **default export** 一个组件；或普通 `.md` 文本。
- 运行时新增扫描目录须点刷新；Vite 仍受 `server.fs.allow` 约束，默认已包含仓库与 `~/.cursor`。
- Python 环境仍只在 `scripts/`；本目录是独立的 Node 工程。
