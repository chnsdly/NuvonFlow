
## 项目目标
本项目用于构建 Nuvon Flow Control 的国际官网。
核心目标：
1. 让目标客户快速理解公司服务的行业与工况能力。
2. 让重要商业与技术 SEO 内容直接出现在 HTML 中。
3. 让网站以 Hugo 静态站为核心，少依赖复杂前端逻辑。
4. 让代码结构适合后续由 Codex 分模块迭代维护。

## 技术栈
- Hugo
- GitHub
- Cloudflare Pages
- Cloudflare CDN
- Cloudflare Pages Functions 或 Workers
- Cloudflare D1
- Cloudflare Turnstile
- SCSS
- BEM

## 开发总原则
1. 先稳定结构，再补视觉细节。
2. 优先可维护、可读、可验证，不追求炫技。
3. 不引入大型前端框架，除非有明确、必要、被批准的理由。
4. 关键 SEO 内容必须服务端可见，不依赖客户端 JS 渲染。
5. 每次任务只做一个明确目标，避免跨模块大改。
6. 修改前先理解现有目录和 partial 关系，不得随意重构全站。

## 目录约束
当前仓库已有明确目录，优先遵守现有目录，不得擅自推翻。

## Hugo 规则
1. 任何新增页面类型，都要说明其 content type、模板归属、front matter 字段。
2. 多语言相关配置优先使用 languages.* 与 locale。
3. 内部菜单链接优先使用 pageRef。
4. 需要新 taxonomy 时，必须同步检查默认 taxonomy 是否保留。
5. 修改 outputs、permalinks、robots、sitemap 时，必须说明影响范围。
6. 页面模板、列表模板、partial、baseof 的职责必须清楚。

## SCSS 规则
1. abstracts 只放 tokens、mixins、函数等抽象能力。
2. base 只放 reset、全局元素基础样式、少量全局辅助样式。
3. layout 只放站点级骨架，例如 header、footer、grid 外壳。
4. components 只放可复用组件。
5. pages 只放页面级样式，不得反向污染组件层。
6. 禁止无说明地写大量 magic numbers；优先使用 token 与统一 spacing 体系。
7. BEM 只在组件或模块上下文内使用，避免跨组件命名。

## 语义与可访问性
1. 使用 header、nav、main、footer 等语义区域。
2. 标题层级必须合理，不要跳级。
3. 表单控件必须有可关联的标签。
4. 交互控件必须具备清晰焦点态。
5. 保留 reduced-motion 兼容思路。
6. 图片必须有合适的 alt；纯装饰图使用空 alt。

## SEO 规则
1. 每个页面必须只有一个明确主主题。
2. URL 必须短、稳定、可读。
3. 标题、描述、H1、面包屑、内链、结构化数据要互相一致。
4. 多语言页面必须考虑 hreflang 策略。
5. 产品页、应用页、技术文章页之间必须形成可解释的内链网络。
6. 结构化数据必须对应真实可见内容。
7. 不得为了 SEO 堆砌关键词。

## 资源与性能
1. 优先使用 Hugo 资源处理能力组织图片与静态资源。
2. 不得为小问题引入重型 JS 依赖。
3. 能用 CSS 解决的问题，不优先用 JS。
4. 产品图、证书图、工厂图、社媒图要有明确生成与命名策略。

## 表单与 Cloudflare 规则
1. 前端表单与后端验证逻辑分离。
2. Turnstile 只负责前端挑战与 token 采集，服务端必须验证。
3. D1 绑定、环境变量、密钥和数据库 ID 不写死在仓库中。
4. Functions 优先放在清晰的 /functions/api/ 路径下。
5. 若使用高级模式 _worker.js，必须说明为什么普通 /functions 方案不够用。

## 执行规则
1. 每次 Codex 任务都要先列出将修改的文件。
2. 任务完成后必须给出验证结果或未完成原因。
3. 如发现需求冲突或信息不足，不要私自发明新架构，先回指对应研究文件。
4. 不要修改与当前任务无关的文件。
5. 不要破坏既有通过验证的模块。

## 最低验收标准
1. Hugo 能成功构建。
2. 主要模板与 partial 无明显职责混乱。
3. 关键页面在桌面端与移动端均可用。
4. 关键 SEO 内容在 HTML 可见。
5. 表单链路边界清楚。
6. 无明显无障碍硬伤。
