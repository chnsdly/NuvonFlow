# Nuvon Website Strategy Roadmap

> Repository-facing roadmap. It is written in English to stay consistent with the existing blueprint, while working summaries and decisions can be discussed in Chinese.

## 1. Core Standard

Nuvon Flow Control should be built as an application-led, engineering-oriented B2B website for corrosion-resistant flow control sourcing and RFQ support.

The working standard is:

1. Practical value first.
2. Customer experience second.
3. Visual quality third.
4. Maintainability throughout the whole process.

The website should not feel like a temporary brochure, a generic trading-company template, or a decorative landing page. It should feel like a professional tool that helps buyers, engineers, system integrators, OEMs, distributors, and project teams move from operating conditions to product family review, documentation preparation, and inquiry submission.

## 2. Current Strategic Diagnosis

The current site has a usable foundation:

* The main navigation is directionally correct: Products, Applications, Project Support, Resources, About.
* The site is already organized around application context, product families, RFQ preparation, and project support.
* Hugo is a good fit because SEO-critical content is rendered in HTML.
* The page system is becoming reusable through templates and partials instead of isolated page builds.

The current site still needs deeper work:

* Many pages use correct structure but shallow content.
* Some copy speaks about the website logic rather than speaking directly to customers.
* Product and application pages need more industry-specific selection substance.
* Resources need a long-term publishing model, not only a few starter articles.
* Visuals need a stronger evidence system: real product photos, application diagrams, document previews, and consistent technical illustrations.
* Template responsibilities should be tightened so future SEO publishing does not make the codebase harder to maintain.

## 3. Target Customer Logic

The site should be built around how professional customers evaluate corrosion-resistant valves and related flow control components.

### Primary Customer Questions

Customers usually need to answer:

1. Can this product family handle my media and operating conditions?
2. Which material, valve type, connection, and actuation details should be checked before quotation?
3. What information do I need to provide so the supplier can respond accurately?
4. Can the supplier provide reviewable documents for purchasing, engineering, or project submittal?
5. What are the limits of the recommendation, and what must be confirmed before final selection?

### Customer Groups

The content should primarily serve:

* OEMs and skid builders
* System integrators
* Industrial water and wastewater project teams
* Chemical dosing and chemical handling package builders
* Specialized distributors and channel partners
* Plant engineers preparing replacement or project RFQs

The site should not over-optimize for casual retail buyers, municipal owner branding, or public price catalog browsing. These products generally need duty condition review before purchase.

## 4. Information Architecture Review

The current top-level structure is suitable, but each section must have a sharper role.

| Section | Primary Role | Customer Question | Required Page Behavior |
| --- | --- | --- | --- |
| Products | Product family selection | Which component family may fit my duty? | Explain function, materials, operating checks, documents, RFQ inputs, related applications. |
| Applications | Scenario-based guidance | What should I consider in this process area? | Start from process context, media risks, common flow control needs, related products, and inquiry inputs. |
| Project Support | Trust and process clarity | How does Nuvon help make the request reviewable? | Explain material review, BOM/RFQ review, submittals, documentation, quality and supply coordination. |
| Resources | SEO and education hub | How do I understand a selection or purchasing issue? | Publish searchable guides, FAQs, case-style articles, checklists, and internal links to conversion pages. |
| About | Positioning and credibility | Who is Nuvon and how should I trust them? | Explain role, boundaries, working rhythm, support model, and contact paths. |
| Request a Quote / Contact | Conversion | How do I submit requirements? | Reduce friction while collecting enough operating conditions for review. |

## 5. URL and Content Model

The current URL model is broadly sound:

```txt
/products/
/products/ball-valves/
/applications/
/applications/industrial-water-treatment/
/project-support/
/project-support/submit-duty-conditions/
/resources/
/resources/technical-guides/
/resources/technical-guides/material-selection-for-corrosive-service/
/about/
/contact/
/request-a-quote/
```

Future pages should follow short, stable, readable URLs. Avoid date-based article URLs unless publishing frequency and news freshness become important.

### Recommended Resource Types

Resources should be divided by search intent:

