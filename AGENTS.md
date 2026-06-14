# AGENTS.md

## Purpose
- The website serves industrial customers (OEMs, system integrators, engineers) by providing clear, factual guidance on corrosion-resistant thermoplastic valves, water/wastewater treatment, chemical dosing, and related applications.
- Main goal: reduce customer uncertainty by helping them determine product relevance, operating conditions, required specifications, and next steps.
- Avoid any unsupported or promotional claims (e.g., do not claim products are “best” or “leading” without evidence, and do not fabricate project references, certifications, performance data, or test results).

## Content Standards
- Provide accurate, evidence-based information. Use specific data and known standards where applicable (e.g. material ratings, compatibility).
- Focus on people-first content: answers should address real user questions, not just SEO keyword goals. Do not create content solely to increase page count or traffic.
- Structure content for research tasks: present key facts first, deeper technical details or documentation links in secondary sections (progressive disclosure).
- Organize information with clear headings and descriptive links. Ensure images have meaningful `alt` text and that each page has a concise, descriptive title and meta description.
- Trust is earned: present verifiable facts. Avoid exaggeration or vague language. Qualify uncertain statements (use words like “typically,” “subject to,” or “based on actual conditions”).

## Technical Guidelines
- Use the existing Hugo static-site framework with SCSS and BEM. Favor simplicity and performance over adding new frameworks or complex build tools. (Static HTML provides SEO advantages by default.)
- Maintain separate content files for each language using Hugo’s i18n conventions (e.g., `page.en.md`, `page.zh.md`) so translations share the same base path. Keep navigation, URLs, and breadcrumbs consistent across languages.
- Reuse templates, partials, and data sources instead of duplicating layouts or code. Follow BEM naming to create modular, reusable CSS blocks and elements.
- Write semantic HTML: use headings (`<h1>`–`<h6>`) in order, lists, tables, and form labels appropriately. Optimize images and SVGs. Ensure all pages are accessible (e.g., keyboard navigation, ARIA roles as needed) and mobile-friendly.
- Link internally wherever relevant. Avoid orphan pages and “dangling” content. Each page should fit into the site structure (e.g., belong to a product family or topic).
- Performance matters: compress images, enable caching, minimize scripts. Avoid unnecessary JavaScript or third-party plugins.

## Development Practices
- Before making a change, check if an existing template or configuration can be extended. Avoid one-off exceptions or adding duplicate components without cause (reduce entropy).
- When addressing an issue, consider the broader system: fix shared components or styles if multiple pages are affected, not just one page. However, do not reflexively refactor every time; weigh the cost of broad changes.
- Add or update unit tests, content lints, and configuration checks if available. Ensure the Hugo build completes without errors for all languages.
- Document changes in code comments, commit messages, or adjacent documentation: explain *what* changed, *why*, and *how it was tested or verified.*

## Definition of Done
- The site builds successfully and the requested feature or fix works as intended in all configured languages.
- Changes preserve or improve site clarity and maintainability. The structure should not become harder to understand or navigate.
- No unsupported claims or content errors are introduced. All facts should be consistent across pages and languages.
- Relevant SEO and accessibility aspects have been considered (e.g., titles, meta tags, headings, alt text, mobile view).
- The next developer (human or AI agent) can easily understand where the change was made and how to extend it if needed.
- Each change should deliver customer value (improved understanding, clearer next steps, or better accuracy) or maintain the system. Reconsider any edits that do not meet this criterion.
