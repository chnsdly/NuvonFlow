# AGENTS.md

## Project Purpose

This repository is used to build the international website for **Nuvon Flow Control**.

The main goals are:

1. Help target customers quickly understand the industries, applications, and operating conditions Nuvon serves.
2. Keep important commercial and technical SEO content directly visible in the generated HTML.
3. Use Hugo as the core static site generator and avoid unnecessary client-side complexity.
4. Maintain a code structure that Codex can safely extend module by module in future tasks.

## Technology Stack

* Hugo
* GitHub
* Cloudflare Pages
* Cloudflare CDN
* Cloudflare Pages Functions or Workers
* Cloudflare D1
* Cloudflare Turnstile
* SCSS
* BEM

## General Development Principles

1. Stabilize structure before refining visual details.
2. Prioritize maintainability, readability, and verifiability over clever or overly complex solutions.
3. Do not introduce large frontend frameworks unless there is a clear, necessary, and approved reason.
4. Critical SEO content must be server-rendered and visible in HTML. Do not rely on client-side JavaScript to render essential content.
5. Each task must focus on one clear objective. Avoid broad cross-module changes.
6. Before modifying code, understand the existing directory structure, template hierarchy, and partial relationships. Do not casually refactor the whole site.

## Directory Rules

The repository already has a base directory structure. When modifying, adding, or moving code, work within the existing structure by default. Do not redesign the directory architecture based on personal preference.

A new directory may be added only when all of the following are true:

* The existing directories cannot reasonably contain the new responsibility.
* The new directory has a clear and limited purpose.
* The new directory does not duplicate the role of an existing directory.
* The final response explains why the new directory was added.

## Hugo Rules

1. Keep responsibilities separated between content, templates, components, assets, and configuration.
2. For internal menu links, prefer `pageRef`.
3. Use `url` for external links, anchor links, and file links.
4. Do not modify foundational Hugo settings during ordinary page or component work unless the task explicitly requires it. This includes multilingual settings, taxonomies, outputs, permalinks, robots, and sitemap configuration.

## SCSS Rules

1. `abstracts` is for design tokens, mixins, functions, and other abstract utilities.
2. `base` is for reset styles, global element defaults, and a small number of global helper styles.
3. `layout` is for site-level structure such as header, footer, grid wrappers, and major layout shells.
4. `components` is for reusable UI components.
5. `pages` is for page-specific styles. Page styles must not leak back into the component layer.
6. Do not scatter unexplained hard-coded values. Prefer design tokens, CSS custom properties, and the shared spacing scale.
7. BEM class names must stay within the boundary of the component or module that owns them. Do not create cross-component naming or style one component through another component’s selector.

## Semantics and Accessibility

1. Use semantic regions such as `header`, `nav`, `main`, and `footer`.
2. Maintain a logical heading hierarchy. Do not skip heading levels without a valid reason.
3. Form controls must have associated labels.
4. Interactive elements must have a clear focus state.
5. Keep reduced-motion support in mind when adding motion or transitions.
6. Images must have appropriate `alt` text. Purely decorative images must use an empty `alt`.

## SEO Rules

1. Each page must have one clear primary topic.
2. URLs must be short, stable, and readable.
3. Page title, meta description, H1, breadcrumbs, internal links, and structured data must describe the same page intent.
4. Multilingual pages must account for a proper `hreflang` strategy.
5. Product pages, application pages, and technical article pages must form a logical internal linking network.
6. Structured data must match content that is actually visible on the page.
7. Do not stuff keywords for SEO.

## Assets and Performance

1. Prefer Hugo’s asset pipeline for organizing and processing images and static assets.
2. Do not add heavy JavaScript dependencies to solve small problems.
3. If a problem can be solved cleanly with CSS, do not default to JavaScript.
4. Product images, certificate images, factory images, and social media images must follow a clear generation and naming strategy.

## Forms and Cloudflare Rules

1. Keep frontend form behavior separate from backend validation logic.
2. Turnstile is only responsible for the frontend challenge and token collection. The server must verify the token.
3. Do not hard-code D1 bindings, environment variables, secrets, or database IDs in the repository.
4. Prefer placing Functions under a clear `/functions/api/` path.
5. If using the advanced `_worker.js` mode, explain why the standard `/functions` approach is not sufficient.

## Execution Rules for Codex

1. Before making changes, list the files that will be modified.
2. After completing the task, provide validation results or explain what could not be completed.
3. If requirements conflict or information is missing, do not invent a new architecture. Refer back to the relevant research or planning document.
4. Do not modify files unrelated to the current task.
5. Do not break modules that already pass validation.

## Minimum Acceptance Criteria

1. Hugo builds successfully.
2. Main templates and partials have clear responsibilities.
3. Key pages are usable on both desktop and mobile.
4. Critical SEO content is visible in the generated HTML.
5. Form flow boundaries are clear.
6. There are no obvious accessibility issues.