| Type | Purpose | Example |
| --- | --- | --- |
| Technical guides | Explain selection logic | `material-selection-for-corrosive-service` |
| RFQ guides | Help customers prepare inquiry inputs | `how-to-prepare-a-valve-rfq` |
| Application notes | Connect process scenarios to product review | `valves-for-chemical-dosing-skids` |
| FAQ | Capture direct long-tail questions | `what-information-is-needed-for-a-valve-rfq` |
| Case-style notes | Show realistic project scenarios without unverifiable customer claims | `wastewater-neutralization-valve-package` |
| Document support pages | Explain datasheets, drawings, certificates, and submittals | `document-request` |

## 6. Image and Asset Strategy

Images should support trust and comprehension, not decoration.

### Recommended Directory Strategy

Use shared image folders for reusable business assets:

```txt
static/images/products/
static/images/applications/
static/images/company/
static/images/shared/
static/images/resources/
```

For long-term SEO articles, article-specific images should follow the article path:

```txt
static/images/resources/technical-guides/material-selection-for-corrosive-service/hero.webp
static/images/resources/technical-guides/material-selection-for-corrosive-service/diagram-01.webp
static/images/resources/technical-guides/material-selection-for-corrosive-service/table-preview.webp
```

This keeps images traceable as the resource library grows. If the site later moves selected articles to Hugo Page Bundles, the path logic will still be easy to migrate.

### Image Types by Page

| Page Type | Preferred Visuals | Avoid |
| --- | --- | --- |
| Homepage | One strong industry/application hero, product/application routing visuals, RFQ workflow graphics | Repeated city skyline, decorative abstract graphics |
| Product list | Consistent product-family visuals or technical placeholders | Mixing random photos with grey blocks |
| Product detail | Product photo, cutaway/connection illustration, selection table, document preview | Unrelated city or factory images |
| Application detail | Process diagram, typical line positions, product family map | Generic stock process photos with no selection value |
| Resource article | Diagrams, tables, callout figures, document examples | Decorative banners that do not support the article |
| About | Company/team/document/workflow visuals | Unsupported factory claims |
| Contact/RFQ | Form guidance, submission checklist, document examples | Heavy marketing visuals |

## 7. Content Writing Standard

The website copy must speak to customers, not to the site owner.

Avoid copy like:

> A professional website should help customers organize media, materials, pressure, connection, actuation, and documents.

Use customer-facing copy like:

> Share the media, concentration, temperature, pressure, pipe size, connection standard, actuation requirement, and target documents so the quotation can be reviewed against the actual duty.

### Content Principles

1. Use concrete selection language.
2. Prefer operating conditions over slogans.
3. Explain risk boundaries close to the claim.
4. Do not claim certifications, test data, factory ownership, or customer cases without evidence.
5. Use "subject to project confirmation" where the final answer depends on real duty data.
6. Give the customer a next action on every serious page.
7. Keep SEO terms natural and visible in HTML.

### Product Page Content Model

Each product family page should include:

1. Product function and where it fits.
2. Typical applications.
3. Common media and service conditions.
4. Material and seal considerations.
5. Pressure, temperature, connection, and actuation review points.
6. Documents that may be requested.
7. RFQ checklist.
8. Related applications and related guides.

### Application Page Content Model

Each application page should include:

1. Process context.
2. Typical chemicals or media concerns.
3. Common flow control needs.
4. Relevant product families.
5. Selection risks.
6. Documentation and project review needs.
7. RFQ preparation checklist.
8. Related products, project support, and resources.

### Resource Article Content Model

Each SEO article should include:

1. Clear search-intent title.
2. Short practical intro.
3. Scannable sections with H2/H3 hierarchy.
4. Tables, lists, or diagrams where useful.
5. Practical caveats and assumptions.
6. Internal links to products, applications, project support, and quote pages.
7. Article-specific images or diagrams when they add value.

## 8. Visual and Layout Standard

The design should remain restrained, but it should not feel unfinished.

### Visual Direction

* Industrial, clean, calm, technical.
* Blue can remain the primary brand color, but the whole site should not become one-note blue.
* Use white space deliberately, not as empty dead space.
* Use tables, matrices, diagrams, and process blocks as visual content.
* Cards should be used for repeated items, not for every section wrapper.
* Avoid overly decorative gradients, vague icons, or visual clutter.

### Page-Level Layout Expectations

