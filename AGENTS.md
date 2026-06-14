# AGENTS.md

## Mission

Build the Nuvon Flow Control website as a qualified inquiry and RFQ acquisition system.

Success means a buyer or engineer can quickly understand:

1. What Nuvon supports.
2. Which product family or application path may fit.
3. What duty conditions and documents are needed.
4. How to submit an RFQ or contact Nuvon.

Do not treat the site as a decorative company brochure.

## Stack

Use the existing Hugo multilingual static site with SCSS and BEM. Deployment target is Cloudflare Pages, with future Cloudflare Pages Functions or Workers for forms.

Do not add large frontend frameworks or heavy JavaScript unless explicitly approved.

## Working Rules

1. Before modifying files, state the exact files you expect to change.
2. Read existing templates, content, and SCSS before editing.
3. Keep each task focused. Avoid broad refactors during content or visual work.
4. Use `rg` for search and `apply_patch` for manual edits.
5. Work with the current dirty tree. Do not revert user or previous-agent changes unless asked.
6. After changes, run Hugo build or explain why it was not possible.

## Content Rules

Write for buyers, engineers, OEMs, skid builders, distributors, and project teams.

Use practical industry knowledge boldly, but do not invent verifiable evidence.

Allowed:

* General product-family guidance.
* Common application conditions.
* Typical RFQ inputs.
* Selection risks and review reminders.

Do not invent:

* Real model specifications.
* Certification numbers.
* Factory ownership, capacity, or photos.
* Test data.
* Customer names or project references.
* Claims such as "global leading", "factory direct", or "fully certified".

Prefer customer-facing language. Avoid text that explains the website to the site owner, such as "this page is used to...".

Use careful wording:

* "review"
* "confirm"
* "subject to product series"
* "subject to project documents"
* "based on actual duty conditions"

## Site Structure

The navigation follows the customer decision path:

* Products: product family fit and RFQ inputs.
* Applications: operating scenario to product direction.
* Project Support: duty conditions, documents, RFQ/BOM, supply coordination.
* Resources: guides, FAQs, cases, and sourcing articles.
* About: honest positioning and working method.
* Conversion pages: Request a Quote, Contact, Document Request, Submit Duty Conditions.

Every important page should include a clear next action.

## Page Standard

Each page should have:

1. One clear primary topic.
2. A customer problem or operating context.
3. Useful selection, documentation, or RFQ information.
4. Internal links to related products, applications, resources, or forms.
5. Server-rendered SEO content visible in HTML.
6. A visible CTA without pressure or hype.

## Visual Direction

The site should feel professional, restrained, scannable, and technically credible.

Use:

* Consistent spacing, typography, and card rhythm.
* Tables, comparison blocks, process blocks, and technical diagrams.
* Real product, system, application, or document visuals when available.
* Technical schematic visuals when real images are not available.

Avoid:

* Generic repeated city photos as primary content visuals.
* Decorative clutter.
* Marketing-heavy hero sections on functional pages.
* Text overlap, oversized cards, or inconsistent page rhythm.

For major visual changes, check desktop and mobile screenshots when possible.

## Code Rules

Keep responsibilities separated:

* `content/`: page content and front matter.
* `layouts/`: Hugo templates and page structure.
* `layouts/partials/`: reusable template parts.
* `assets/scss/`: design system and styles.
* `static/images/`: public image assets.

SCSS rules:

* Use BEM class names.
* Keep reusable card/form/header/footer styles in components or layout.
* Keep page-specific styling in `pages`.
* Prefer tokens, CSS variables, and shared spacing helpers.
* Prefer CSS over JavaScript for layout and visual behavior.

## Forms and Cloudflare

Frontend forms can be built now, but backend behavior must stay clearly separated.

Do not hard-code secrets, D1 bindings, Turnstile secrets, email keys, or CRM credentials.

Future form handlers should live under a clear `/functions/api/` path unless there is a documented reason to use `_worker.js`.

## SEO and Assets

SEO content must be server-rendered.

Keep title, description, H1, breadcrumb, internal links, and structured data aligned with the same page intent.

Image organization should follow content purpose:

* Product visuals: `static/images/products/<slug>/`
* Application visuals: `static/images/applications/<slug>/`
* Resource article visuals: `static/images/resources/<section>/<slug>/`
* Shared temporary visuals: `static/images/shared/` or the existing shared image location.

Use clear filenames such as `cover.webp`, `diagram.webp`, `detail-01.webp`.

## Validation Checklist

Before finishing, aim to run:

1. `hugo --destination .hugo-visual-output --cleanDestinationDir --noBuildLock`
2. `git diff --check -- content layouts assets/scss`
3. Internal link check when link structure changes.
4. Visual screenshot review when layout or design changes.

Report what passed and what could not be checked.
