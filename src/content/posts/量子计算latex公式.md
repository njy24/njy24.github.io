---
title: "量子计算 LaTeX 公式：Markdown 规则与符号速查"
description: "从行内公式、分组与对齐规则，到希腊字母、常用数学结构及量子计算记号，配可复制源码和显示效果。"
date: 2026-11-21
tags: [LaTeX, Markdown, 量子计算]
draft: false
---

这篇笔记用于写文章时查语法：先掌握公式如何进入 Markdown，再查字母和符号，最后用少量有代表性的公式学习组合。每种结构尽量只讲一次，不按公式数量堆例子。

量子部分采用阅读 Nielsen 与 Chuang《量子计算与量子信息》时常见的记号，覆盖态、算符、量子门、测量、信道与信息量。它是一份写作参考，不是全书公式的摘录。

## 一、在 Markdown 中插入公式

### 行内公式与独立公式

短公式放在一对英文半角 `$` 中，与文字处于同一行。不要在分隔符内侧加无意义的空格，也不要让行内公式跨段落。

```markdown
一个量子比特的态可以写成 $\lvert\psi\rangle=\alpha\lvert0\rangle+\beta\lvert1\rangle$。
```

一个量子比特的态可以写成 $\lvert\psi\rangle=\alpha\lvert0\rangle+\beta\lvert1\rangle$。

长公式、矩阵或推导单独占行：上下各写一行 `$$`，公式块前后各留一个空行。

```markdown
归一化条件是：

$$
\lvert\alpha\rvert^2+\lvert\beta\rvert^2=1.
$$

因此两个测量概率之和为 1。
```

归一化条件是：

$$
\lvert\alpha\rvert^2+\lvert\beta\rvert^2=1.
$$

因此两个测量概率之和为 1。

**Markdown 本身不保证支持数学公式。** 本博客通过 `remark-math` 识别公式，再用 KaTeX 排版；其他编辑器的支持情况可能不同。这里统一使用 `$...$` 和独立行的 `$$`，不要假定 `\(...\)`、`\[...\]` 在所有 Markdown 环境中都能工作。

### 源码与显示效果要分清

反引号里的内容用于展示源码。例如 `\alpha` 是一个命令的写法，而 `$\alpha$` 才会在正文显示为 $\alpha$。同样，标注为 `latex` 的代码块只是带语法标记的源码展示，不会自动变成公式。

下文标为 `latex` 的代码块只给出**公式内部内容**。复制到文章时，短式外加 `$...$`；多行式外加上、下两行 `$$`。不要把代码块的三个反引号也复制进数学环境。

`.md` 文件中命令前只写一个反斜杠，例如 `\frac{1}{2}`。`\\` 不是“更保险的反斜杠”，它在矩阵和对齐环境中表示换行。JSON 或某些程序字符串的双重转义规则，不要照搬到 Markdown 文件里。

## 二、LaTeX 数学语法的核心规则

### 1. 花括号决定命令作用范围

`{...}` 表示一个整体，分组括号本身不显示。上下标和许多命令默认只取后面的一个对象；超过一个字符时应明确分组。

| 目的 | 正确源码 | 显示效果 | 容易写错的地方 |
| --- | --- | --- | --- |
| 多字符上标 | `x^{n+1}` | $x^{n+1}$ | `x^n+1` 只有 n 是上标 |
| 多字符下标 | `a_{ij}` | $a_{ij}$ | `a_ij` 只有 i 是下标 |
| 上下标并存 | `U_{ij}^{\dagger}` | $U_{ij}^{\dagger}$ | 同一对象不要直接连写两次 `^` |
| 分数 | `\frac{a+b}{c+d}` | $\frac{a+b}{c+d}$ | 分子、分母分别成组 |
| 根式 | `\sqrt[n]{x+1}` | $\sqrt[n]{x+1}$ | `[...]` 是根指数的可选参数 |
| 显示花括号 | `\{0,1\}` | $\{0,1\}$ | 单写 `{0,1}` 只会分组 |

例如 `x^10` 会被理解为 $x^10$，而 `x^{10}` 才是 $x^{10}$。没有报错不代表数学含义正确。

### 2. 命令、普通字母、文字说明各有写法

命令区分大小写：`\psi` 是 $\psi$，`\Psi` 是 $\Psi$。反斜杠后连续的英文字母会被当成一个命令名，所以 `\alpha x` 能得到 $\alpha x$，`\alphax` 则不是“α 乘 x”。也可以用 `\alpha{}x` 明确结束命令。

数学模式中的普通字母通常是斜体变量。函数名应写 `\sin`、`\cos`、`\exp`、`\log`、`\ln`、`\det`；直接写 `sin` 会像三个变量相乘。没有内置命令的算符用 `\operatorname{...}`，例如 `\operatorname{tr}(A)` → $\operatorname{tr}(A)$。

文字说明用 `\text{...}`，例如 `p_{\text{success}}` → $p_{\text{success}}$。中文说明也可放进 `\text{...}`，但字体效果取决于网页字体；较长说明放在公式外更易读。`\mathrm{...}` 主要用于直立字母、单位等，不代替完整的文字排版。

### 3. 空格、换行与对齐

数学源码中的普通空格通常不控制显示间距，普通回车也不等于公式换行。需要时使用 `\,`（小间距）、`\;`（较大间距）、`\quad`、`\qquad`；`\!` 是负间距，不要用它随意挤压公式。

多行推导使用 `aligned`，`&` 标记对齐位置，`\\` 换行。公式块内不要用空白段落隔开各行。

```latex
\begin{aligned}
(a+b)^2 &= (a+b)(a+b) \\
        &= a^2+2ab+b^2.
\end{aligned}
```

$$
\begin{aligned}
(a+b)^2 &= (a+b)(a+b) \\
        &= a^2+2ab+b^2.