| Page Type | Layout Expectation |
| --- | --- |
| Homepage | Strong routing page: hero, operating-condition matrix, product paths, application paths, RFQ workflow, CTA. |
| Product list | Catalog entry: product family cards, tags, selection lens, no random images. |
| Product detail | Two-column hero or technical visual, spec matrix, selection focus, review path, details, related links. |
| Application list | Scenario navigation: clear categories, application cards, service context. |
| Application detail | Process-aware layout: visual flow, typical areas, common needs, RFQ checklist. |
| Resource list | Knowledge hub: content-type grouping, article cards, no sparse empty page. |
| Resource detail | Article layout: readable width, TOC, callouts, related links, quote prompt. |
| Contact/RFQ | Conversion layout: clear form, direct contact, submission checklist, minimal distractions. |
| About | Trust layout: positioning, support model, working rhythm, boundaries, contact. |

### Visual QA Checklist

Before finishing a major visual pass, check:

* Desktop and mobile layout.
* Header and breadcrumbs alignment.
* Button text wrapping.
* Card height and grid rhythm.
* Footer spacing and readability.
* Heading hierarchy and proportion.
* Form labels and input spacing.
* Long English and Chinese text wrapping.
* Whether each visual element has a reason to exist.

## 9. Code and Maintainability Standard

The site should use Hugo as the content and template engine. Avoid unnecessary frontend frameworks.

### Template Direction

Use specialized templates only where they reduce complexity:

```txt
layouts/index.html
layouts/product/list.html
layouts/product/single.html
layouts/resources/list.html
layouts/resources/page.html
layouts/_default/list.html
layouts/_default/single.html
layouts/partials/
```

Reusable page modules should be partials when they appear across page types:

* Technical visual
* CTA strip
* Related links
* RFQ checklist
* Document list
* Selection matrix
* Breadcrumbs
* Form

Avoid turning every section into its own partial too early. A partial should exist when it has repeated behavior, repeated structure, or clear ownership.

### SCSS Direction

Current SCSS organization should continue:

```txt
assets/scss/abstracts/
assets/scss/base/
assets/scss/layout/
assets/scss/components/
assets/scss/pages/
```

Rules:

1. Tokens and spacing live in `abstracts`.
2. Global typography and containers live in `base`.
3. Header/footer live in `layout`.
4. Cards, forms, buttons, matrices, and technical visuals live in `components`.
5. Page-specific composition stays in `pages`.
6. Avoid styling one component through another component's selector.
7. Keep BEM class ownership clear.

### Content Data Strategy

For now, Markdown front matter is enough for most pages:

* `service_tags`
* `quick_specs`
* `features`
* `quick_points`
* `form`
* `image`

If the same data becomes shared across many pages, move it to `data/` only when it clearly reduces duplication.

## 10. Cloudflare and Form Boundaries

Some features cannot be completed by Hugo alone. The static site should still prepare clear boundaries.

Future Cloudflare pieces:

* Pages Functions under `/functions/api/`.
* Turnstile token collection on frontend forms.
* Server-side Turnstile verification in Functions.
* Email notification or CRM handoff.
* Optional D1 storage for inquiries.
* Environment variables for secrets and destination addresses.

Do not hard-code:

* Turnstile secret keys
* D1 database IDs
* Mail provider secrets
* CRM credentials
* Production recipient routing

Recommended future endpoints:

```txt
/api/inquiry
/api/contact
/api/document-request
/api/duty-conditions
```

Frontend forms should be structured now so that these endpoints can be connected later without redesigning the pages.

## 11. SEO Publishing System

SEO should be treated as a content system, not only metadata.

### Required SEO Foundation

* Unique page title.
* Unique meta description.
* One clear H1.
* Logical H2/H3 structure.
* HTML breadcrumbs.
* Canonical URL.
* Hreflang pairs for English and Chinese.
* Internal links between products, applications, resources, and inquiry pages.
* Article pages should have visible author/date/reading time where appropriate.
* Structured data should be added only when it matches visible content.

### Ongoing Article Clusters

Recommended SEO clusters:

1. Material selection for corrosive service.
2. Valve type selection by application.
3. Chemical dosing and injection system components.
4. Water treatment valve selection.
5. Wastewater and sludge handling valve considerations.
6. PVDF, PP, PVC, CPVC, PTFE-lined material comparisons.
7. Actuated valve RFQ preparation.
8. Submittal documentation and document request guides.
9. Back pressure valves, relief valves, and check valves for dosing systems.
10. Common RFQ mistakes for corrosive fluid handling projects.

