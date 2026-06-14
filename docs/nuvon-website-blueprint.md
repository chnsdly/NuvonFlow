# Nuvon Website Blueprint

## North Star

Nuvon Flow Control needs a website that wins qualified B2B inquiries, not a brochure site.

The site should guide a customer through:

```text
Application problem -> Product family direction -> Duty condition inputs -> RFQ or contact
```

Every page should reduce uncertainty and move the visitor one step closer to a useful inquiry.

## Current Baseline

The site now has a working multilingual Hugo structure with:

* Product family pages.
* Application pages.
* Project Support pages.
* Resources, guides, FAQs, insights, and case-study style pages.
* About, Contact, Request a Quote, and legal footer pages.
* A restrained technical visual system for placeholder diagrams.
* Customer-facing content that avoids unsupported factory or certification claims.

This baseline is good enough to continue refining content, visuals, SEO, and form handling without changing the core structure.

## Target Customers

Primary:

* OEMs.
* Skid builders.
* System integrators.
* Industrial buyers with repeat or project-based needs.

Secondary:

* Distributors.
* Regional channel partners.
* End users with maintenance, replacement, or process upgrade needs.

Lower priority for the early site:

* Large EPCs, municipal owners, and approved-vendor-list projects that require strong formal evidence not yet available.

## Positioning

Use this positioning:

> Application-focused corrosion-resistant flow control support for water treatment, wastewater, chemical dosing, and corrosive fluid handling projects.

Trust should come from:

* Application understanding.
* Duty condition review.
* Material and product-family matching.
* Document and submittal organization.
* Supply and project coordination.

Do not claim factory ownership, leading market status, major customers, certification coverage, or exact product performance unless evidence exists.

## Page Roles

| Section | Main Job | Conversion Goal |
| --- | --- | --- |
| Home | Explain positioning and entry paths | Request quote or explore products |
| Products | Help choose a product family | RFQ with product and duty data |
| Applications | Start from operating scenario | Match application to products |
| Project Support | Explain review and documentation workflow | Submit duty conditions |
| Resources | Capture search traffic and educate buyers | Move to RFQ, document request, or product pages |
| About | Build honest trust | Contact or RFQ |
| Contact / RFQ | Collect actionable inquiry details | Start commercial follow-up |

## Content Rules

Content should sound like a competent project support partner speaking to a buyer.

Use:

* Media, concentration, temperature, pressure, flow, size, connection, actuation, quantity, documents.
* Practical selection reminders.
* Tables and checklists when they help a customer prepare an inquiry.
* Clear risk boundaries near any recommendation.

Avoid:

* Generic slogans.
* Owner-facing website explanations.
* Unsupported "factory", "certified", "global", "best", or "one-stop" claims.
* Overly short filler paragraphs that do not help selection or RFQ preparation.

Generic industry content is acceptable. False company evidence is not.

## Product Page Pattern

A product page should answer:

1. What is this product family used for?
2. Where does it fit in water, wastewater, chemical dosing, or corrosive transfer systems?
3. What materials, connections, actuation, pressure, temperature, or service details affect selection?
4. What documents and RFQ inputs should the customer prepare?
5. Which applications are related?

Use product-family pages before building deep SKU catalogs.

Current product families:

* Ball Valves
* Butterfly Valves
* Diaphragm Valves
* Check Valves
* Pressure Control & Chemfeed
* Actuators
* Fittings

Future product families can include double containment and leak detection when there is enough content or visual support.

## Application Page Pattern

An application page should start from the process, not the product.

It should cover:

* System context.
* Common media and corrosion risks.
* Typical flow control roles.
* Product families usually reviewed.
* Selection risks to clarify.
* RFQ preparation.

Priority applications:

* Industrial Water Treatment
* Industrial Wastewater
* Chemical Dosing & Injection
* Corrosive Chemical Transfer
* Chemical Processing

## Project Support Pattern

Project Support pages should make Nuvon feel useful before a formal quote.

Core topics:

* Submit Duty Conditions
* Material Compatibility Review
* Submittal Documentation
* RFQ / BOM Support
* Quality & Supply Coordination

The goal is to teach customers how to send better requirements and make Nuvon look organized, responsive, and review-aware.

## Resources and SEO

Resources should support long-term SEO and conversion.

Use content types:

* Technical Guides: deeper evergreen selection content.
* FAQs: direct answers to search questions.
* Insights: short sourcing and project notes.
* Case Studies: representative scenarios, not fabricated real customer claims.
* Document Request: bridge from content to sales support.

Article content should link back to relevant products, applications, project support pages, and RFQ forms.

For future article images, use a parallel folder structure:

```text
static/images/resources/<section>/<slug>/cover.webp
static/images/resources/<section>/<slug>/diagram.webp
```

Do not use huge generic city photos as article-list visuals. Use technical diagrams or real process/product images.

## Visual Direction

The visual style should be:

* Professional.
* Restrained.
* Technical.
* Scannable.
* Consistent across desktop and mobile.

Preferred modules:

* Technical schematic cards.
* Tables.
* Process steps.
* Selection checklists.
* Compact comparison cards.
* Clear CTA bands.

Avoid:

* Over-decorated marketing sections.
* Unrelated stock imagery.
* Repeated placeholder photos.
* Oversized list cards.
* Dense text without hierarchy.

## Conversion Forms

Forms should collect enough detail for a useful first response.

Core fields:

* Name
* Email
* Company
* Country or region
* Product or application
* Duty conditions and request

Future backend:

* Cloudflare Turnstile on frontend.
* Server-side token verification.
* Pages Functions under `/functions/api/`.
* No secrets or binding IDs in the repo.

## Maintenance Rules

Keep the site easy to extend:

* Add content through front matter and Markdown when possible.
* Reuse templates and partials before creating new layouts.
* Keep SEO content visible in generated HTML.
* Keep page intent, title, description, H1, breadcrumbs, and internal links aligned.
* Use a consistent image naming strategy.
* Validate with Hugo build after changes.

## Next Improvement Priorities

1. Replace temporary visuals with real product, application, and document visuals.
2. Add more high-intent resource articles around material selection and RFQ preparation.
3. Improve internal linking between resources, products, and applications.
4. Implement Cloudflare-backed form handling.
5. Add real evidence only when verified: certificates, test data, factory photos, customer cases, or product-specific documents.