\end{aligned}
$$

`aligned` 外面已经有 `$$`，里面不要再套 `$`。`&` 只在对齐、矩阵等相应环境里有意义，不能拿它当一般的连接符。

### 4. 括号、竖线与特殊字符

| 用途 | 源码 | 显示效果 |
| --- | --- | --- |
| 自动伸缩括号 | `\left(\frac{a}{b}\right)` | $\left(\frac{a}{b}\right)$ |
| 绝对值／复数模 | `\lvert z\rvert` | $\lvert z\rvert$ |
| 向量或算符的范数 | `\lVert v\rVert` | $\lVert v\rVert$ |
| 尖括号 | `\langle u,v\rangle` | $\langle u,v\rangle$ |
| 条件分隔线 | `P(A\mid B)` | $P(A\mid B)$ |
| 百分号 | `50\%` | $50\%$ |
| 字面下划线 | `\text{file\_name}` | $\text{file\_name}$ |

`\left` 与 `\right` 必须配对；只显示一侧时，可用不可见的 `.`，如 `\left.\frac{\mathrm{d}f}{\mathrm{d}x}\right\rvert_{x=0}`。跨 `aligned` 的行不能把一对 `\left`、`\right` 拆开；这时每行独立配对，或使用 `\bigl`、`\bigr` 等固定尺寸命令。

数学环境里 `%` 会引出注释，要显示百分号请写 `\%`。需要字面 `#`、`&` 时分别写 `\#`、`\&`。正文中的美元符号可写 `\$`。在 Markdown 表格中直接输入竖线可能被当成分栏，因此优先写 `\lvert`、`\rvert`、`\mid`，复杂公式放到表格之外。

### 5. 公式编号与支持范围

独立公式可用 `\tag{1}` 手动编号，例如：

```latex
U^\dagger U=I \tag{1}
```

$$
U^\dagger U=I \tag{1}
$$