Each article should link back to:

* One or more product pages.
* One application page.
* One project support page.
* Request a Quote or Submit Duty Conditions.

## 12. Execution Plan

### Phase 1: Architecture and Standards

Goal: make the site easy to maintain and extend.

Tasks:

1. Finalize route structure and page roles.
2. Create reusable content models for products, applications, resources, and project support.
3. Define image directory rules.
4. Define writing standards and visual QA rules.
5. Audit template complexity and reusable partial candidates.

Acceptance:

* The team knows where every future page belongs.
* New SEO articles can be added without inventing structure each time.
* Image placement rules are clear.

### Phase 2: Content Rewrite to Near-Launch Quality

Goal: replace shallow placeholder copy with customer-facing industry content.

Tasks:

1. Rewrite homepage.
2. Rewrite product family pages.
3. Rewrite application pages.
4. Rewrite project support pages.
5. Rewrite contact and RFQ pages.
6. Rewrite legal/footer pages into full draft policies.
7. Add internal links and conversion prompts.

Acceptance:

* Copy speaks to customers, not to the site owner.
* Each page can stand as a useful search result or inquiry support page.
* Claims stay within reasonable generic industry boundaries.

### Phase 3: Visual System and UX Refinement

Goal: improve polish without losing restraint.

Tasks:

1. Normalize typography, spacing, card rhythm, and CTA proportions.
2. Add purposeful diagrams, matrices, and document-preview modules.
3. Replace generic placeholders with consistent temporary visuals.
4. Prepare image slots for future real assets.
5. Check mobile and desktop page-by-page.

Acceptance:

* Pages look consistent but not identical.
* No obvious alignment, overflow, or empty-space problems.
* The visual system feels industrial and professional.

### Phase 4: Technical SEO and Structured Data

Goal: make the site crawlable, coherent, and extensible.

Tasks:

1. Add or refine JSON-LD partials.
2. Review canonical and hreflang behavior.
3. Improve breadcrumbs where needed.
4. Review sitemap and robots configuration.
5. Add article, organization, and breadcrumb structured data where valid.

Acceptance:

* SEO-critical content is in generated HTML.
* Structured data matches visible content.
* Multilingual pages have coherent pairing.

### Phase 5: Form and Cloudflare Integration Readiness

Goal: prepare the site for real inquiry handling.

Tasks:

1. Finalize form field models.
2. Define Cloudflare Pages Functions endpoint contracts.
3. Add frontend states for success, error, and validation.
4. Prepare Turnstile integration boundary.
5. Document required environment variables.

Acceptance:

* Static frontend is ready for backend connection.
* No secrets or environment-specific IDs are committed.
* The user can later connect email, CRM, D1, and Turnstile cleanly.

## 13. Immediate Next Actions

The next practical work should happen in this order:

1. Rewrite the homepage copy so it speaks directly to customers.
2. Rewrite all product pages to the product content model.
3. Rewrite all application pages to the application content model.
4. Expand Project Support pages into real service/process pages.
5. Rewrite footer legal pages as complete drafts.
6. Add related-links and RFQ-checklist partials where repeated.
7. Audit mobile and desktop visuals again.

The first implementation target should be content, because the site already has enough structural foundation to support richer pages. Better content will also reveal which reusable modules are truly needed.

## 14. Open Questions for Later Confirmation

These should not block the next content pass, but they should be confirmed before final launch:

1. Exact company legal name and operating entity.
2. Real address, email, phone, WhatsApp, and business hours.
3. Whether Nuvon should be positioned as a sourcing partner, manufacturer, brand owner, or mixed role.
4. Real product material ranges and pressure/temperature limits.
5. Real certificate and document availability.
6. Target markets and languages beyond English and Chinese.
7. Inquiry routing: email, CRM, D1, or manual export.
8. Privacy policy jurisdiction and cookie behavior.
9. Whether real case studies can be published.
10. Product image naming strategy once real images are available.

Until these are confirmed, the site can still be built to a strong generic industry standard using careful wording and editable placeholders.