本博客没有配置自动编号和交叉引用，不要依赖 `\label`、`\ref` 自动管理公式。KaTeX 是数学排版器，不是完整的 LaTeX 文档编译器：不要在文章公式中写 `\documentclass`、`\usepackage` 或 `\begin{document}`。支持哪些命令可查 [KaTeX 官方支持表](https://katex.org/docs/support_table.html)。

## 三、希腊字母：大小写与变体

最简单的例子：在文章中输入 `$\alpha$` 就得到 $\alpha$。下表源码均省略外侧的 `$`。

大写希腊字母中，形状与拉丁字母相同的一组通常直接用 `A`、`B` 等书写；其余使用 `\Gamma` 等命令。这样比依赖某个渲染器额外提供的 `\Alpha` 等命令更便于迁移到普通 LaTeX。

| 名称 | 小写 | 小写源码 | 大写 | 常用大写写法 |
| --- | --- | --- | --- | --- |
| alpha | $\alpha$ | `\alpha` | $A$ | `A` |
| beta | $\beta$ | `\beta` | $B$ | `B` |
| gamma | $\gamma$ | `\gamma` | $\Gamma$ | `\Gamma` |
| delta | $\delta$ | `\delta` | $\Delta$ | `\Delta` |
| epsilon | $\epsilon$ | `\epsilon` | $E$ | `E` |
| zeta | $\zeta$ | `\zeta` | $Z$ | `Z` |
| eta | $\eta$ | `\eta` | $H$ | `H` |
| theta | $\theta$ | `\theta` | $\Theta$ | `\Theta` |
| iota | $\iota$ | `\iota` | $I$ | `I` |
| kappa | $\kappa$ | `\kappa` | $K$ | `K` |
| lambda | $\lambda$ | `\lambda` | $\Lambda$ | `\Lambda` |
| mu | $\mu$ | `\mu` | $M$ | `M` |
| nu | $\nu$ | `\nu` | $N$ | `N` |
| xi | $\xi$ | `\xi` | $\Xi$ | `\Xi` |
| omicron | $o$ | `o` | $O$ | `O` |
| pi | $\pi$ | `\pi` | $\Pi$ | `\Pi` |
| rho | $\rho$ | `\rho` | $P$ | `P` |
| sigma | $\sigma$ | `\sigma` | $\Sigma$ | `\Sigma` |
| tau | $\tau$ | `\tau` | $T$ | `T` |
| upsilon | $\upsilon$ | `\upsilon` | $\Upsilon$ | `\Upsilon` |
| phi | $\phi$ | `\phi` | $\Phi$ | `\Phi` |
| chi | $\chi$ | `\chi` | $X$ | `X` |
| psi | $\psi$ | `\psi` | $\Psi$ | `\Psi` |
| omega | $\omega$ | `\omega` | $\Omega$ | `\Omega` |

常见变体放在一起比较；是否用变体是符号约定，不能仅凭外形推断物理意义。

| 通常形式 → 变体 | 对应源码 |
| --- | --- |
| $\epsilon\;\varepsilon$ | `\epsilon`、`\varepsilon` |
| $\phi\;\varphi$ | `\phi`、`\varphi` |
| $\theta\;\vartheta$ | `\theta`、`\vartheta` |
| $\rho\;\varrho$ | `\rho`、`\varrho` |
| $\sigma\;\varsigma$ | `\sigma`、`\varsigma` |
| $\pi\;\varpi$ | `\pi`、`\varpi` |
| $\kappa\;\varkappa$ | `\kappa`、`\varkappa` |

容易混淆的两组：`\nu` 是希腊字母 $\nu$，`v` 是拉丁字母 $v$；`\rho` 是 $\rho$，`p` 是 $p$。此外 `\Sigma` 是字母 $\Sigma$，求和符号是 `\sum` → $\sum$；`\Pi` 与求积符号 `\prod` 也要区分。

## 四、通用符号、字体与修饰

| 类别 | 显示效果 | 源码 |
| --- | --- | --- |
| 数集 | $\mathbb{N},\mathbb{Z},\mathbb{Q},\mathbb{R},\mathbb{C}$ | `\mathbb{N},\mathbb{Z},\mathbb{Q},\mathbb{R},\mathbb{C}` |
| 集合关系 | $\in,\notin,\subseteq,\subsetneq,\supseteq$ | `\in,\notin,\subseteq,\subsetneq,\supseteq` |
| 集合操作 | $\cup,\cap,\setminus,\varnothing$ | `\cup,\cap,\setminus,\varnothing` |
| 比较 | $\ne,\le,\ge,\approx,\equiv,\propto$ | `\ne,\le,\ge,\approx,\equiv,\propto` |
| 量词与逻辑 | $\forall,\exists,\neg,\land,\lor$ | `\forall,\exists,\neg,\land,\lor` |
| 箭头 | $\to,\mapsto,\Rightarrow,\Leftrightarrow$ | `\to,\mapsto,\Rightarrow,\Leftrightarrow` |
| 运算 | $\pm,\mp,\times,\cdot,\otimes,\oplus$ | `\pm,\mp,\times,\cdot,\otimes,\oplus` |
| 分析与物理 | $\infty,\partial,\nabla,\hbar,\ell$ | `\infty,\partial,\nabla,\hbar,\ell` |
| 省略号 | $\ldots,\cdots,\vdots,\ddots$ | `\ldots,\cdots,\vdots,\ddots` |
| 花体与直立体 | $\mathcal{H},\mathcal{E},\mathrm{i}$ | `\mathcal{H},\mathcal{E},\mathrm{i}` |
| 粗体 | $\mathbf{v},\boldsymbol{\sigma}$ | `\mathbf{v},\boldsymbol{\sigma}` |
| 帽子、波浪线、向量箭头 | $\hat{A},\tilde{\psi},\vec{r}$ | `\hat{A},\tilde{\psi},\vec{r}` |
| 横线、共轭、时间导数 | $\overline{z},z^*,\dot{x},\ddot{x}$ | `\overline{z},z^*,\dot{x},\ddot{x}` |
| 转置、伴随 | $A^{\mathsf{T}},A^\dagger$ | `A^{\mathsf{T}},A^\dagger` |
| 大 O 记号 | $O(n\log n)$ | `O(n\log n)` |
| 向上、向下取整 | $\lceil x\rceil,\lfloor x\rfloor$ | `\lceil x\rceil,\lfloor x\rfloor` |

字体只改变排版，不会替你定义数学对象。`\mathcal{H}` 常表示希尔伯特空间，`\mathcal{E}` 常表示量子操作；`\hat{A}` 是否代表算符，要先约定。希腊字母加粗宜用 `\boldsymbol`。本文将虚数单位写成 `\mathrm{i}`，积分中的微分写成 `\mathrm{d}`，以便与变量区分。

## 五、常用数学结构：每类一个模板

### 分式、根式与正负号

```latex
x=\frac{-b\pm\sqrt{b^2-4ac}}{2a},\qquad a\ne0.
```

$$
x=\frac{-b\pm\sqrt{b^2-4ac}}{2a},\qquad a\ne0.
$$

这是二次方程的求根式。重点是分子整体放进花括号，根号也只覆盖它的参数；`\pm` 表示两种符号选择。

### 复数与指数

```latex
z=r\mathrm{e}^{\mathrm{i}\theta}=r(\cos\theta+\mathrm{i}\sin\theta),\qquad \lvert z\rvert^2=z^*z.
```

$$
z=r\mathrm{e}^{\mathrm{i}\theta}=r(\cos\theta+\mathrm{i}\sin\theta),\qquad \lvert z\rvert^2=z^*z.
$$

指数中的整段内容必须成组。`z^*` 与 `\overline{z}` 都常表示复共轭；对于矩阵，本文用星号表示逐项共轭，用 dagger 表示伴随。

### 求和、求积与组合数

```latex
\begin{aligned}
(a+b)^n &= \sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k,\\
n! &= \prod_{k=1}^{n}k.
\end{aligned}
```

$$
\begin{aligned}
(a+b)^n &= \sum_{k=0}^{n}\binom{n}{k}a^{n-k}b^k,\\
n! &= \prod_{k=1}^{n}k.
\end{aligned}
$$

`\sum`、`\prod` 后的 `_` 和 `^` 指定下限、上限；`\binom{n}{k}` 是组合数。这里 n 是正整数。复杂的求和条件可写 `\sum_{\substack{i,j\\i<j}}`。

### 极限、导数、偏导数

```latex
\begin{aligned}
f'(x) &= \lim_{h\to0}\frac{f(x+h)-f(x)}{h},\\
\nabla f &= \begin{pmatrix}\frac{\partial f}{\partial x}\\\frac{\partial f}{\partial y}\end{pmatrix}.
\end{aligned}
```

$$
\begin{aligned}
f'(x) &= \lim_{h\to0}\frac{f(x+h)-f(x)}{h},\\
\nabla f &= \begin{pmatrix}\frac{\partial f}{\partial x}\\\frac{\partial f}{\partial y}\end{pmatrix}.
\end{aligned}
$$

第一行以极限存在为前提。普通导数还可写 `\frac{\mathrm{d}f}{\mathrm{d}x}`，偏导用 `\partial`。第二行明确将二维梯度写为列向量。

### 积分与微分间距

```latex
\int_{-\infty}^{\infty}\mathrm{e}^{-x^2}\,\mathrm{d}x=\sqrt{\pi}.
```

$$
\int_{-\infty}^{\infty}\mathrm{e}^{-x^2}\,\mathrm{d}x=\sqrt{\pi}.
$$

`\int` 后接积分上下限；`\,` 在被积函数与微分之间留小间距。二重积分、闭合路径积分分别用 `\iint`、`\oint`，不必重新学习一套语法。

### 分段函数

```latex
\lvert x\rvert=
\begin{cases}
x, & x\ge0,\\
-x, & x<0.
\end{cases}
```

$$
\lvert x\rvert=
\begin{cases}
x, & x\ge0,\\
-x, & x<0.
\end{cases}
$$

`cases` 自带左花括号；`&` 左边是表达式，右边是条件，`\\` 分行。文字条件可以用 `\text{otherwise}`。

### 矩阵、列向量与行列式

```latex
A=\begin{bmatrix}a&b\\c&d\end{bmatrix},\qquad
v=\begin{pmatrix}x\\y\end{pmatrix},\qquad
\det A=\begin{vmatrix}a&b\\c&d\end{vmatrix}=ad-bc.
```

$$
A=\begin{bmatrix}a&b\\c&d\end{bmatrix},\qquad
v=\begin{pmatrix}x\\y\end{pmatrix},\qquad
\det A=\begin{vmatrix}a&b\\c&d\end{vmatrix}=ad-bc.
$$

`&` 分列，`\\` 分行；每行列数应一致。`matrix` 无外括号，`pmatrix` 用圆括号，`bmatrix` 用方括号，`vmatrix` 用单竖线。列向量每行只有一个元素。

### 内积、范数与正交性

```latex
\langle u,v\rangle=\sum_{j=1}^{d}u_j^*v_j,\qquad
\lVert v\rVert=\sqrt{\langle v,v\rangle},\qquad
\langle e_i,e_j\rangle=\delta_{ij}.
```

$$
\langle u,v\rangle=\sum_{j=1}^{d}u_j^*v_j,\qquad
\lVert v\rVert=\sqrt{\langle v,v\rangle},\qquad
\langle e_i,e_j\rangle=\delta_{ij}.
$$

采用物理中常用的约定：内积对第一个参数共轭线性，对第二个参数线性。`\delta_{ij}` 是 Kronecker δ，i=j 时为 1，否则为 0；它与连续变量中的 Dirac δ 函数不同。

### 条件概率、期望与方差

```latex
\begin{aligned}
P(A\mid B)&=\frac{P(B\mid A)P(A)}{P(B)},\\
\mathbb{E}[X]&=\sum_x x\,p(x),\\
\operatorname{Var}(X)&=\mathbb{E}[X^2]-\mathbb{E}[X]^2.
\end{aligned}
```

$$
\begin{aligned}
P(A\mid B)&=\frac{P(B\mid A)P(A)}{P(B)},\\
\mathbb{E}[X]&=\sum_x x\,p(x),\\
\operatorname{Var}(X)&=\mathbb{E}[X^2]-\mathbb{E}[X]^2.
\end{aligned}
$$

第一行写法要求相关条件概率有定义，尤其 P(B)>0；第二、三行针对实值离散随机变量，且相应矩存在。`\mid` 自动提供合适的条件分隔间距。

## 六、量子计算记号：先统一约定

本节与 Nielsen–Chuang 常用约定保持一致：计算基从 0 开始编号，$Z\lvert0\rangle=\lvert0\rangle$、$Z\lvert1\rangle=-\lvert1\rangle$；$\oplus$ 在比特表达式里表示模 2 加法；信息量中的对数取 2 为底。原书也提醒 $H$ 可能表示 Hadamard 门或哈密顿量，要根据上下文区分。这些约定可对照出版社提供的[原版书前符号说明，第 xxiii–xxv 页](https://assets.cambridge.org/97805216/35035/frontmatter/9780521635035_frontmatter.pdf)。

以下以有限维复希尔伯特空间为背景；书中符号的 LaTeX 输入方式、解释与示例在这里重新整理。不要把某一个字母与某一种物理意义永久绑定，例如 $\sigma$ 既可能表示 Pauli 矩阵，也可能表示另一个密度算符。

### 核心记号速查

| 含义 | 显示效果 | 源码 |
| --- | --- | --- |
| ket／右矢 | $\lvert\psi\rangle$ | `\lvert\psi\rangle` |
| bra／左矢 | $\langle\psi\rvert$ | `\langle\psi\rvert` |
| 内积／概率振幅 | $\langle\phi\mid\psi\rangle$ | `\langle\phi\mid\psi\rangle` |
| 外积／秩至多为 1 的算符 | $\lvert\psi\rangle\langle\phi\rvert$ | `\lvert\psi\rangle\langle\phi\rvert` |
| 矩阵元 | $\langle i\rvert A\lvert j\rangle$ | `\langle i\rvert A\lvert j\rangle` |
| 复共轭、转置、伴随 | $A^*,A^{\mathsf{T}},A^\dagger$ | `A^*,A^{\mathsf{T}},A^\dagger` |
| 单位算符 | $I,I_d$ | `I,I_d` |
| 张量积、张量幂 | $A\otimes B,A^{\otimes n}$ | `A\otimes B,A^{\otimes n}` |
| 直和 | $\mathcal{H}_A\oplus\mathcal{H}_B$ | `\mathcal{H}_A\oplus\mathcal{H}_B` |
| 迹、偏迹 | $\operatorname{tr}(A),\operatorname{tr}_B(\rho_{AB})$ | `\operatorname{tr}(A),\operatorname{tr}_B(\rho_{AB})` |
| 对易子、反对易子 | $[A,B],\{A,B\}$ | `[A,B],\{A,B\}` |
| 密度算符、量子操作 | $\rho,\mathcal{E}$ | `\rho,\mathcal{E}` |
| 支撑空间、核 | $\operatorname{supp}(A),\ker(A)$ | `\operatorname{supp}(A),\ker(A)` |
| 正半定 | $A\ge0$ 或 $A\succeq0$ | `A\ge0` 或 `A\succeq0` |
| 限制到某个子空间 | $A\rvert_{\mathcal{S}}$ | `A\rvert_{\mathcal{S}}` |

`\lvert` 是左竖线、`\rvert` 是右竖线、`\langle` 和 `\rangle` 是尖括号。不要用普通 `<`、`>` 代替尖括号，它们是大小关系符，间距不同。这里采用显式命令，便于跨环境复制；不能假定其他网站也支持 `\ket`、`\bra` 或 `physics` 宏包命令。

`\oplus` 的含义依上下文而变：比特之间是异或，空间之间是直和。矩阵的 $A\ge0$ 是正半定意义，并不是“每个矩阵元非负”。对 Hermitian 算符，支撑空间是核的正交补，也就是非零特征值对应的特征向量所张成的空间。

### 量子态、归一化与 bra

```latex
\begin{aligned}
\lvert\psi\rangle&=\alpha\lvert0\rangle+\beta\lvert1\rangle
=\begin{bmatrix}\alpha\\\beta\end{bmatrix},\\
\langle\psi\rvert&=\begin{bmatrix}\alpha^*&\beta^*\end{bmatrix},\\
\langle\psi\mid\psi\rangle&=\lvert\alpha\rvert^2+\lvert\beta\rvert^2=1.
\end{aligned}
```

$$
\begin{aligned}
\lvert\psi\rangle&=\alpha\lvert0\rangle+\beta\lvert1\rangle
=\begin{bmatrix}\alpha\\\beta\end{bmatrix},\\
\langle\psi\rvert&=\begin{bmatrix}\alpha^*&\beta^*\end{bmatrix},\\
\langle\psi\mid\psi\rangle&=\lvert\alpha\rvert^2+\lvert\beta\rvert^2=1.
\end{aligned}
$$

这里 α、β 是复数，bra 是 ket 的共轭转置，不是只把列向量横过来。内积得到标量，外积得到算符；例如 `\lvert0\rangle\langle1\rvert` 对应矩阵 $\begin{bmatrix}0&1\\0&0\end{bmatrix}$。

### 多比特态、张量积与 Bell 态

```latex
\begin{aligned}
\lvert\psi\rangle&=\sum_{x=0}^{2^n-1}c_x\lvert x\rangle,
&\sum_x\lvert c_x\rvert^2&=1,\\
\lvert\Phi^+\rangle&=\frac{\lvert00\rangle+\lvert11\rangle}{\sqrt{2}},
&\lvert00\rangle&=\lvert0\rangle\otimes\lvert0\rangle.
\end{aligned}
```

$$
\begin{aligned}
\lvert\psi\rangle&=\sum_{x=0}^{2^n-1}c_x\lvert x\rangle,
&\sum_x\lvert c_x\rvert^2&=1,\\
\lvert\Phi^+\rangle&=\frac{\lvert00\rangle+\lvert11\rangle}{\sqrt{2}},
&\lvert00\rangle&=\lvert0\rangle\otimes\lvert0\rangle.
\end{aligned}
$$

第一行 x 是 n 位比特串对应的整数标签，空间维数为 $2^n$。`\otimes` 表示组合系统，`\lvert0\rangle^{\otimes n}` 表示 n 个同样的 ket 的张量积；它不同于普通数值幂。张量因子的顺序不能随意交换。

### 伴随、Hermitian、酉与谱分解

```latex
\begin{aligned}
A^\dagger&=(A^*)^{\mathsf{T}},
& (AB)^\dagger&=B^\dagger A^\dagger,\\
A&=A^\dagger,
& U^\dagger U&=UU^\dagger=I,\\
A&=\sum_j a_j\lvert a_j\rangle\langle a_j\rvert,
& I&=\sum_j\lvert a_j\rangle\langle a_j\rvert.
\end{aligned}
```

$$
\begin{aligned}
A^\dagger&=(A^*)^{\mathsf{T}},
& (AB)^\dagger&=B^\dagger A^\dagger,\\
A&=A^\dagger,
& U^\dagger U&=UU^\dagger=I,\\
A&=\sum_j a_j\lvert a_j\rangle\langle a_j\rvert,
& I&=\sum_j\lvert a_j\rangle\langle a_j\rvert.
\end{aligned}
$$

第二行分别是 Hermitian 算符 A 与酉算符 U 的条件，不能对任意矩阵都使用。第三行对 Hermitian A 选取一组完整的正交归一特征基，特征值 $a_j$ 为实数；有简并时仍可按基向量逐项求和。

### 对易子与反对易子

```latex
[A,B]=AB-BA,\qquad \{A,B\}=AB+BA,\qquad [X,Y]=2\mathrm{i}Z.
```

$$
[A,B]=AB-BA,\qquad \{A,B\}=AB+BA,\qquad [X,Y]=2\mathrm{i}Z.
$$

这里 X、Y、Z 为下一节的 Pauli 矩阵。`\{`、`\}` 才会显示花括号；普通 `{...}` 是语法分组。非对易矩阵的乘法顺序必须保留。

## 七、常见量子门与电路记号

### Pauli、Hadamard 与相位门

使用标准计算基顺序 $\lvert0\rangle,\lvert1\rangle$。Pauli 记号可互换：$X=\sigma_x=\sigma_1$、$Y=\sigma_y=\sigma_2$、$Z=\sigma_z=\sigma_3$，以及 $I=\sigma_0$。

### 单比特门矩阵

```latex
\begin{aligned}
X&=\begin{bmatrix}0&1\\1&0\end{bmatrix},
&Y&=\begin{bmatrix}0&-\mathrm{i}\\\mathrm{i}&0\end{bmatrix},
&Z&=\begin{bmatrix}1&0\\0&-1\end{bmatrix},\\
H&=\frac{1}{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix},
&S&=\begin{bmatrix}1&0\\0&\mathrm{i}\end{bmatrix},
&T&=\begin{bmatrix}1&0\\0&\mathrm{e}^{\mathrm{i}\pi/4}\end{bmatrix}.
\end{aligned}
```

$$
\begin{aligned}
X&=\begin{bmatrix}0&1\\1&0\end{bmatrix},
&Y&=\begin{bmatrix}0&-\mathrm{i}\\\mathrm{i}&0\end{bmatrix},
&Z&=\begin{bmatrix}1&0\\0&-1\end{bmatrix},\\
H&=\frac{1}{\sqrt2}\begin{bmatrix}1&1\\1&-1\end{bmatrix},
&S&=\begin{bmatrix}1&0\\0&\mathrm{i}\end{bmatrix},
&T&=\begin{bmatrix}1&0\\0&\mathrm{e}^{\mathrm{i}\pi/4}\end{bmatrix}.
\end{aligned}
$$

这些矩阵集中展示，不为每个门重复介绍矩阵语法。T 常称 π/8 门，但这里矩阵的相对相位是 π/4；它满足 $T^2=S$、$S^2=Z$。门 T 与转置上标 $\mathsf{T}$ 要按位置区分。

### 旋转门与 Bloch 向量

```latex
\begin{aligned}
R_{\hat{n}}(\theta)&=\mathrm{e}^{-\mathrm{i}\theta\hat{n}\cdot\boldsymbol{\sigma}/2},\\
\rho&=\frac{I+\vec{r}\cdot\boldsymbol{\sigma}}{2},
\qquad \lVert\vec{r}\rVert\le1.
\end{aligned}
```

$$
\begin{aligned}
R_{\hat{n}}(\theta)&=\mathrm{e}^{-\mathrm{i}\theta\hat{n}\cdot\boldsymbol{\sigma}/2},\\
\rho&=\frac{I+\vec{r}\cdot\boldsymbol{\sigma}}{2},
\qquad \lVert\vec{r}\rVert\le1.
\end{aligned}
$$

这里 $\hat{n}$ 是实单位向量，$\boldsymbol{\sigma}=(X,Y,Z)$，点积表示 $n_xX+n_yY+n_zZ$。第二行是单比特密度矩阵的 Bloch 表示；纯态时向量长度为 1。帽子在此表示单位方向，并不是算符标记。

### 受控门、异或与多比特门

```latex
\begin{aligned}
C(U)&=\lvert0\rangle\langle0\rvert\otimes I
+\lvert1\rangle\langle1\rvert\otimes U,\\
\operatorname{CNOT}\lvert a,b\rangle&=\lvert a,a\oplus b\rangle,\\
\operatorname{SWAP}\lvert a,b\rangle&=\lvert b,a\rangle,\\
\operatorname{Toffoli}\lvert a,b,c\rangle&=\lvert a,b,c\oplus ab\rangle.
\end{aligned}
```

$$
\begin{aligned}
C(U)&=\lvert0\rangle\langle0\rvert\otimes I
+\lvert1\rangle\langle1\rvert\otimes U,\\
\operatorname{CNOT}\lvert a,b\rangle&=\lvert a,a\oplus b\rangle,\\
\operatorname{SWAP}\lvert a,b\rangle&=\lvert b,a\rangle,\\
\operatorname{Toffoli}\lvert a,b,c\rangle&=\lvert a,b,c\oplus ab\rangle.
\end{aligned}
$$

其中 a、b、c 为 0 或 1；ab 是比特乘积。第一比特为控制位，U 作用在目标系统。取 U=X、Z、S，分别得到 CNOT、受控 Z、受控相位门；Fredkin 门为受控 SWAP。这样一个模板即可表达一族受控门。

### 读电路图时的符号

| 电路图中的形状 | 含义 | 在正文中怎样写 |
| --- | --- | --- |
| 标有 H、X、U 的方框 | 对该导线上的系统施加门 | `$H$`、`$X$`、`$U$` |
| 实心控制点连接目标门 | 控制比特为 1 时执行 | `$C(U)$` |
| 实心点连接圈加号 | CNOT | `$\operatorname{CNOT}$`，圈加号可单独写 `$\oplus$` |
| 两个相连的叉号 | SWAP | `$\operatorname{SWAP}$`，叉号可单独写 `$\times$` |
| 两控制点连接圈加号 | Toffoli | `$\operatorname{Toffoli}$` |
| 控制点连接交换符号 | Fredkin | `$\operatorname{Fredkin}$` |
| 仪表状测量框 | 测量 | 正文用测量算符 `$M_m$` 表达 |
| 单线／双线 | 量子比特／经典比特 | 在正文标注系统与测量结果 |
| 导线上斜杠及 n | n 个量子比特的线束 | `$n$` 或寄存器名 |

这张表帮助读图；输入一个 `\oplus` 并不会自动生成完整电路。当前 KaTeX 配置不提供 `quantikz`、TikZ 或 Qcircuit 的电路绘图编译，复杂电路宜先生成 SVG 等图片后插入文章。

## 八、测量、演化、密度算符与信道

### 一般测量、Born 概率与测后态

```latex
\begin{aligned}
\sum_m M_m^\dagger M_m&=I,\\
p(m)&=\langle\psi\rvert M_m^\dagger M_m\lvert\psi\rangle,\\
\lvert\psi_m\rangle&=\frac{M_m\lvert\psi\rangle}{\sqrt{p(m)}}.
\end{aligned}
```

$$
\begin{aligned}
\sum_m M_m^\dagger M_m&=I,\\
p(m)&=\langle\psi\rvert M_m^\dagger M_m\lvert\psi\rangle,\\
\lvert\psi_m\rangle&=\frac{M_m\lvert\psi\rangle}{\sqrt{p(m)}}.
\end{aligned}
$$

最后一行只在 $p(m)>0$ 时定义。POVM 元素写作 $E_m=M_m^\dagger M_m$，满足 $E_m\ge0$、$\sum_mE_m=I$；仅给出 POVM 不能唯一确定测后态。投影测量是 $M_m=P_m$ 的特例。

### 期望值与不确定度

```latex
\langle A\rangle_\psi=\langle\psi\rvert A\lvert\psi\rangle,
\qquad (\Delta A)^2=\langle A^2\rangle_\psi-\langle A\rangle_\psi^2.
```

$$
\langle A\rangle_\psi=\langle\psi\rvert A\lvert\psi\rangle,
\qquad (\Delta A)^2=\langle A^2\rangle_\psi-\langle A\rangle_\psi^2.
$$

这里 A 是 Hermitian 可观测量，态已归一化。`\Delta` 是大写字母，不是一个自动求差命令；右侧明确规定了这里的方差含义。混态期望值用 $\operatorname{tr}(\rho A)$。

### 薛定谔方程与时间演化

```latex
\begin{aligned}
\mathrm{i}\hbar\frac{\mathrm{d}}{\mathrm{d}t}\lvert\psi(t)\rangle
&=H\lvert\psi(t)\rangle,\\
\lvert\psi(t)\rangle&=U(t)\lvert\psi(0)\rangle,
\qquad U(t)=\mathrm{e}^{-\mathrm{i}Ht/\hbar}.
\end{aligned}
```

$$
\begin{aligned}
\mathrm{i}\hbar\frac{\mathrm{d}}{\mathrm{d}t}\lvert\psi(t)\rangle
&=H\lvert\psi(t)\rangle,\\
\lvert\psi(t)\rangle&=U(t)\lvert\psi(0)\rangle,
\qquad U(t)=\mathrm{e}^{-\mathrm{i}Ht/\hbar}.
\end{aligned}
$$

这里 H 是哈密顿量；第二行的指数形式假设 H 不随时间变化，初始时刻为 0。不要把任意含时哈密顿量直接塞进这一形式。`\hbar` 输入约化普朗克常数。

### 混合态与偏迹

```latex
\begin{aligned}
\rho&=\sum_jp_j\lvert\psi_j\rangle\langle\psi_j\rvert,
\qquad p_j\ge0,\quad\sum_jp_j=1,\\
\rho&\ge0,\qquad \operatorname{tr}(\rho)=1,\\
\rho_A&=\operatorname{tr}_B(\rho_{AB}),\\
\operatorname{tr}_B\!\left(\lvert\Phi^+\rangle\langle\Phi^+\rvert\right)&=\frac{I_2}{2}.
\end{aligned}
```

$$
\begin{aligned}
\rho&=\sum_jp_j\lvert\psi_j\rangle\langle\psi_j\rvert,
\qquad p_j\ge0,\quad\sum_jp_j=1,\\
\rho&\ge0,\qquad \operatorname{tr}(\rho)=1,\\
\rho_A&=\operatorname{tr}_B(\rho_{AB}),\\
\operatorname{tr}_B\!\left(\lvert\Phi^+\rangle\langle\Phi^+\rvert\right)&=\frac{I_2}{2}.
\end{aligned}
$$

各 $\lvert\psi_j\rangle$ 已归一化，不必相互正交；同一个密度算符可以有不同的系综分解。偏迹下标 B 表示消去 B、保留 A。最后一行说明整体纯态的子系统可以是混态。

### 量子信道的 Kraus 表示

```latex
\mathcal{E}(\rho)=\sum_k E_k\rho E_k^\dagger,\qquad \sum_k E_k^\dagger E_k=I.
```

$$
\mathcal{E}(\rho)=\sum_k E_k\rho E_k^\dagger,\qquad \sum_k E_k^\dagger E_k=I.
$$

这是完全正且保迹的量子信道的表示，$E_k$ 是 Kraus 算符，也常记作 $K_k$。本段的 $E_k$ 不等于上一节的 POVM 元素：符号相似不代表定义相同。

## 九、量子信息量与算法中的常见写法

### Shannon 熵、von Neumann 熵与相对熵

```latex
\begin{aligned}
H(X)&=-\sum_xp_x\log_2p_x,\\
S(\rho)&=-\operatorname{tr}(\rho\log_2\rho),\\
S(\rho\Vert\sigma)&=\operatorname{tr}\bigl[\rho(\log_2\rho-\log_2\sigma)\bigr],\\
S(A\mid B)&=S(\rho_{AB})-S(\rho_B).
\end{aligned}
```

$$
\begin{aligned}
H(X)&=-\sum_xp_x\log_2p_x,\\
S(\rho)&=-\operatorname{tr}(\rho\log_2\rho),\\
S(\rho\Vert\sigma)&=\operatorname{tr}\bigl[\rho(\log_2\rho-\log_2\sigma)\bigr],\\
S(A\mid B)&=S(\rho_{AB})-S(\rho_B).
\end{aligned}
$$

取 $0\log_2 0=0$。量子相对熵的有限表达要求 $\operatorname{supp}(\rho)\subseteq\operatorname{supp}(\sigma)$，否则定义为正无穷；算符对数通过谱分解定义。`\Vert` 在相对熵中分隔两个参数，不表示范数。最后一行是量子条件熵，它可以为负。

### 迹距离与保真度

```latex
\begin{aligned}
D(\rho,\sigma)&=\frac12\operatorname{tr}\lvert\rho-\sigma\rvert,
\qquad \lvert A\rvert=\sqrt{A^\dagger A},\\
F(\rho,\sigma)&=\operatorname{tr}\sqrt{\sqrt{\rho}\,\sigma\sqrt{\rho}},\\
F(\lvert\psi\rangle,\lvert\phi\rangle)&=\lvert\langle\psi\mid\phi\rangle\rvert.
\end{aligned}
```

$$
\begin{aligned}
D(\rho,\sigma)&=\frac12\operatorname{tr}\lvert\rho-\sigma\rvert,
\qquad \lvert A\rvert=\sqrt{A^\dagger A},\\
F(\rho,\sigma)&=\operatorname{tr}\sqrt{\sqrt{\rho}\,\sigma\sqrt{\rho}},\\
F(\lvert\psi\rangle,\lvert\phi\rangle)&=\lvert\langle\psi\mid\phi\rangle\rvert.
\end{aligned}
$$

这里采用 Nielsen–Chuang 的未平方保真度约定；另一些资料与软件把上式的平方定义为保真度，使用前要核对。[IBM Quantum 的保真度说明](https://quantum.cloud.ibm.com/learning/en/courses/general-formulation-of-quantum-information/purifications-and-fidelity/fidelity)也明确区分这两种约定。最后一行把纯态密度算符简写为 ket 参数。第一行的算符绝对值是正算符平方根，不是逐元素取绝对值。

### 量子 Fourier 变换与二进制小数

```latex
\operatorname{QFT}_N\lvert j\rangle
=\frac{1}{\sqrt{N}}\sum_{k=0}^{N-1}\mathrm{e}^{2\pi\mathrm{i}jk/N}\lvert k\rangle,
\qquad N=2^n.
```

$$
\operatorname{QFT}_N\lvert j\rangle
=\frac{1}{\sqrt{N}}\sum_{k=0}^{N-1}\mathrm{e}^{2\pi\mathrm{i}jk/N}\lvert k\rangle,
\qquad N=2^n.
$$

这里 $0\le j<N$，采用正指数约定。二进制小数可写 `0.j_1j_2\cdots j_n`，其值为 $\sum_{r=1}^n j_r2^{-r}$；小数点后的字符串不是变量相乘。模运算可写 `a\equiv b\pmod N` → $a\equiv b\pmod N$。

### 纠错码与稳定子记号

```latex
\lvert0_L\rangle=\lvert000\rangle,\qquad
\lvert1_L\rangle=\lvert111\rangle,\qquad
g\lvert\psi_L\rangle=\lvert\psi_L\rangle\quad(g\in\mathcal{S}).
```

$$
\lvert0_L\rangle=\lvert000\rangle,\qquad
\lvert1_L\rangle=\lvert111\rangle,\qquad
g\lvert\psi_L\rangle=\lvert\psi_L\rangle\quad(g\in\mathcal{S}).
$$

前两个式子是三比特重复编码的逻辑基态，针对比特翻转错误，不是任意单比特错误。下标 L 表示逻辑态，$\mathcal{S}$ 表示稳定子群；`\lvert\psi_L\rangle` 中下标只属于 ψ，不属于整个括号。

## 十、常见错误与写作检查

| 现象 | 常见原因 | 修正方法 |
| --- | --- | --- |
| 网页直接显示 `$...$` | 渲染器未启用数学扩展，或公式被放进代码块 | 检查平台支持与反引号 |
| 上下标只有第一个字符升降 | 少了分组花括号 | 写 `x^{10}`、`a_{ij}` |
| `Undefined control sequence` | 拼错命令、大小写错误，或依赖未支持的宏包 | 查命令支持表；用基础命令组合 |
| `Missing }` 或括号不匹配 | 花括号少一半、`\left` 无对应 `\right` | 从内向外检查配对 |
| 公式后一段消失 | `%` 把后续内容当成注释 | 百分号写 `\%` |
| 推导不换行 | 只在源码里按了回车 | 用 `aligned` 和 `\\` |
| 表格突然多出列 | 数学表达式中的竖线被 Markdown 解析 | 改用 `\lvert`、`\rvert`、`\mid` |
| 函数像变量连乘 | 直接写了 `sin`、`tr` | 写 `\sin`、`\operatorname{tr}` |
| 行内公式撑大行距 | 分数、矩阵或上下限过长 | 移到独立公式；勿滥用 `\dfrac` |
| 手机页面横向溢出 | 一行公式过长 | 按数学关系拆成 `aligned`；长块可横向滚动 |

实际写作时按下面顺序检查即可：

1. 先确定数学含义与符号约定，再决定行内或独立排版。
2. 检查 `{}`、上下标、分子分母，以及 `\left`／`\right` 的配对。
3. 确认 `&` 用于分列或对齐，`\\` 用于环境内换行。
4. 对量子公式再检查共轭、伴随、矩阵乘法次序、归一化，以及概率是否用了振幅模平方。
5. 在博客预览中查看实际效果；能渲染不等于公式一定正确。

## 参考资料与后续查阅

- Nielsen 与 Chuang：[《Quantum Computation and Quantum Information》符号说明章节](https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE/nomenclature-and-notation/048A9370E08AF738040454149C4F6628)，以及前文链接的出版社公开书前材料。
- [KaTeX Supported Functions](https://katex.org/docs/supported.html)：按类别查字母、关系符、括号、矩阵与排版命令。
- [KaTeX Support Table](https://katex.org/docs/support_table.html)：查某个具体命令是否受支持。
- [remark-math](https://github.com/remarkjs/remark-math)：本博客使用的 Markdown 数学语法扩展。

先记住 `$`、`$$`、`{}`、`_`、`^`、`\frac`、`&`、`\\`，再熟悉希腊字母和 bra-ket 的组合；其余符号遇到时按表查询即可。
